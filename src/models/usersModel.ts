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

    static async getSingleUser(id: number){
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
    //json schema? or some sort of validation
    static async updateUser(id:number, email: string){
        const updateUser = await users.update({
            data: {
                email
            },
            where: {
                id
            },
            select: {
                email: true,
            }
        })
        return updateUser ? updateUser : new ErrorBadRequest
    }

    static async deleteUser(id: number){
        const deleteUser = await users.delete({
            where: {
                id
            }
        })
        return deleteUser ? deleteUser : new ErrorBadRequest
    }
    //delete
}

export default User