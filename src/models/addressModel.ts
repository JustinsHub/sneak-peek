import { PrismaClient } from ".prisma/client";
import { ErrorBadRequest, ErrorNotFound } from "../expressErrors";

const { address } = new PrismaClient()

//apply middleware

class Address {
    static async getAllAddress() {
        const getAllAddress = await address.findMany({
            select: {
                user: {
                    select: {
                        id: true,
                        username: true
                    }
                },
                address: true,
                city: true,
                state: true,
                country: true,
                zipcode: true,
            }
        })
        return getAllAddress ? getAllAddress : new ErrorBadRequest
    }

    static async getSingleAddress(userId: number) {
        const getSingleAddress = await address.findUnique({
            where: {
                user_id: userId
            },
            select: {
                address: true,
                city: true,
                state: true,
                country: true,
                zipcode: true,
            }
        })
        return getSingleAddress ?  getSingleAddress : new ErrorNotFound(`Address not found`)
    }

    static async createUserAddress(userId: number) {
        // const createUserAddress = await address.create({
        //     data: {
        //         should we stick an object here instead of full blown fields as the argument
        //     }
        // })
    }
}

export default Address