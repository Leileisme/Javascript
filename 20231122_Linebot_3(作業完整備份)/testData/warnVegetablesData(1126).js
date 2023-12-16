// 安裝了npm install puppeteer
// 這種使用方式與import的差異? const puppeteer = require('puppeteer')
import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio'

export const warnVegetablesData = []

export const warnVegetablesDataUpdata = async (e) => {
  try {
    // 模擬新增一個瀏覽器
    const browser = await puppeteer.launch({ headless: 'new' })
    // 新增視窗
    // 下面有都做類似的事，可以把它們更簡化?陣列之類的(原本用下面的，但若其中一個失敗便失敗，不是我想要的)
    // const [pageFruit, pageVegetable] = await Promise.all([browser.newPage(), browser.newPage()])
    const pageFruit = await browser.newPage()
    const pageVegetable = await browser.newPage()

    await pageFruit.goto('https://www.tapmc.com.tw/Pages/Trans/Price1')
    await pageVegetable.goto('https://www.tapmc.com.tw/Pages/Trans/Price1')

    // 查詢項目選則(蔬菜是預設，水果的要另外選)
    await pageFruit.select('#DDL_FV_Code', 'F')
    console.log('F')
    await pageFruit.type('#ContentPlaceHolder1_txtDate', '112/11/25')
    console.log('11/25')

    // 【查詢按鈕的HTML】<a id="ContentPlaceHolder1_btnQuery" class="button submit"
    // href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$btnQuery','')">查詢</a>
    // 方法1
    // 【__doPostBack】被說 not defined，但仍可執行?

    await pageFruit.evaluate(() => {
      __doPostBack('ctl00$ContentPlaceHolder1$btnQuery', '')
      // 方法2
      // const btn = '#ContentPlaceHolder1_btnQuery'
      // document.querySelector(btn).click()
    })

    await pageVegetable.evaluate(() => {
      __doPostBack('ctl00$ContentPlaceHolder1$btnQuery', '')
    })

    // 目前 1000ms 跑得出結果，這邊等待時間長短要怎麼抓好?
    const delay = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms))
    }
    await delay(5000)
    console.log('delay')

    const dataFruit = await pageFruit.content()
    const dataVegetable = await pageVegetable.content()
    console.log('data')

    // 這種寫法會不好嗎? $F / $V
    const $F = cheerio.load(dataFruit)
    const $V = cheerio.load(dataVegetable)
    console.log('cheerio')

    console.log('預警水果', $F('tbody').find('tr').eq(0).find('td').eq(1).text())
    console.log('預警蔬菜', $V('tbody').find('tr').eq(0).find('td').eq(1).text())
    console.log('解析完畢')

    await browser.close()
  } catch (error) {
    console.log(error)
  }
}
warnVegetablesDataUpdata()
