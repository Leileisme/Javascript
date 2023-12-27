import products from '../models/products.js'
import { StatusCodes } from 'http-status-codes'
import validator from 'validator'

export const create = async (req, res) => {
  try {
    const result = await products.create(req.body)
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
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

    // const result = await products.findOne({ _id: req.params.id})
    // params???
    // 這個是資料本人?
    const result = await products.findById(req.params.id)
    if (!result) throw new Error('NOT FOUND')

    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    console.log(error)
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

export const getAll = async (req, res) => {
  try {
    // 查詢範例
    // 1.分類名稱為手機'
    // 2.價格大於等於 4000 元
    // 3.名字必須符合正則表達式，包含不分大小寫的 Phone
    // (如果不是正則表達是 則要完全符合才可)
    // const result = await products.find({
    //   category: '手機',
    //   price: { $gte: 4000 },
    //   name: {
    //     $in: ['A', /phone/i]
    //   }
    // })

    // .sort({欄位:1 正序/-1 倒序})排序
    // .limit(限制筆數)
    // .skip(跳過筆數)
    // const result = await products.find({}).sort({ price: -1 }).skip(1)
    const result = await products.find({}).sort({ [req.query.sortBy || '_id']: req.query.sort * 1 || -1 * 1 })
    console.log(req.query)

    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '未知錯誤'
    })
  }
}
