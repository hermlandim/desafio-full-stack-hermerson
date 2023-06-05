import { Request, Response, NextFunction } from "express"
import jwt, { VerifyErrors } from "jsonwebtoken"
import { AppError } from "../errors/AppError"
import "dotenv/config" 



const ensureAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const token: string | undefined = req.headers.authorization
    const secretKey: string | undefined = process.env.SECRET_KEY

    if(!token){
        throw new AppError("Token is missing", 401)
    }

    const splitToken = token.split(" ")[1]

    jwt.verify(splitToken, secretKey!, (error: VerifyErrors | null, decoded: any) => {

        if(error){
            throw new AppError("invalid token", 401)
        }

        res.locals.id = decoded?.sub

        res.locals.clientName = decoded.clientName

        return next()

    })

}



export { ensureAuthMiddleware }