// 安裝了npm install puppeteer
// 這種使用方式與import的差異? const puppeteer = require('puppeteer')
import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio'

const warnVegetablesData = async (e) => {
  try {
    // 模擬新增一個瀏覽器
    const browser = await puppeteer.launch({ headless: 'new' })
    // 新增視窗
    const [pageFruit, pageVegetable] = await Promise.all([browser.newPage(), browser.newPage()])

    const gotoPage = [
      pageFruit.goto('https://www.tapmc.com.tw/Pages/Trans/Price1'),
      pageVegetable.goto('https://www.tapmc.com.tw/Pages/Trans/Price1')
    ]
    await Promise.all(gotoPage)

    // 查詢項目選則(蔬菜是預設，水果的要另外選)
    await pageFruit.select('#DDL_FV_Code', 'F')

    // 【查詢按鈕的HTML】<a id="ContentPlaceHolder1_btnQuery" class="button submit"
    // href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$btnQuery','')">查詢</a>
    // 方法1
    // 【__doPostBack】被說 not defined，但仍可執行?
    const evaluatePage = [
      pageFruit.evaluate(() => {
        __doPostBack('ctl00$ContentPlaceHolder1$btnQuery', '')
      }),
      pageVegetable.evaluate(() => {
        __doPostBack('ctl00$ContentPlaceHolder1$btnQuery', '')
      })
    ]

    // 方法2
    // const btn = '#ContentPlaceHolder1_btnQuery'
    // document.querySelector(btn).click()
    await Promise.all(evaluatePage)

    // 等待取得網頁內容，這個語法說被棄用，但目前資料有跑出來，這邊要改嗎?
    // 這邊等待的時間長短有差異嗎?(目前1000跑得出結果)
    const waitForTimeoutPage = [pageFruit.waitForTimeout(1000), pageVegetable.waitForTimeout(1000)]
    await Promise.all(waitForTimeoutPage)

    const [dataFruit, dataVegetable] = await Promise.all([pageFruit.content(), pageVegetable.content()])

    // 這種寫法會不好嗎? $F / $V
    const $F = cheerio.load(dataFruit)
    const $V = cheerio.load(dataVegetable)

    console.log('預警水果', $F('tbody').find('tr').eq(0).find('td').eq(1).text())
    console.log('預警蔬菜', $V('tbody').find('tr').eq(0).find('td').eq(1).text())
    await browser.close()
  } catch (error) {
    console.log(error)
  }
}
warnVegetablesData()
