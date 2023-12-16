import axios from 'axios'
import * as cheerio from 'cheerio'
import vegetableTemplates from '../templates/vegetable_templates.js'
import url from 'node:url'

export const vegetablesData = []

export const update = async () => {
  console.log('更新資料')
  // 每次清空陣列
  vegetablesData.splice(0, vegetablesData.length)

  try {
    const now = new Date()
    const year = now.getFullYear() - 1911
    let month = now.getMonth() + 1
    let date = now.getDate()

    if (month < 10) {
      month = '0' + month
    }

    if (date < 10) {
      date = '0' + date
    }

    // 找出預警水果
    const { data: dataF } = await axios.post(
      'https://www.tapmc.com.tw/Pages/Trans/Signal',
      new url.URLSearchParams({
        ctl00$ContentPlaceHolder1$txtDate: `${year}/${month}/${date}`,
        ctl00$ContentPlaceHolder1$DDL_Category: 'F',
        __EVENTTARGET: 'ctl00$ContentPlaceHolder1$btnQuery',
        __EVENTARGUMENT: '',
        __VIEWSTATE:
          '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',
        __VIEWSTATEGENERATOR: 'C33416DE',
        __EVENTVALIDATION:
          '/wEdAAYl0ycDkKx+Y0/xvQjnMwcv/3huOwdz7wQ5dyRkow4UaWBFAmEGP+bKjgPZi3o0nxadPY2kA5S+kpp480yySc++IAtYZ8E1qEnrVY4cgWKEmqlWyR2FR9yhbUlUSLYAxVTq7vlVLfBLk3Vtlsaklukv7S3V6qNVyuf07doah/Vgpg=='
      }).toString()
    )

    const $F = cheerio.load(dataF)
    const trFruit = $F('tbody').find('tr').length - 1
    console.log($F('tbody').find('tr').eq(1).find('td').eq(2).text(), '迴圈外的預警品種') // 這邊對

    // 找出每一頁 title ，再與預警水果的「品種」比對(「進口」、「其他」還須想其他驗證)
    for (let i = 1; i <= 31; i++) {
      // console.log($F('tbody').find('tr').eq(i).find('td').eq(2).text(), '迴圈外的預警品種') // 這邊對(i>J的數量)
      const { data } = await axios.get(`https://www.twfood.cc/fruit?page=${i}&per-page=5`)
      const $ = cheerio.load(data)
      $('#vege_chart').each(function (index) {
        const template = vegetableTemplates()
        const img = $(this).find('img').attr('src')
        const imgUrl = new URL(img, 'https://www.twfood.cc/')
        const title = $(this).find('img').attr('alt')
        const dayPrice = $(this).find('table').find('tr').eq(5).find('th').eq(0).text()
        const weekPrice = $(this).find('table').find('tr').eq(2).find('th').eq(0).text()
        template.body.contents[1].contents[0].contents[1].text = dayPrice
        template.body.contents[1].contents[1].contents[1].text = weekPrice
        template.hero.url = imgUrl
        template.body.contents[0].text = title

        for (let j = 1; j <= trFruit; j++) {
          if (title.includes($F('tbody').find('tr').eq(j).find('td').eq(2).text())) {
            const priceF = ($F('tbody').find('tr').eq(j).find('td').eq(5).text() * 0.6).toString()
            template.body.contents[1].contents[2].contents[1].text = '警戒'
            template.body.contents[1].contents[2].contents[1].color = '#ff0000'
            template.body.contents[1].contents[2].contents[1].size = 'lg'
            template.body.contents[1].contents[3].contents[1].text = priceF
            // console.log(title, '：　', $F('tbody').find('tr').eq(j).find('td').eq(2).text())
            //  'J迴圈內 「抬頭：預警品種」 比對成功時預警品種會顯示'

            break
          } else {
            template.body.contents[1].contents[2].contents[1].text = '無警戒'
            template.body.contents[1].contents[2].contents[1].color = '#cccccc'
            template.body.contents[1].contents[2].contents[1].size = 'md'
            template.body.contents[1].contents[3].contents[1].text = '---'
            // console.log(title, '：　', $F('tbody').find('tr').eq(j).find('td').eq(2).text())
            //  'J迴圈內 「抬頭：預警品種」 前面比對成功便不會出現了(EX香蕉)'
          }
        }

        template.footer.contents[0].action.label = '我現在就想要！'
        template.footer.contents[0].action.text = '我可以去哪裡買呢~'
        vegetablesData.push(template)
      })
    }
    console.log('解析完畢')
  } catch (error) {
    console.log(error)
  }
}

update()
