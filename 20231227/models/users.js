import { Schema, model, Error, ObjectId } from 'mongoose'
import validator from 'validator'
// 加密的套件
import bcrypt from 'bcrypt'

// 購物車要存新的??，所以再開一個
const cartSchema = new Schema({
  p_id: {
    type: ObjectId,
    // Id 來源是 Products
    ref: 'products',
    required: [true, '缺少購物車 ID']
  },
  // 商品數量
  quantity: {
    type: Number,
    min: [1, '商品數量不能小於1'],
    required: [true, '缺少購物車商品數量']
  }
})

const schema = new Schema(
  {
    email: {
      type: String,
      required: [true, '缺少使用者信箱'],
      // 資料欄位不可重複
      unique: true,
      validator: {
        validator(value) {
          return validator.isEmail(value)
        },
        message: '使用者信箱格式錯誤'
      }
    },
    // 資料庫格式
    password: {
      type: String,
      required: [true, '缺少使用者密碼']
      // 這邊是存加密的密碼
      // 因為密碼會加密，長度可能不固定或都一樣，所以不會定義密碼長度
      // 會另外用mongoose做驗證
    },
    // 購物車，看要不要不同裝置同步購物車資料
    cart: {
      type: [cartSchema]
    }
  },
  {
    // 停用 __v 以建立的資料仍會保有
    versionKey: false,
    // 紀錄資料的建立時間死更新時間
    timestamps: true
  }
)

// 資料驗證完後，進資料庫前
// 新增資料庫或使用 .save() 語法時會執行
// next 繼續執行下一步保存資料庫
// 不可用箭頭函式。不然不可用this
schema.pre('save', function (next) {
  // this 代表準備要被儲存的資料
  const user = this
  // 如果密碼欄位有被更改
  if (user.isModified('password')) {
    // 驗證密碼長度
    if (user.password.length >= 4 && user.password.length <= 20) {
      user.password = bcrypt.hashSync(user.password, 10)
    } else {
      // 不成功的話產生出一個 mongoose 驗證錯誤
      const error = new Error.ValidationError(null)
      error.addError('password', new Error.ValidatorError({ message: '密碼長度錯誤' }))
      // 繼續下一步，拋出錯誤
      next(error)
      return
    }
  }
  next()
})

export default model('users', schema)
