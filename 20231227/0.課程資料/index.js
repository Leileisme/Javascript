import 'dotenv/config'
import mongoose from 'mongoose'
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import routeProducts from './routes/products.js'
import routeUsers from './routes/users.js'

mongoose.connect(process.env.DB_URL)

const app = express()

app.use(express.json())
app.use((_, req, res, next) => {
  res
    .status(StatusCodes.BAD_REQUEST)
    .json({
      success: false,
      message: '資料格式錯誤'
    })
})

app.use('/products', routeProducts)
app.use('/users', routeUsers)

app.listen(4000, () => {
  console.log('網頁伺服器啟動')
})
