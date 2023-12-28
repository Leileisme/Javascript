import passport from 'passport'
import passportLocal from 'passport-local'
import passportJWT from 'passport-jwt'
import bcrypt from 'bcrypt'
import users from '../models/users.js'

//  passportLocal.Strategy驗證策略的套件
// 使用驗證策略 寫自己的驗證方式
// passport.use (驗證方式名稱,驗證策略)
passport.use(
  'login',
  new passportLocal.Strategy(
    {
      // 預設使用 username 和 password 欄位
      // 修改成目前資料庫的欄位
      usernameField: 'email',
      passwordField: 'password'
    },
    // async (第一個欄位值, 第二個欄位的值, done)
    // done是 passportLocal.Strategy 執行成功後，預設的參數
    async (email, password, done) => {
      try {
        // 查詢有沒有符合信箱的使用者
        const user = await users.findOne({ email })
        if (!user) throw new Error('EMAIL')
        // 檢查密碼
        if (!bcrypt.compareSync(password, user.password)) throw new Error('PASSWORD')
        // 完成驗證，繼續並將資料帶入下一步
        // done(錯誤,資料,info)
        // done帶出去的參數固定的 會傳給auth的 passport.authenticate 參數
        return done(undefined, user, undefined)
      } catch (error) {
        console.log(error)
        if (error.message === 'EMAIL') {
          return done(undefined, false, { message: '信箱不存在' })
        } else if (error.message === 'PASSWORD') {
          return done(undefined, false, { message: '密碼錯誤' })
        } else {
          return done(undefined, false, { message: '未知錯誤' })
        }
      }
    }
  )
)

passport.use(
  'jwt',
  new passportJWT.Strategy(
    {
      // 擷取 JWE 的來源

      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 驗證用 secret
      // 過期之後：1.過期後給新的 2.拿舊的換新的(今天不做過期處理)
      secretOrKey: process.env.JWT_SECRET,
      // 讓後面的 function 能取得 req
      passReqToCallback: true
    },
    async (req, paylond, done) => {
      //  paylond 代表解譯後的 jet 內容
      try {
        // 自己從 header 取 jwt
        // const token = passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()(req)
        // fromAuthHeaderAsBearerToken()這個是一個function
        const token = req.headers.authorization.split(' ')[1]
        // tokens????
        const user = await users.findOne({ _id: paylond._id, tokens: token })
        if (!user) throw new Error('JWT')
        return done(undefined, { user, token }, undefined)
      } catch (error) {
        if (error.message === 'JWT') {
          return done(undefined, undefined, { message: 'JWT 無效' })
        } else {
          return done(undefined, undefined, { message: '未知錯誤' })
        }
      }
    }
  )
)
