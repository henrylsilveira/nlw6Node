import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad{
    sub: string;
}

export function ensureAuth(req: Request, res: Response, next: NextFunction){

    //RECEBER TOKEN
    const authToken = req.headers.authorization
    

    //VALIDAR SE TOKEN ESTÁ PREENCHIDO
    if(!authToken){
        return res.status(401).end()
    }
    
    //VERIFICAR SE O TOKEN É VÁLIDO
    const [, token] = authToken.split(" ")

    try {
        const { sub } = verify( token, "8c6b92b79a0f88c159cfc44b4fad9263") as IPayLoad
        req.user_id = sub;
        return next()
    } catch (error) {
        return res.status(401).end()
    }

    //RECUPERAR INFORMAÇÕES DO USUÁRIO
    
    return next()
}