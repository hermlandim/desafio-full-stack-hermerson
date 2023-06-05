import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.entity"
import { TClientResponse } from "../../interfaces/client.interfaces"
import { clientsSchemaResponse } from "../../schemas/client.schemas"



const listClientService = async (): Promise<TClientResponse[]> => {

    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)

    const clients: Client[] = await clientRepository.find()

    return clientsSchemaResponse.parse(clients)

}


export { listClientService }