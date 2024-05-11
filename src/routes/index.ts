import express from "express"
import MonsterRouter from './monster.route'
import UserRouter from './user.route'
import AuthRouter from './auth.route'
import GameRouter from './game.route'
const routerApi = (app)=>{
    const router= express.Router()
    app.use('/api/v1',router)
    router.use('/monsters',MonsterRouter)
    router.use('/users',UserRouter)
    router.use('/auth',AuthRouter)
    router.use('/games',GameRouter)
}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWU5Y2E2YzZhNjhiNjMwOGZlMWVmZGIiLCJpYXQiOjE3MDk4MjA3MTB9.sZz86FBm4JOFlGv-uQdvK-4WFlemOLlvP9FOJT1k65g
export default routerApi