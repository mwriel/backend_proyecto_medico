import { Strategy } from 'passport-local'
import UserService from '../../../services/user.service'
import { User } from '../../../types/user.type'
import bcrypt from 'bcrypt'
import boom from '@hapi/boom'

import pool from '../../../db'; 
const options = { usernameField: 'email', passwordField: 'password' }
const service = new UserService(pool)

const LocalStrategy = new Strategy(options, async (email, password, next) => {
  try {
    
    const user: User = (await service.findByEmail(email)) as unknown as User
    if (user) {
      
      
      const isMatch = await bcrypt.compare(password, user.password_hash)
      
      delete user.password_hash
      if (isMatch) {
        
        next(null, user)
      } else {
        next(boom.unauthorized(), false)
      }
    } else next(boom.unauthorized(), false)
  } catch (error) {
    next(error, false)
  }
})

export default LocalStrategy