import { vegetablesData, finish } from '../data/vegetables_data.js'
import _ from 'lodash'
import fs from 'node:fs'

export default async (e) => {
  try {
    // 判斷資料完成才可以(文字帶改)
    if (!finish) {
      e.reply('Loading最新資料~等我10秒><')
      return
    }

    const data = vegetablesData.filter((vegetableTemplate) => {
      return vegetableTemplate.body.contents[0].text.includes(e.message.text)
    })

    const replies = _.chunk(data, 10)
      .slice(0, 3)
      .map((reply) => {
        return {
          type: 'flex',
          altText: '來囉！熱騰騰的今日蔬果價~',
          contents: {
            type: 'carousel',
            contents: reply
          }
        }
      })

    if (process.env.DEBUG === 'true') {
      fs.writeFileSync('./debug/vegetable.json', JSON.stringify(replies, null, 2))
    }

    let result
    if (replies.length > 0) {
      result = await e.reply(replies)
    } else {
      const random = Math.floor(Math.random() * 5)
      const words = ['大蒜', '香蕉', '青江', '油麥菜', '猴頭菇']
      const word = words[random]
      result = await e.reply(`找不到QQ 用單詞查詢蔬果(如:${word})`)
    }
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}
