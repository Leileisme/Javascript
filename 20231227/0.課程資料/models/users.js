import { Schema, model, Error, ObjectId } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

const cartSchema = new Schema({
  p_id: {
    type: ObjectId,
    // ID 來源是 products
    ref: 'products',
    required: [true, '缺少購物車商品 ID']
  },
  quantity: {
    type: Number,
    min: [1, '購物車商品數量不能小於 1'],
    required: [true, '缺少購物車商品數量']
  }
})

const schema = new Schema({
  email: {
    type: String,
    required: [true, '缺少使用者信箱'],
    unique: true,
    validate: {
      validator (value) {
        return validator.isEmail(value)
      },
      message: '使用者信箱格式錯誤'
    }
  },
  password: {
    type: String,
    required: [true, '缺少使用者密碼']
  },
  cart: {
    type: [cartSchema]
  }
}, {
  // 停用 __v
  versionKey: false,
  // 紀錄資料的建立時間與最後更新時間
  timestamps: true
})

// 資料驗證完後，進資料庫前
// 新增資料或使用 .save() 語法時會執行
// next 繼續執行下一步保存進資料庫
schema.pre('save', function (next) {
  // this 代表準備要被儲存的資料
  const user = this
  // 如果密碼欄位有被更改
  if (user.isModified('password')) {
    // 驗證密碼長度
    if (user.password.length >= 4 && user.password.length <= 20) {
      // 成功的話加密
      user.password = bcrypt.hashSync(user.password, 10)
    } else {
      // 不成功的話產生一個 mongoose 驗證錯誤
      const error = new Error.ValidationError(null)
      error.addError('password', new Error.ValidatorError({ message: '密碼長度錯誤' }))
      // 繼續下一步，拋出錯誤
      next(error)
      return
    }
  }
  // 繼續下一步
  next()
})

export default model('users', schema)
