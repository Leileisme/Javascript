// 執行 dotenv 裡面的  config
import 'dotenv/config'
import linebot from 'linebot'
import fe from './commands/fe.js'
import be from './commands/be.js'
import anime from './commands/anime.js'
import { scheduleJob } from 'node-schedule'
import * as usdtwd from './data/usdtwd.js'

// 定期更新
scheduleJob('0 0 * * *', () => {
  usdtwd.update()
})

usdtwd.update()

// line 機器人
const bot = linebot({
  channelID: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', (event) => {
  if (process.env.DEBUG === 'true') {
    console.log(event)
  }

  if (event.message.type === 'text') {
    if (event.message.text === '前端') {
      fe(event)
    } else if (event.message.text === '後端') {
      be(event)
    } else if (event.message.text.startsWith('動畫')) {
      anime(event)
    } else if (event.message.text === '匯率') {
      event.reply(usdtwd.exrate.toString())
    }
  }
})

// 回應寫完，要從終端機 > 連接埠 轉接給line機器人
// 連接埠 輸入3000 複製轉送網址 可見度：開公用
// line 機器人後台 Messaging API > Webhook UR 貼上網址>驗證
bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
