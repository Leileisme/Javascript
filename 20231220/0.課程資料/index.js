import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import users from './users.js'
import { StatusCodes } from 'http-status-codes'
import validator from 'validator'
import cors from 'cors'

// 連線資料庫
mongoose.connect(process.env.DB_URL)

// 建立網頁伺服器
const app = express()

app.use(cors())

// 將傳入 express 伺服器請求的 body 解析為 json 格式
app.use(express.json())
// 處理轉 json 的錯誤，有錯才會進到這裡
// 處理 middleware 的錯誤 function 一定要填四個參數
// error = 錯誤訊息
// next() = 繼續下一步
app.use((_, req, res, next) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: '格式錯誤'
  })
})

// app.請求方式(路徑, 處理function)
app.post('/', async (req, res) => {
  console.log(req.body)
  try {
    // const user = await users.create(req.body)
    const user = await users.create({
      account: req.body.account,
      email: req.body.email
    })

    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: user
    })
  } catch (error) {
    console.log(error)
    if (error.name === 'MongoServerError' && error.code === 11000) {
      // 資料重複錯誤
      res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: '帳號或信箱重複'
      })
    } else if (error.name === 'ValidationError') {
      // 資料驗證錯誤
      // 取出第一個驗證失敗的欄位名稱
      const key = Object.keys(error.errors)[0]
      // 再用取出的欄位名稱取錯誤訊息
      const message = error.errors[key].message

      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '未知錯誤'
      })
    }
  }
})

app.get('/', async (req, res) => {
  try {
    const result = await users.find()
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '未知錯誤'
    })
  }
})

app.get('/:id', async (req, res) => {
  console.log(req.params.id)
  console.log('query', req.query)
  try {
    if (!validator.isMongoId(req.params.id)) throw new Error('ID_INVALID')

    // const user = await users.find({ _id: req.params.id })
    // const user = await users.findOne({ _id: req.params.id })
    const user = await users.findById(req.params.id)

    if (!user) throw new Error('NOT_FOUND')

    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: user
    })
  } catch (error) {
    console.log(error)
    if (error.name === 'CastError' || error.message === 'ID_INVALID') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: '格式錯誤'
      })
    } else if (error.message === 'NOT_FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: '查無資料'
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '未知錯誤'
      })
    }
  }
})

app.patch('/:id', async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.id)) throw new Error('ID_INVALID')

    // new: true --> 回傳更新後的資料
    // runValidators: true --> 執行 schema 定義的驗證
    const user = await users.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!user) throw new Error('NOT_FOUND')

    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: user
    })
  } catch (error) {
    if (error.name === 'CastError' || error.message === 'ID_INVALID') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: '格式錯誤'
      })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      // 資料重複錯誤
      res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: '帳號或信箱重複'
      })
    } else if (error.name === 'ValidationError') {
      // 資料驗證錯誤
      // 取出第一個驗證失敗的欄位名稱
      const key = Object.keys(error.errors)[0]
      // 再用取出的欄位名稱取錯誤訊息
      const message = error.errors[key].message

      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message
      })
    } else if (error.message === 'NOT_FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: '查無資料'
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '未知錯誤'
      })
    }
  }
})

app.delete('/:id', async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.id)) throw new Error('ID_INVALID')

    const user = await users.findByIdAndDelete(req.params.id)

    if (!user) throw new Error('NOT_FOUND')

    res.status(StatusCodes.OK).json({
      success: true,
      message: ''
    })
  } catch (error) {
    if (error.name === 'CastError' || error.message === 'ID_INVALID') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: '格式錯誤'
      })
    } else if (error.message === 'NOT_FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: '查無資料'
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '未知錯誤'
      })
    }
  }
})

// 綁定 4000 port
app.listen(4000, () => {
  console.log('伺服器啟動')
})
