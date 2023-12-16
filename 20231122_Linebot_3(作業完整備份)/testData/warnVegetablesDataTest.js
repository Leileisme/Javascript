// 安裝了npm install puppeteer
// 這種使用方式與import的差異? const puppeteer = require('puppeteer')
import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio'

//  headless模式(無顯示實際的瀏覽器窗口，節省系統資源，默認模式)
// head模式(有顯示實際瀏覽器窗口，用於測試與開發，較耗系資源，需有圖形用戶界面（GUI）環境(??))
const warnVegetablesData = async (e) => {
  try {
    // 模擬新增一個瀏覽器
    const browser = await puppeteer.launch({ headless: 'new' })
    // 新增視窗
    const page = await browser.newPage()
    await page.goto('https://www.tapmc.com.tw/Pages/Trans/Price1')
    // 這邊 evaluate 可以讓瀏覽器執行函數，模擬觸發查詢動作
    await page.evaluate(() => {
      // 【查詢按鈕的HTML】<a id="ContentPlaceHolder1_btnQuery" class="button submit" href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$btnQuery','')">查詢</a>

      // 方法1
      // 【__doPostBack】被說 not defined，但仍可執行?
      __doPostBack('ctl00$ContentPlaceHolder1$btnQuery', 'V')

      // 方法2
      // const btn = '#ContentPlaceHolder1_btnQuery'
      // document.querySelector(btn).click()
    })

    // 等待取得網頁內容，這個語法說被棄用，但目前資料有跑出來，這邊要改嗎?
    // 這邊等待的時間長短有差異嗎?(目前1000跑得出結果)
    await page.waitForTimeout(1000)

    const data = await page.content()
    const $ = cheerio.load(data)
    console.log($('tbody').find('tr').eq(0).find('td').eq(1).text())

    // console.log(data)
    console.log('123')
    await browser.close()
  } catch (error) {
    console.log(error)
  }
}
warnVegetablesData()
