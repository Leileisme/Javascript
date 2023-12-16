import { vegetablesData } from '../data/vegetables_data.js'
import _ from 'lodash'
import fs from 'node:fs'

export default async (e) => {
  try {
    const data = vegetablesData.filter((vegetableTemplate) => {
      return vegetableTemplate.body.contents[0].text.includes(e.message.text)
    })

    const replies = _.chunk(data, 10)
      .slice(0, 3)
      .map((reply) => {
        return {
          type: 'flex',
          altText: '蔬果時價',
          contents: {
            type: 'carousel',
            contents: reply
          }
        }
      })

    try {
      fs.writeFileSync('./debug/vegetable.json', JSON.stringify(replies, null, 2))
    } catch (error) {
      console.log('寫入錯誤', error)
    }

    let result
    if (replies.length > 0) {
      result = await e.reply(replies)
    } else {
      result = await e.reply('找不到QQ')
    }
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}
