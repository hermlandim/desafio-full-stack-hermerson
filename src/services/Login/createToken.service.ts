import { TLoginUser } from "../../interfaces/login.interfaces"
import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.entity"
import { Repository } from "typeorm"
import { compare } from "bcryptjs"
import { AppError } from "../../errors/AppError"
import jwt from "jsonwebtoken"
import "dotenv/config"


const createTokenService = async ({email, password}: TLoginUser): Promise<string> => {

    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)

    const client: Client | null = await clientRepository.findOne({
        where: {
            email
        }
    })

    if(!client){
        throw new AppError("Wrong user/password", 404)
    }

    const passwordMath: boolean = await compare(password, client.password)

    if(!passwordMath){
        throw new AppError("Wrong user/password", 404)
    }

    const token: string = jwt.sign(
        {
            clientName: client.full_name
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: "24h",
            subject: client.id
        }
    )

    return token

}


export { createTokenService }