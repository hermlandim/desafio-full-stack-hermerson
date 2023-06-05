import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.entity"
import { AppError } from "../../errors/AppError"
import { contactsSchemaResponse } from "../../schemas/contact.schema"
import { TContactsResponse } from "../../interfaces/contact.interfaces"




const generatePdfContactService = async (userId: string) => {

    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)

    const client: Client | null = await clientRepository.findOne({
        where: {
            id: userId
        },
        relations: {
            contacts: true
        }
    })


    if(!client){
        throw new AppError("Contacts not found", 404)
    }

    const contacts: TContactsResponse = contactsSchemaResponse.parse(client.contacts)

    return contacts

}




export { generatePdfContactService }