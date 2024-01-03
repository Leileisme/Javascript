import passport from 'passport'
import passportLocal from 'passport-local'
import passportJWT from 'passport-jwt'
import bcrypt from 'bcrypt'
import users from '../models/users.js'

passport.use(
  'login',
  new passportLocal.Strategy({
    usernameField: 'account',
    passwordField: 'password'
  }, async (account, password, done) => {
    try {
      const user = await users.findOne({ account })
      if (!user) {
        throw new Error('ACCOUNT')
      }

      // 第一個 password ( passwordField: 'password')
      if (!bcrypt.compareSync(password, user.password)) {
        throw new Error('PASSWORD')
      }

      return done(null, user, null)
    } catch (error) {
      console.log(error)
      if (error.message === 'ACCOUNT') {
        return done(null, null, { message: '帳號不存在' })
      } else if (error.message === 'PASSWORD') {
        return done(null, null, { message: '密碼錯誤' })
      } else {
        return done(null, null, { message: '未知錯誤' })
      }
    }
  })

)
