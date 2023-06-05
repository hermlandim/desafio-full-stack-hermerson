import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.entity"
import { TClientResponse, TClientUpdateRequest } from "../../interfaces/client.interfaces"
import { AppError } from "../../errors/AppError"
import { clientSchemaResponse } from "../../schemas/client.schemas"




const updateClientService = async (data: TClientUpdateRequest, userId: string): Promise<TClientResponse> => {


    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)

    const client: Client | null = await clientRepository.findOneBy({
        id: userId
    })

    if(!client){
        throw new AppError("Client not found", 404)
    }

    const clientUpdate: Client = clientRepository.create({
        ...client,
        ...data
    })

    await clientRepository.save(clientUpdate)

    return clientSchemaResponse.parse(clientUpdate)

}


export { updateClientService }