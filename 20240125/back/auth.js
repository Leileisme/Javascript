import passport from 'passport'

export const line = (req, res, next) => {
  // 使用 line 驗證方式
  passport.authenticate('line', { session: false }, (error, data, info) => {
    if (error) {
      console.log(error)
      res.status(500).json('錯了')
    } else if (data) {
      req.user = data.user
      req.token = data.token
    }
    next()
  })(req, res, next)
}
