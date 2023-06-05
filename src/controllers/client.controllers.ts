import { Request, Response } from "express"
import { TClientRequest, TClientResponse } from "../interfaces/client.interfaces"
import { createClientService } from "../services/Client/createClient.service"
import { deleteClientService } from "../services/Client/deleteClient.service"
import { retrieveClientService } from "../services/Client/retrieveClient.service"
import { listClientService } from "../services/Client/listClients.service"
import { updateClientService } from "../services/Client/updateClient.service"



const createClientController = async (req: Request, res: Response) => {

    const data: TClientRequest = req.body

    const newClient: TClientResponse = await createClientService(data)

    res.status(201).json(newClient)

}

const listClientsController = async (req: Request, res: Response) => {

    const clients: TClientResponse[] = await listClientService()

    return res.json(clients)

}

const retrieveClientController = async (req: Request, res: Response) => {

    const userId: string = res.locals.id

    const client: TClientResponse = await retrieveClientService(userId)

    return res.json(client)

}

const updateClientController = async (req: Request, res: Response) =>{

    const data: TClientRequest = req.body
    const userId = req.params.id

    const updatedClient: TClientResponse = await updateClientService(data, userId)

    return res.json(updatedClient)

}

const deleteClientController = async (req: Request, res: Response) => {

    const userId: string = req.params.id

    const deletedUser: void = await deleteClientService(userId)

    res.json(deletedUser)

}


export { createClientController, deleteClientController, retrieveClientController, listClientsController, updateClientController }