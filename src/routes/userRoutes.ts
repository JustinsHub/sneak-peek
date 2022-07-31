import { Router, Request, Response, NextFunction} from 'express'
import User from '../models/usersModel'

const router = Router()


router.get('/users', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const getAllUsers = await User.getAllUsers()
        return res.json(getAllUsers)
    } catch (error) {
        next(error)
    }
})

router.get('/user/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const getSingleUser = await User.getSingleUser(+id)
        return res.json(getSingleUser)
    } catch (error) {
        next(error)
    }
}) 

router.patch('/update/:id', async(req: Request, res: Response, next: NextFunction) => {
    const { id }= req.params
    const { email } = req.body
    try {
        const updateUser = await User.updateUser(+id, email)
        return updateUser
    } catch (error) {
        next(error)
    }
})

export default router
