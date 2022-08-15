import { Router, Request, Response, NextFunction} from 'express'
import AuthUser from '../models/authUsersModel'

const router = Router()

router.post('/signup', async(req: Request, res: Response, next: NextFunction) => {
    const { username, password, email } = req.body
    
    try {
        const signUpUser = await AuthUser.signUpUser(username, password, email)
        res.cookie('authCookie', signUpUser, {
        httpOnly: true,
        })
        return res.json('Successfully signed up!')
    } catch (error) {
        next(error)
    }
})

router.post('/login', async(req: Request, res: Response, next: NextFunction) => {
    const { username, password, email } = req.body
    
    try {
        const loginUser = AuthUser.loginUser(username, password, email)
        res.cookie('authCookie', loginUser, {
        httpOnly: true,
        })
    } catch (error) {
        next(error)
    }
})


export default router