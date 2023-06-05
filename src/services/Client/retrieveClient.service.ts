import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.entity"
import { AppError } from "../../errors/AppError"
import { clientSchemaResponse } from "../../schemas/client.schemas"
import { TClientResponse } from "../../interfaces/client.interfaces"




const retrieveClientService = async (userId: string): Promise<TClientResponse> => {

    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)

    const client: Client | null = await clientRepository.findOneBy({
        id: userId
    })

    if(!client){
        throw new AppError("Client not found", 404)
    }

    return clientSchemaResponse.parse(client)

}


export { retrieveClientService }