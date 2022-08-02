import { PrismaClient } from ".prisma/client";
import { ErrorBadRequest, ErrorNotAuthorized, ErrorNotFound } from "../expressErrors";

const { address, users } = new PrismaClient()

//apply middleware

interface AddressI {
    address: string,
    city: string,
    state: string,
    country: string,
    zipcode: number
}
class Address {
    address: string
    city: string
    state: string
    country: string
    zipcode: number

    constructor({address, city, state, country, zipcode}: AddressI) {
        this.address = address
        this.city = city
        this.state = state
        this.country = country
        this.zipcode = zipcode

    }
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

    static async createUserAddress(userId: number, userAddress: string, city: string, state: string, country: string, zipcode: number) {
        const currentUser = await users.findUnique({
            where: {
                id: userId
            }
        })

        if(!currentUser) throw new ErrorNotAuthorized()

        const createUserAddress = await address.create({
            data: {
                user_id: userId,
               address: userAddress,
               city,
               state,
               country,
               zipcode
            }
        })
        return createUserAddress ? createUserAddress : new ErrorNotAuthorized
    }

    static async updateCurrentAddress(userId: number, userAddress: string, city: string, state: string, country: string, zipcode: number){
        const currentUser = await users.findUnique({
            where: {
                id: userId
            }
        })

        if(!currentUser) throw new ErrorNotAuthorized()

        const updateCurrentAddress = await address.update({
            where:{
                user_id: userId
            },
            data: {
                address: userAddress,
                city,
                state,
                country,
                zipcode
            }
        })
        return updateCurrentAddress ? updateCurrentAddress : new ErrorNotAuthorized
    }
}

export default Address