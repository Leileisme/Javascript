import { closedDayData } from '../data/closedDay_data.js'
import fs from 'node:fs'
import _ from 'lodash'

export default async (e) => {
  try {
    const replies = _.chunk(closedDayData, 3)
      .slice(0, 1)
      .map((reply) => {
        return {
          type: 'flex',
          altText: '休市日',
          contents: {
            type: 'carousel',
            contents: reply
          }
        }
      })

    if (process.env.DEBUG === 'true') {
      fs.writeFileSync('./debug/closedDay.json', JSON.stringify(replies, null, 2))
    }

    const result = await e.reply(replies)
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}
