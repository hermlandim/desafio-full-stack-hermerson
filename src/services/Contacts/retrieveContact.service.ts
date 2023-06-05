import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { AppError } from "../../errors/AppError"
import { TContactResponse } from "../../interfaces/contact.interfaces"
import { contactSchemaResponse } from "../../schemas/contact.schema"




const retrieveContactService = async (contactId: string): Promise<TContactResponse> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const contact: Contact | null = await contactRepository.findOneBy({
        id: contactId
    })

    if(!contact){
        throw new AppError("Contact not found", 404)
    }

    return contactSchemaResponse.parse(contact)

}


export { retrieveContactService }