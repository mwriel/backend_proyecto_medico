import { Strategy } from 'passport-local'
import UserService from '../../../services/user.service'
import bcrypt from 'bcrypt'
import boom from '@hapi/boom'
import pool from '../../../db'

const options = { usernameField: 'email', passwordField: 'password' }
const service = new UserService(pool)

// Se modificó este archivo para retornar de manera independiente si el correo o la contraseña son incorrectos
const LocalStrategy = new Strategy(options, async (email, password, next) => {
  try {
    let user;
    try {
      user = await service.findByEmail(email);
    } catch (error) {
      if (boom.isBoom(error) && error.output.statusCode === 404) {
        return next(error, false);
      }
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    delete user.password_hash;

    if (!isMatch) {
      return next(boom.unauthorized('Contraseña incorrecta'), false);
    }

    next(null, user);
    
  } catch (error) {
    next(error, false);
  }
});

export default LocalStrategy;