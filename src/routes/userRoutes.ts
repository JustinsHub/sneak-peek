import { Router, Request, Response, NextFunction} from 'express'

const router = Router()

router.get('/users', async(req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json('hello world')
    } catch (error) {
        return error
    }
})

export default router
