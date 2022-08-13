import { PrismaClient } from ".prisma/client";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { BCRYPT_WORK_FACTOR, SECRET_KEY } from "../config";

const { users } = new PrismaClient()

const createToken = (id: number) => {
    return jwt.sign({id}, SECRET_KEY, {expiresIn: "1h"})
}
class AuthUser {
    static async signUpUser(username: string, password: string, email: string) {
        //implement username and email validation (json schema on routes?)

        const hashPassword = await bcrypt.hash(password, +BCRYPT_WORK_FACTOR)
        const signUpUser = await users.create({
            data: {
                username,
                password: hashPassword,
                email
                }
            })
        if(signUpUser){
            const userToken = createToken(signUpUser.id)
            return {
                accessToken: userToken
            }
        }
    }

    static async loginUser(username: string, password: string, email: string) {
        //make it so you can login with email or username
        //how to login with email? 
        //one way could be having username || email

        //compare hash password
        //createToken by email if email
        //if compared > createToken


        //implement oAuth/passport.js future feature after req.cookies with jwt is working.

        //ERROR HANDLE
        const loginUser = await users.findUnique({
            where: {
                username
            },
            select: {
                id: true,
                username: true,
                password: true
            }
        })
        
        const userAuth = await bcrypt.compare(password, loginUser?.password as string)

        if(userAuth){
            const loginToken = createToken(loginUser?.id as number)
            return {
                accessToken: loginToken
            }
        }
    }
}

export default AuthUser