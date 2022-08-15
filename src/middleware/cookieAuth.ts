import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config'
import { ErrorNotAuthorized } from '../expressErrors'

//create middleware for req.cookies.token

declare global {
    namespace Express {
      interface Request {
        user: string | any;
      }
    }
  }

const authenticateCookie = (req: Request, res:Response, next: NextFunction) => {
    const token = req.cookies.authCookie.accessToken
    try { 
        const payload = jwt.verify(token, SECRET_KEY)
        console.log(payload)
        console.log('Valid token.')
        req.user = payload
        return next()
    } catch (error) {
        //res.clearCookie
        console.log('Invalid Token.')
        return next()
    }
}

const protectedRoute = (req: Request, res:Response, next: NextFunction) => {
    return (req.user ? next() : next(new ErrorNotAuthorized))
}

export {
    authenticateCookie,
    protectedRoute
}