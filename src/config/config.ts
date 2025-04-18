import dotenv from 'dotenv'
dotenv.config()
export const config = {
    env: process.env.NODE_ENV || 'development',
    isProd: process.env.NODE_ENV === 'production',
    port: process.env.PORT || 3010,
    jwtSecret: process.env.JWT_SECRET || '',
    sqlUri: process.env.SQL_URI || '',
    host: process.env.DB_HOST || '',
    portsql: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || '',

}