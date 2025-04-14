import mysql from 'mysql2';
import mysqlPromise from 'mysql2/promise';
import express  from 'express'

import passport from 'passport'
import './utils/auth'
import pool from './db'; 




import { 
    logErrors,
    errorHandler,
    boomErrorHandler 
} from './middlewares/error.handler'
import routerApi from './routes'
import {config} from './config/config'
import cors from 'cors'

const {host, port,user,password,database}= config
const app = express()

app.use(express.json())
// Almacenar el pool en app.locals para acceso global
app.locals.db = pool;
app.use(passport.initialize())
app.use(cors())

routerApi(app)




app.get('/', (req,res) =>{
    res.send('hola mundo')
})





app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`)
    
})

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)
