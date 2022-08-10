import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT
const BCRYPT_WORK_FACTOR = process.env.BCRYPTO_WORK_FACTOR || 10
const SECRET_KEY = process.env.SECRET_KEY

export {
    PORT,
    BCRYPT_WORK_FACTOR,
    SECRET_KEY
}