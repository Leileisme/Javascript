import passport from 'passport'
import { StatusCodes } from 'http-status-codes'
import jsonwebtoken from 'jsonwebtoken'

export const login = (req, res, next) => {
  // 使用設定的驗證方式
  // sesstion: false 停用 cookie
  // (error, user, info) 對應到 done() 的三個參數
  passport.authenticate('login', { session: false }, (error, user, info) => {
    console.log(error, user, info)
    if (!user || error) {
      // 進來的 req.body 少了指定欄位
      if (info.message === 'Missing credentials') {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: '欄位錯誤'
        })
        return
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: info.message
        })
        return
      }
    }
    // 將查詢到的使用者放入 req 中給後面的 controller 或 middleware 使用
    req.user = user
    // 繼續下一步
    next()
  })(req, res, next)
}

export const jwt = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, data, info) => {
    console.log(error, data, info)
    if (error || !data) {
      // 如果是 JWT 錯誤，可能是格式不對、過期或被竄改
      if (info instanceof jsonwebtoken.JsonWebTokenError) {
        if (info.name === 'TokenExpiredError') {
          res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'JWT 過期'
          })
        } else {
          res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'JWT 無效'
          })
        }
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: info.message
        })
      }
      return
    }
    req.user = data.user
    req.token = data.token
    next()
  })(req, res, next)
}
