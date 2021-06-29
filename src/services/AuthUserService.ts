import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

interface IAuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({email, password}: IAuthRequest){
        const usersRepositories = getCustomRepository(UsersRepositories);
        
        //Verificar se o email existe
        const user = await usersRepositories.findOne({
            email
        })
        if(!user){
            throw new Error("Email/Password incorrect");
        }
        
        //Verificar se a senha está correta
        const passwordMatch = await compare(password, user.password)
        if(!passwordMatch){
            throw new Error("Email/Password incorrect");
        }

        //Gerar token
        const token = sign({
            email: user.email
        }, "8c6b92b79a0f88c159cfc44b4fad9263", {
            subject: user.id,
            expiresIn: "10h"
        })

        return token
    }
}

export { AuthUserService }