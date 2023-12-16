// 預設情況下，axios 將 JavaScript 物件序列化為 JSON
import axios from 'axios'

// 用於處理和解析URL，URL編碼(URL-coding)，又稱百分號編碼，俗稱網址。
// 統一資源標示符的一種，用於通過HTTP的請求操作提交HTML表單資料
// 為什麼需要URL編碼？參數值中包含了像＆或＝這種特殊符號，傳輸的過程中會產生歧異
// (但在各個字節前加上 % 的話，就會將 % 後方的特殊字節當作普通字節)
import url from 'node:url'

const main = async () => {
  const { data } = await axios.post(
    'https://www.tapmc.com.tw/Pages/Trans/Signal',
    new url.URLSearchParams({
      ctl00$ContentPlaceHolder1$txtDate: '112/12/01',
      ctl00$ContentPlaceHolder1$DDL_Category: 'F',
      __EVENTTARGET: 'ctl00$ContentPlaceHolder1$btnQuery',
      __EVENTARGUMENT: '',
      __EVENTVALIDATION: '',
      __VIEWSTATE: '',
      __VIEWSTATEGENERATOR: ''
    }).toString()
  )
  console.log(data)
}

main()

// 【url.URLSearchParams】的作用

// 用於處理 URL 查詢參數。他接受一個對象，將對象的鍵值對轉換為URL查詢字符
// 以上是：將POST請求的參數物件轉換為符合x-www-form-urlencoded格式的字串，以便傳送給伺服器。
// 物件形式的輸入會轉換為鍵值對，字串形式的輸入會被解析為查詢參數。

// 【若不使用 x-www-form-urlencoded 格式】
// 假設使用 JSON 格式，資料會以 JSON 格式放在請求的主體中
// 伺服器端需要能夠處理 JSON 格式的請求
// 通常需要在請求頭中設定Content-Type: application/json

// -------------------------------------------------------------------------------
// 【在HTTP協定中，表單資料可以使用兩種主要格式】
// 1、x-www-form-urlencoded
// 跟 URL query data 一樣，會把要傳的資料用 URL 編碼的方式串成一個 string。
// {
//   username: 'admin',
//   password: '123456'
// }
// 他的 url encode 就是長這樣: username=admin&password=123456
// 也就是會被組合成一條純文字

// 2、multipart/form-data
// 會將資料的每個部分以 boundary string 隔開，並會包含每個部份的 Content-Type（MIME）& Content-Disposition（meta-data）。
// 適合用來傳送含有 binary 的資料（單一 binary 的話會用 Content-Type: application/octet-stream 來傳），例如：圖片、檔案等等。

// 參考網址(https://hackmd.io/@louis383/SkhZ7E97Z)
