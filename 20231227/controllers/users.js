import users from '../models/users.js'
import { StatusCodes } from 'http-status-codes'
import validator from 'validator'
import products from '../models/products.js'

export const create = async (req, res) => {
  try {
    const result = await users.create(req.body)
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
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
      console.log(key, 'key')
      // 再用取出的欄位名稱取錯誤訊息
      // 用變數的值，取物件的key，要用[]
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
}

// 出不來????????
export const addCart = async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.id)) throw new Error('USER ID INVALID')
    if (!validator.isMongoId(req.body.product)) throw new Error('PRODUCT ID INVALID')

    // body?????
    const product = await products.findById(req.body.product)
    if (!product) throw new Error('PRODUCT NOT FOUND')
    console.log(product)

    // 在 express 網頁伺服器的框架中，是通過路由路徑的占位符来定义的
    // 允许你在处理请求时动态地从 URL 中提取数值或字符串
    // 根据不同的 URL 提取出相关的信息
    const user = await users.findById(req.params.id)
    if (!user) throw new Error('USER NOT FOUND')

    const idx = user.cart.findIndex((item) => item.p_id.toString() === req.body.product)
    if (idx > -1) {
      // quantity 數量(自定義)
      user.cart[idx].quantity = req.body.quantity
    } else {
      user.cart.push({
        p_id: req.body.product,
        quantity: req.body.quantity
      })
    }
    await user.save()
    res.status(StatusCodes.OK).json({
      success: true,
      message: ''
    })
  } catch (error) {
    console.log(error)
    if (error.name === 'CastError' || error.message === 'USER ID INVALID' || error.message === 'PRODUCT ID INVALID') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: '格式錯誤'
      })
    } else if (error.message === 'PRODUCT NOT FOUND' || error.message === 'USER NOT FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: '查無資料'
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
}

export const getId = async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.id)) throw new Error('ID INVALID')
    // 'email password' 只取 email 和 password
    // '-password' 除了 password 以外的欄位

    // .populate(關聯欄位,(可加只取某個欄位) 把哪一個欄位關聯的資料放進來，需要有ref (mongoose才有的功能)
    // .populate('cart.p_id','price name')
    const result = await users.findById(req.params.id, '-password').populate('cart.p_id')
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    if (error.name === 'CastError' || error.message === 'ID INVALID') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: '格式錯誤'
      })
    } else if (error.message === 'NOT FOUND') {
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
}
