import passport from 'passport'
import passportLine from 'passport-line'
import User from './user.js'
import jsonwebtoken from 'jsonwebtoken'

passport.use('line', new passportLine.Strategy({
  channelID: process.env.LINE_CHANNEL_ID,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  callbackURL: process.env.LINE_CALLBACK_URL,
  scope: ['profile', 'email', 'openid']
}, async (accessToken, refreshToken, profile, cb) => {
  // profile 格式
  // {
  //   provider: 'line',
  //   id: '',
  //   displayName: '',
  //   pictureUrl: '',
  //   statusMessage: ''
  // }
  try {
    // User.findOneAndUpdate 找一個並更新
    // upsert: true 如果找不到就新增
    // new: true 回傳更新後的資料
    const user = await User.findOneAndUpdate({ line: profile.id }, {
      name: profile.displayName,
      pictureUrl: profile.pictureUrl
    }, { upsert: true, new: true })
    const token = jsonwebtoken.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    user.tokens.push(token)
    await user.save()
    cb(null, { user, token })
  } catch (error) {
    console.log(error)
    cb(error, null)
  }
}))
