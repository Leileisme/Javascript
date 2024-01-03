import passport from 'passport'
import { StatusCodes } from 'http-status-codes'

export const login = (req, res, next) => {
  passport.authenticate('login', { session: false }, (error, user, info) => {
    if (!user || error) {
      if (info.message === 'Missing credentials') {
        res.status(400).json({
          success: false,
          message: '欄位錯誤'
        })
        return
      } else if (info.message === '未知錯誤') {
        res.status(500).json({
          success: false,
          message: '未知錯誤'
        })
        return
      } else {
        res.status(401).json({
          success: false,
          message: info.message
        })
        return
      }
    }
    req.user = user
    next()
  })(req, res, next)
}
