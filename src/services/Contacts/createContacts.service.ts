import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.entity"
import { Contact } from "../../entities/contact.entity"
import { AppError } from "../../errors/AppError"
import { TContactRequest, TContactResponse } from "../../interfaces/contact.interfaces"
import { contactSchemaResponse } from "../../schemas/contact.schema"



const createContactService = async (data: TContactRequest, clientId: string): Promise<TContactResponse> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)
    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)

    const client: Client | null = await clientRepository.findOneBy({
        id: clientId
    })

    const { email } = data

    const contact: Contact | null = await contactRepository.findOneBy({
        email: email
    })

    if(!client){
        throw new AppError("Client not found", 404)
    }

    if(contact){
        throw new AppError("Contact already exists", 409)
    }

    const contactClient: Contact = contactRepository.create({
        ...data,
        client
    })

    await contactRepository.save(contactClient)

    return contactSchemaResponse.parse(contactClient)
}


export { createContactService }