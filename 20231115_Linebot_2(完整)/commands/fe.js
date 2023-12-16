// 處理"前端"機器的人指令的回覆 的檔案
import axios from 'axios'
// 套件 可以用JQ語法來寫
import * as cheerio from 'cheerio'

export default async (event) => {
  try {
    //  { data:a }  可以重新命名data，這邊就是a
    const { data } = await axios.get('https://wdaweb.github.io/')
    const $ = cheerio.load(data)
    // console.log(data)
    const replies = []
    $('#fe .card-title').each(function () {
      replies.push($(this).text().trim())
    })
    event.reply(replies)
  } catch (error) {
    console.log(error)
  }
}
