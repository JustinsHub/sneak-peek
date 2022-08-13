import { PrismaClient } from ".prisma/client";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { BCRYPT_WORK_FACTOR, SECRET_KEY } from "../config";
import { ErrorBadRequest } from "../expressErrors";

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
        //implement oAuth/passport.js future feature after req.cookies with jwt is working.

        const loginByUsername = await users.findUnique({
            where: {
                username
            },
            select: {
                id: true,
                username: true,
                password: true
            }
        })

        const loginByEmail = await users.findUnique({
            where: {
                email
            },
            select: {
                id: true,
                email: true,
                password: true,
            }
        })
        
        if(!loginByUsername?.username || !loginByUsername?.password) throw new ErrorBadRequest('Username or password is incorrect.')
        if(!loginByEmail?.email || !loginByEmail?.password) throw new ErrorBadRequest('Username email or password is incorrect.')
        
        const userAuth = await bcrypt.compare(password, loginByUsername?.password as string)

        if(userAuth || loginByEmail){
            const loginToken = createToken(loginByUsername?.id as number)
            return {
                accessToken: loginToken
            }
        }
    }
}

export default AuthUser