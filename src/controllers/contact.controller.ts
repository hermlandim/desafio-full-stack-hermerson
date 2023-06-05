import { Request, Response } from "express"
import { createContactService } from "../services/Contacts/createContacts.service"
import { listContactsService } from "../services/Contacts/listContacts.service"
import { deleteContactService } from "../services/Contacts/deleteContact.service"
import { retrieveContactService } from "../services/Contacts/retrieveContact.service"
import { updateContactService } from "../services/Contacts/updateContact.service"
import { TContactRequest, TContactResponse, TContactsResponse } from "../interfaces/contact.interfaces"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"



const createContactController = async (req: Request, res: Response) => {

    const userId: string = res.locals.id
    const data: TContactRequest = req.body
    
    const newClient: TContactResponse = await createContactService(data, userId)

    return res.status(201).json(newClient)

}


const listContactsController = async (req: Request, res: Response) => {

    const userId: string = res.locals.id

    const contactsClient: TContactsResponse = await listContactsService(userId)

    return res.json(contactsClient)

}

const retrieveContactController = async (req: Request, res: Response) => {

    const contactId: string = req.params.id

    const contact: TContactResponse = await retrieveContactService(contactId)

    res.json(contact)

}

const updateContactController = async (req: Request, res: Response) => {

    const contactId: string = req.params.id
    const data: TContactRequest = req.body

    const updatedContact: TContactResponse = await updateContactService(data, contactId)

    return res.json(updatedContact)

}

const deleteContactController = async (req: Request, res: Response) => {

    const contactId: string = req.params.id

    const deletedContact: void = await deleteContactService(contactId)

    return res.json(deletedContact)
}


const generatePdfClientsController = async (req: Request, res: Response) => {

    const userId: string = res.locals.id

    const contactsClient: TContactsResponse = await listContactsService(userId)

    const pdfDoc = await PDFDocument.create()
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
  
    const page = pdfDoc.addPage()
    const { width, height } = page.getSize()
    const fontSize = 30

    let eixoX = -50

    page.drawText(`${res.locals.clientName.username}`, {
        x: 50,
        y: height - 4 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
      })

    contactsClient.forEach((elem) => {
        page.drawText(`${elem.email}`, {
            x: 50,
            y: height - 4 * fontSize + eixoX,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0.53, 0.71),
          })
        eixoX -= 30
    })

    res.setHeader('Content-Disposition', 'attachment; filename="documento.pdf"');
    res.setHeader('Content-Type', 'application/pdf');
  
    const pdfBytes = await pdfDoc.save()

    return res.end(pdfBytes)
}




export { createContactController, 
         listContactsController, 
         retrieveContactController, 
         updateContactController, 
         deleteContactController, 
         generatePdfClientsController 
        }