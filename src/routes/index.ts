import express from "express"
import MonsterRouter from './monster.route'
import UserRouter from './user.route'
import AuthRouter from './auth.route'

const routerApi = (app)=>{
    const router= express.Router()
    app.use('/api/v1',router)
    router.use('/monsters',MonsterRouter)
    router.use('/users',UserRouter)
    router.use('/auth',AuthRouter)
}
export default routerApi