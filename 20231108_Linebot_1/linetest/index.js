// 引用環境變數
import 'dotenv/config'
// 引用 line 機器人
import linebot from 'linebot'

// 建立機器人
const bot = linebot({
  channelID: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', (event) => {
  console.log(event)
  if (event.message.type === 'text') {
    event.reply(event.message.text)
  }
})

// 監聽傳入 localhost:3000 或 localhost:PORT 的請求
bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
