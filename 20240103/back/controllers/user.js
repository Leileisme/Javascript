import users from '../models/users.js'
import jwt from 'jsonwebtoken'

export const create = async (req, res) => {
  try {
    await users.create(req.body)
    res.status(200).json({
      success: true,
      message: ''
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors[0])
      const message = error.errors[key].message
      res.status(400).json({
        success: false,
        message
      })
      //  資料重複的錯誤代碼11000
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(409).json({
        success: false,
        message: '帳號已註冊'
      })
    } else {
      res.status(500).json({
        success: false,
        message: '未知錯誤'
      })
    }
  }
}

export const login = async (req, res) => {
  try {
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    req.user.tokens.push(token)
    await req.user.save()
    res.status(200).json({
      success: true,
      message: '',
      result: {
        token,
        account: req.user.account,
        email: req.user.email,
        role: req.user.role,
        // total 總數，current 當前的，
        cart: req.user.cart.reduce((total, current) => {
          return total + current.quantity
        }, 0)
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: '未知錯誤'
    })
  }
}
