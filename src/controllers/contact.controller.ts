import { Request, Response } from "express"
import { createContactService } from "../services/Contacts/createContacts.service"
import { listContactsService } from "../services/Contacts/listContacts.service"
import { deleteContactService } from "../services/Contacts/deleteContact.service"
import { retrieveContactService } from "../services/Contacts/retrieveContact.service"
import { updateContactService } from "../services/Contacts/updateContact.service"
import { TContactRequest, TContactResponse, TContactsResponse } from "../interfaces/contact.interfaces"
import { generatePdfContactService } from "../services/Contacts/generatePdfContacts.service"
import { contactsClientGenerate } from "../libs/pdf/contactsClientGenerator"



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


const generatePdfContactsForClientController = async (req: Request, res: Response) => {

    const userId: string = res.locals.id
    const clientName: string = res.locals.clientName

    const contactsClient = await generatePdfContactService(userId)

    const generatePdf = await contactsClientGenerate(clientName, contactsClient)

    res.setHeader('Content-Disposition', 'attachment; filename="documento.pdf"');
    res.setHeader('Content-Type', 'application/pdf');

    return res.end(generatePdf)
}




export { createContactController, 
         listContactsController, 
         retrieveContactController, 
         updateContactController, 
         deleteContactController, 
         generatePdfContactsForClientController 
        }