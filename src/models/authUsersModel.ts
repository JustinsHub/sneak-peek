import { PrismaClient } from ".prisma/client";
import bcrypt from 'bcrypt'
import { BCRYPT_WORK_FACTOR } from "../config";

const { users } = new PrismaClient()

class AuthUser {
    static async signUpUser(username: string, password: string, email: string) {
        //implement username and email validation
        
        const hashPassword = await bcrypt.hash(password, +BCRYPT_WORK_FACTOR)
        const signUpUser = await users.create({
            data: {
                username,
                password: hashPassword,
                email
                }
            })
        return signUpUser //implement jwt and cookie here...?
    }

    static async loginUser(username: string, password: string, email: string) {
        //make it so you can login with email or username
    //    const loginInfo = await users.findUnique({
    //        where: {
    //            username,
    //            email
    //        },
    //        select: {
    //            id: true,
    //            username:
    //        }
    //    })
    }
}

export default AuthUser