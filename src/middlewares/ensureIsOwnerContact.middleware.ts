import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Contact } from "../entities/contact.entity"
import { Repository } from "typeorm"
import { AppError } from "../errors/AppError"



const ensureIsOwnerContactMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const clientRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const contactId: string = req.params.id
    const clientId: string = res.locals.id

    const contact: Contact | null = await clientRepository.findOne({
        where: {
            id: contactId
        },
        relations: {
            client: true
        }
    })

    if(!contact){
        throw new AppError("Contact not found", 404)
    }

    if(contact.client.id !== clientId){
        throw new AppError("You don't have permissions")
    }

    return next()


}


export { ensureIsOwnerContactMiddleware }