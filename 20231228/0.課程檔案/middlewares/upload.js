import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { StatusCodes } from 'http-status-codes'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const upload = multer({
  storage: new CloudinaryStorage({ cloudinary }),
  fileFilter (req, file, callback) {
    // 限制只允許特定圖片
    if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
      // callback(拋出的錯誤, 是否允許上傳)
      callback(null, true)
    } else {
      // 使用跟套件一樣的錯誤格式，之後方便一起處理
      // LIMIT_FILE_FORMAT 是自訂的錯誤代碼
      callback(new multer.MulterError('LIMIT_FILE_FORMAT'), false)
    }
  },
  limits: {
    // 限制檔案大小為 1MB，超過會出現 LIMIT_FILE_SIZE
    fileSize: 1024 * 1024
  }
})

export default (req, res, next) => {
  // 接受 1 個 image 欄位的檔案
  // upload.single('image')
  // 接受 10 個 image 欄位的檔案
  // upload.array('image', 10)
  // 接受 1 個 avatar 欄位的檔案和 5 個 photos 欄位的檔案
  // upload.fields([
  //   { name: 'avatar', maxCount: 1 },
  //   { name: 'photos', maxCount: 5 }
  // ])
  upload.single('image')(req, res, error => {
    if (error instanceof multer.MulterError) {
      // 處理上傳錯誤
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
      // 處理其他錯誤
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '伺服器錯誤'
      })
    } else {
      // 繼續下一步
      next()
    }
  })
}
