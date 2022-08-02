import { PrismaClient } from ".prisma/client";

const { profile } = new PrismaClient()

class Profile {
    static async getUserAllProfile() {
        const getUserAllProfile = await profile.findMany({
            select: {
                bio: true
            }
        })
    }
}