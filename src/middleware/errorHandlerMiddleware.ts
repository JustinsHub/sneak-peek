import { ExpressError } from "../expressErrors";
import {Request, Response, NextFunction} from 'express'

export const errorHandlerMiddleware = (error: ExpressError, req: Request, res: Response, next: NextFunction) => {
    let message = error.message
    let status = error.status
    return res.status(status).json({
        error: {
            message,
            status
        }
    })
}

