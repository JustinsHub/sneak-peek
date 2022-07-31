import { PrismaClient } from ".prisma/client";
import { ErrorBadRequest, ErrorNotFound } from "../expressErrors";

const { users } = new PrismaClient()

class User {
    static async getAllUsers() {
        const getAllUsers = await users.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                created_on: true
            }
        })
        return getAllUsers ? getAllUsers : new ErrorBadRequest
    }

    static async getSingleUser(id:number){
        const getSingleUser = await users.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                username: true,
                email: true,
                created_on: true,
                profile: true
            }
        })
        return getSingleUser ? getSingleUser : new ErrorNotFound(`User ${id} not found`)
    }

    //update
    //delete
}

export default User