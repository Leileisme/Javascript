import 'dotenv/config'
import linebot from 'linebot'
import vegetable from './reply/vegetable.js'
import market from './reply/market.js'
import closedDay from './reply/closedDay.js'
import { scheduleJob } from 'node-schedule'
import * as vegetables from './data/vegetables_data.js'
import manual from './reply/manual.js'

// 定期更新
scheduleJob('2 3-13 * * *', () => {
  vegetables.update()
})

vegetables.update()

// 我的機器人
const bot = linebot({
  channelID: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', (event) => {
  if (process.env.DEBUG === 'true') {
    console.log(event)
  }

  const marketBuy = ['買', '購', 'buy', '哪裡', '賣']
  const closed = ['休市日', '休市', '休', '營業時間', '營業', '時間', '日期', '市場']
  const manuals = ['使用說明', '說明', '使用']

  console.log('Received message:', event.message.text)

  if (event.message.type === 'text') {
    const marketBuyMatch = marketBuy.filter((el) => event.message.text.includes(el))
    const closedMatch = closed.filter((el) => event.message.text.includes(el))
    const manualsMatch = manuals.filter((el) => event.message.text.includes(el))

    if (marketBuyMatch.length > 0) {
      market(event)
    } else if (closedMatch.length > 0) {
      closedDay(event)
    } else if (manualsMatch.length > 0) {
      manual(event)
    } else {
      vegetable(event)
    }
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
