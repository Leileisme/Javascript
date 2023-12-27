import 'dotenv/config'
import mongoose from 'mongoose'
import express from 'express'
// import { StatusCodes } from 'http-status-codes'
import routeProducts from './routes/products.js'
import routerUsers from './routes/users.js'

// 連線資料庫
mongoose.connect(process.env.DB_URL)

// 建立網頁伺服器
const app = express()

app.use(express.json())
app.use((_, req, res, next) => {
  res.status(400).json({
    success: false,
    message: '資料格式錯誤'
  })
})

app.use('/products', routeProducts)
app.use('/users', routerUsers)

app.listen(4000, () => {
  console.log('網頁伺服器啟動')
})
