// 處理解析 form-data 的套件
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { StatusCodes } from 'http-status-codes'

// cloudinary 套件提供方法，用來配置 Cloudinary 的設置
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const upload = multer({
  // 儲存位置
  storage: new CloudinaryStorage({ cloudinary }),
  // 允許的檔案方
  // callback 回報
  fileFilter(req, file, callback) {
    // 限制只允許特定圖片
    if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
      // callback(拋出的錯誤,是否與允許上傳)
      callback(null, true)
    } else {
      // 使用跟套件一樣的錯誤格式，之後方便處理
      // LIMIT_FILE_SIZE 是自訂的錯誤代碼
      callback(new multer.MulterError('LIMIT_FILE_SIZE'), false)
    }
  },
  limits: {
    // 限制檔案大小為 1MB，超過會出現 LIMIT_FILE_SIZE
    fileSize: 1024 * 1024
  }
})

export default (req, res, next) => {
  // // 接受 1 個 image 欄位的檔案
  // upload.single('image')
  // // 接受 10 個 image 欄位的檔案
  // upload.array('image', 10)
  // // 接受 1 個 array 欄位的檔案 和 5 個 photos 欄位的檔案
  // upload.fields([
  //   { name: 'avatar', maxCount: 1 },
  //   { name: 'photos', maxCount: 5 }
  // ])

  // (error) 自動出現() ，是一個error箭頭函式的()
  upload.single('image')(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      let message = '上傳錯誤'
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else if (error.code === 'LIMIT_FILE_FORMAT') {
        message = '檔案格式錯誤'
      }
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message
      })
    } else if (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '伺服器錯誤'
      })
    } else {
      next()
    }
  })
}
