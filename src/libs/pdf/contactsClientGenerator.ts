import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { TContactsResponse } from "../../interfaces/contact.interfaces";




const contactsClientGenerate = async (clientName: string, contactsClient: TContactsResponse) => {

    const pdfDoc = await PDFDocument.create()
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
  
    const page = pdfDoc.addPage()
    const { height } = page.getSize()
    const fontSize = 30

    let eixoX = -50

    page.drawText(clientName, {
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
        eixoX -= 35
        page.drawText(`${elem.phone}`, {
            x: 50,
            y: height - 4 * fontSize + eixoX,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0.53, 0.71),
          })
        eixoX -= 60
    })


  
    const pdfBytes = await pdfDoc.save()

    return pdfBytes

}




export { contactsClientGenerate }