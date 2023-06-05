import { TClientRequest, TClientResponse } from "../../interfaces/client.interfaces";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { clientSchemaResponse } from "../../schemas/client.schemas";
import { AppError } from "../../errors/AppError";
import { Repository } from "typeorm";


const createClientService = async (data: TClientRequest): Promise<TClientResponse> => {

    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)

    const { email } = data

    const findClient: Client | null = await clientRepository.findOne({
        where:{
            email
        }
    })

    if(findClient){
        throw new AppError("Client already exists!", 409)
    }

    const client: Client = clientRepository.create(data)

    await clientRepository.save(client)


    return clientSchemaResponse.parse(client)
}


export { createClientService }