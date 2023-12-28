import { Schema, Error, model } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

const schema = new Schema({
  email: {
    type: String,
    required: [true, '缺少使用者信箱'],
    unique: true,
    validator: {
      validate (value) {
        return validator.isEmail(value)
      },
      message: '使用者信箱格式錯誤'
    }
  },
  password: {
    type: String,
    required: [true, '缺少使用者密碼']
  },
  avatar: {
    type: String,
    // 設定預設值
    default () {
      // this.email 指的是同一筆資料 email 欄位的值
      return `https://source.boringavatars.com/beam/120/${this.email}?colors=4EB3DE,8DE0A6,FCF09F,F27C7C,DE528C`
    }
  },
  tokens: {
    type: [String]
  }
})

schema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {
    if (user.password.length >= 4 && user.password.length <= 20) {
      user.password = bcrypt.hashSync(user.password, 10)
    } else {
      const error = new Error.ValidationError(null)
      error.addError('password', new Error.ValidatorError({ message: '密碼長度錯誤' }))
      next(error)
      return
    }
  }
  next()
})

export default model('users', schema)
