import 'dotenv/config'
import express from 'express'
import bot from './bot.js'
import mongoose from 'mongoose'
import './passport.js'
import passport from 'passport'
import session from 'express-session'
import * as auth from './auth.js'

const app = express()

// 信任代理伺服器，LINE 登入用
app.set('trust proxy', 1)

// 設定 express-session，LINE 登入用
// 因為 line 登入事後端 -> LINE -> 後端
// 所以要使用 session 來記錄使用者資訊
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// 設定後端的 /linewebhook 是LINE 機器人
const linebotParser = bot.parser()
app.post('/linewebhook', linebotParser)

// 機器人推送通知測試
app.get('/', async (req, res) => {
  // bot.push('使用者 ID', '訊息')
  await bot.push('', 'aaa')
  res.status(200).send('推送通知成功')
})

// LINE 登入順序
// 1. 使用者點擊登入連結 (/login)
// 2. 導向 LINE 登入頁面
// 3. LINE 登入後，導向 callback (/line/callback)
// 確定後端網址和 LINE LOGIN CALLBACK URL 一致
// 如果後端網址是 http://localhost:4000
// 登入連結就是 http://localhost:4000/login
// LINE LOGIN CALLBACK URL 就是 http://localhost:4000/login/callback

// LINE 登入連結，導向 LINE 登入頁面
app.get('/login', passport.authenticate('line'))
// LINE 登入 callback 處理
app.get('/login/callback', auth.line, (req, res) => {
  // 登入成功後，導向前端網址的首頁
  const url = new URL('/', process.env.VUE_URL)
  // 將 token 帶入網址
  // 如果前端是 http://localhost:3000/
  // 就會變成 http://localhost:3000/?token=xxxx
  url.searchParams.set('token', req.token)
  // 重新導向
  res.redirect(url)
})

app.listen(process.env.PORT || 4000, async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Start')
})
