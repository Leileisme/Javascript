import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import users from './user.js'
import { StatusCodes } from 'http-status-codes'
import validator from 'validator'
// 跨源資源共享，它允許網頁應用程序向不同於其所屬域的伺服器發送請求
import cors from 'cors'

// 連線資料庫
mongoose.connect(process.env.DB_URL)

// 建立網頁伺服器
const app = express()

// 如果沒有寫，那就會出現錯誤
app.use(cors())

// 將傳入 express 伺服器請求的 body，解析成 json 的格式
app.use(express.json())
// 處理轉 JSON 的錯誤，有錯才會進到這邊
// 處理 middleware 的錯誤 function 一定要填四個參數(才代表錯誤處理)
// error = 錯誤訊息
// next() = 繼續下一步
app.use((_, req, res, next) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: '格式錯誤'
  })
})

// post 新增
// app.請求方式(路徑,處理function)
// req 請求的資訊，res 要回復的東西，這邊兩個代表處理請求的 function
app.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const user = await users.create({
      account: req.body.account,
      email: req.body.email
    })

    // const user = await users.create({req.body})

    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: user
    })
  } catch (error) {
    console.log(error)
    // 代表重複錯誤
    if (error.name === 'MongoServerError' && error.code === 11000) {
      // 你的請求跟伺服器跟??重複了
      // 找出哪一個饋有問題怎寫
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
      // 500 伺服器錯誤
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '未知錯誤'
      })
    }
  }
})

// get 查詢
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

// '/:id' (可以自己命名，這邊是要放id所以命名為id)
// 網址/後面的東西 叫做id
app.get('/:id', async (req, res) => {
  // ?a=b&c=d
  console.log(req.query)
  console.log(req.params.id)

  try {
    // 先驗證格式
    if (!validator.isMongoId(req.params.id)) throw new Error('ID_INVALID')

    // 這邊findById??
    const user = await users.findById(req.params.id)
    // const user = await users.find({ _id: req.params.id })
    // const user = await users.findOne({ _id: req.params.id })

    if (!user) throw new Error('NOT_FOUND')

    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: user
    })
  } catch (error) {
    // CastError 怎麼看的=>console.log(error)
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

// 更新
app.patch('/:id', async (req, res) => {
  try {
    // console.log(req.params.id)???
    if (!validator.isMongoId(req.params.id)) throw new Error('ID_INVALID')
    // new:true => 回傳更新後的資料 如果沒有會改資料，但是 function 傳進來的值是舊的
    // runValidators: true => 執行 schema 定義的驗證
    const user = await users.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!user) throw new Error('NOT_FOUND')

    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: user
    })
  } catch (error) {
    console.log(error)
  }
})

// 刪除
app.delete('/:id', async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.id)) throw new Error('ID_INVALID')

    const user = await users.findByIdAndDelete(req.params.id)

    if (!user) throw new Error('NOT_FOUND')

    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      // 這邊為何不用? 可用 看到刪除的東西
      result: user
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
