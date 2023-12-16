import 'dotenv/config'
import linebot from 'linebot'
import fe from './commands/fe.js'
import be from './commands/be.js'
import anime from './commands/anime.js'
import { scheduleJob } from 'node-schedule'
import * as usdtwd from './data/usdtwd.js'

// https://crontab.guru/once-a-day
scheduleJob('0 0 * * *', () => {
  usdtwd.update()
})
usdtwd.update()

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', event => {
  if (process.env.DEBUG === 'true') {
    console.log(event)
  }

  if (event.message.type === 'text') {
    if (event.message.text === '前端') {
      fe(event)
    } else if (event.message.text === '後端') {
      be(event)
    } else if (event.message.text.startsWith('動畫')) {
      // 動畫14882
      anime(event)
    } else if (event.message.text === '匯率') {
      event.reply(usdtwd.exrate.toString())
    } else if (event.message.text === '123') {
      event.reply({
        type: 'text',
        text: '123',
        quickReply: {
          items: [
            {
              type: 'action',
              action: {
                // 傳訊息
                type: 'message',
                // 傳送的文字
                text: 'message text',
                // 按鈕的文字
                label: 'message'
              }
            },
            {
              type: 'action',
              action: {
                type: 'camera',
                label: '相機'
              }
            },
            {
              type: 'action',
              action: {
                type: 'cameraRoll',
                label: '相簿'
              }
            },
            {
              type: 'action',
              action: {
                type: 'location',
                label: '位置'
              }
            },
            {
              type: 'action',
              action: {
                type: 'uri',
                uri: 'https://wdaweb.github.io',
                label: '網址'
              }
            },
            {
              type: 'action',
              action: {
                type: 'postback',
                label: 'postback',
                // 傳送的文字
                // text: 'postback 文字',
                // postback 事件接收到的資料
                data: '111222333'
              }
            }
          ]
        }
      })
    }
  }
})

bot.on('postback', event => {
  console.log(event.postback.data)
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
