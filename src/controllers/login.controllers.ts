import { Request, Response } from "express"
import { TLoginUser } from "../interfaces/login.interfaces"
import { createTokenService } from "../services/Login/createToken.service"



const createLoginController = async (req: Request, res: Response) => {

    const {email, password }: TLoginUser = req.body

    const token: string = await createTokenService({email, password})

    res.json({token})

}


export { createLoginController }