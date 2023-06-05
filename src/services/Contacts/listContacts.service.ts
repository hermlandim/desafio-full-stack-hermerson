import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.entity"
import { contactsSchemaResponse } from "../../schemas/contact.schema"
import { TContactsResponse } from "../../interfaces/contact.interfaces"
import { AppError } from "../../errors/AppError"
import {} from "pdfkit"


const listContactsService = async (userId: string): Promise<TContactsResponse> => {

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


    return contactsSchemaResponse.parse(client.contacts)


}


export { listContactsService }