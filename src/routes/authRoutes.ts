import { Router, Request, Response, NextFunction} from 'express'

const router = Router()

router.post('/signup', async(req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error) {
        next(error)
    }
})

router.post('/login', async(req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error) {
        next(error)
    }
})


export default router