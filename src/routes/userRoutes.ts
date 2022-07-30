import { Router, Request, Response, NextFunction} from 'express'

const router = Router()


router.get('/users', async(req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json('allUsersHere')
    } catch (error) {
        
    }
})

router.get('/user', async(req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json('getSingleUser')
    } catch (error) {
        return error
    }
})

router.get('')

export default router
