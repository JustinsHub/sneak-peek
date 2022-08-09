import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT
const BCRYPT_WORK_FACTOR = process.env.BCRYPTO_WORK_FACTOR || 10

export {
    PORT,
    BCRYPT_WORK_FACTOR
}