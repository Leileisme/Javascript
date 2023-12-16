import axios from 'axios'
import * as cheerio from 'cheerio'
import beTemplate from '../templates/be.js'

export default async (event) => {
  try {
    //  { data:a }  可以重新命名data，這邊就是a
    const { data } = await axios.get('https://wdaweb.github.io/')
    const $ = cheerio.load(data)
    // console.log(data)
    const replies = []
    $('#be .card').each(function () {
      const img = $(this).find('img').attr('src')
      // new URL('東西的src','網址') ，會把它組合起來，變成一個新網址
      const imgUrl = new URL(img, 'https://wdaweb.github.io/')
      const title = $(this).find('.card-title').text().trim()

      // console.log(img, title)
      // 產生一個 新回應的模板
      const template = beTemplate()
      // 修改模板內容
      template.hero.url = imgUrl
      template.body.contents[0].text = title
      replies.push(template)
    })
    const result = await event.reply({
      type: 'flex',
      altText: '後端課程',
      contents: {
        type: 'carousel',
        contents: replies
      }
    })
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}
