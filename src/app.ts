import express  from 'express'
import mongoose/*, {type ConnectOptions}*/ from 'mongoose'

import passport from 'passport'
import './utils/auth'


import { 
    logErrors,
    errorHandler,
    boomErrorHandler 
} from './middlewares/error.handler'
import routerApi from './routes'
import {config} from './config/config'
import cors from 'cors'

const {mongoUri, port}= config
const app = express()

app.use(express.json())
app.use(passport.initialize())
app.use(cors())

routerApi(app)


const connectDB =  () => {
    mongoose.connect(mongoUri).then(() => {
        console.log('conected to mongo')
    }).catch((error) => {
        console.log('couldn\'t connect to mongo',error)
    })
}

app.get('/', (req,res) =>{
    res.send('hola mundo')
})




app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`)
    connectDB()
    
})

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)