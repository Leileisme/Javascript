import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio'

export const warnVegetablesData = []

export const warnVegetablesDataUpdata = async (e) => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' })

    // 下面有都做類似的事，可以把它們更簡化? 待用Promise.allSettled改
    const pageFruit = await browser.newPage()
    const pageVegetable = await browser.newPage()

    await pageFruit.goto('https://www.tapmc.com.tw/Pages/Trans/Signal')
    await pageVegetable.goto('https://www.tapmc.com.tw/Pages/Trans/Signal')

    // 查詢項目選則(蔬菜是預設，水果的要另外選)
    await pageFruit.select('#DDL_Category', 'F')

    // 查詢日期，會有預設查詢換日的問題
    // await pageFruit.type('#ContentPlaceHolder1_txtDate', '112/11/25')

    // 方法1
    await pageFruit.evaluate(() => {
      __doPostBack('ctl00$ContentPlaceHolder1$btnQuery', '')
      // 方法2
      // const btn = '#ContentPlaceHolder1_btnQuery'
      // document.querySelector(btn).click()
    })

    await pageVegetable.evaluate(() => {
      __doPostBack('ctl00$ContentPlaceHolder1$btnQuery', '')
    })

    // 這邊等待時間長短 與Line機器人的關係?
    const delay = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms))
    }
    await delay(3000)
    console.log('delay')

    const dataFruit = await pageFruit.content()
    const dataVegetable = await pageVegetable.content()
    console.log('data')

    const $F = cheerio.load(dataFruit)
    const $V = cheerio.load(dataVegetable)
    console.log('cheerio')

    console.log('預警蔬菜-品種', $F('tbody').find('tr').eq(1).find('td').eq(2).text())
    console.log('前五年同月批發價格(公斤)', $F('tbody').find('tr').eq(1).find('td').eq(6).text())
    console.log('預警水果-品種', $V('tbody').find('tr').eq(1).find('td').eq(2).text())
    console.log('前五年同月批發價格(公斤)', $V('tbody').find('tr').eq(1).find('td').eq(6).text())
    console.log('解析完畢')

    await browser.close()
  } catch (error) {
    console.log(error)
  }
}
warnVegetablesDataUpdata()
