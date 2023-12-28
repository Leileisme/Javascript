import users from '../models/users.js'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'

export const create = async (req, res) => {
  try {
    const result = await users.create(req.body)
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message
      })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: '信箱已被註冊'
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '伺服器錯誤'
      })
    }
  }
}

export const login = async (req, res) => {
  try {
    // jwt.sign(保存的資料, SECRET, 設定)
    const token = jwt.sign(
      { _id: req.user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: '7 days' }
    )
    req.user.tokens.push(token)
    await req.user.save()
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: token
    })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '伺服器錯誤'
    })
  }
}

export const profile = (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: '',
    result: {
      email: req.user.email,
      avatar: req.user.avatar
    }
  })
}

export const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token !== req.token)
    await req.user.save()
    res.status(StatusCodes.OK).json({
      success: true,
      message: ''
    })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '伺服器錯誤'
    })
  }
}

export const avatar = async (req, res) => {
  try {
    // {
    //   fieldname: 'image',
    //   originalname: '0104.jpg',
    //   encoding: '7bit',
    //   mimetype: 'image/jpeg',
    //   path: 'https://res.cloudinary.com/xxx.jpg',
    //   size: 46736,
    //   filename: 'wfsjhnj7mhucazq9rcpj'
    // }
    console.log(req.file)
    req.user.avatar = req.file.path
    await req.user.save()
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: req.user.avatar
    })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '伺服器錯誤'
    })
  }
}
