import { PrismaClient } from ".prisma/client";
import { ErrorNotAuthorized, ErrorNotFound } from "../expressErrors";

const { profile, users } = new PrismaClient()

class Profile {
    static async getUserAllProfile() {
        const getUserAllProfile = await profile.findMany({
            select: {
                title: true,
                bio: true
            }
        })
    }

    static async getUserProfile(userId: number) {
        const getUserProfile = await profile.findUnique({
            where: {
                user_id: userId
            },
            select: {
                title: true,
                bio: true
            }
        })
        return getUserProfile ? getUserProfile : new ErrorNotFound(`Profile not found.`)
    }

    static async createUserProfile(userId: number, title: string, bio: string){
        const currentUser = await users.findUnique({
            where: {
                id: userId
            }
        })

        if(!currentUser) throw new ErrorNotAuthorized()

        const createUserProfile = await profile.create({
            data: {
                user_id: userId,
                title,
                bio
            }
        })
        return createUserProfile ? createUserProfile : new ErrorNotAuthorized() 
    }

    static async updateUserProfile(userId: number, title: string, bio: string){
        const currentUser = await users.findUnique({
            where: {
                id: userId
            }
        })

        if(!currentUser) throw new ErrorNotAuthorized()

        const updateUserProfile = await profile.update({
            where: {
                user_id: userId
            },
            data: {
                title,
                bio
            }, 
            select: {
                title: true,
                bio: true
            }
        })
        return updateUserProfile ?  updateUserProfile : new ErrorNotAuthorized 
    }

}