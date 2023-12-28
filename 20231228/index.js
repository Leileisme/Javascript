import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import { StatusCodes } from 'http-status-codes'
import routerUsers from './routes/users.js'
import './passport/passport.js'
// 只要動到env 終端機就要重開

const app = express()

// 只吃express格式，不吃form-data 所以要用upload
app.use(express.json())
app.use((_, req, res, next) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: '資料格式錯誤'
  })
})

app.use('/users', routerUsers)

app.listen(4000, async () => {
  console.log('伺服器啟動')
  // 放下來是為了 console.log('資料庫連線成功')，或是在上面寫.then
  await mongoose.connect(process.env.DB_URL)
  console.log('資料庫連線成功')
})
