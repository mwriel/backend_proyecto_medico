import passport from 'passport'
import LocalStrategy from './strategies/local.strategy'
import JwtStrategy from './strategies/jwt.strategy'
console.log("se entro a las estrategias")
passport.use(LocalStrategy)
passport.use(JwtStrategy)