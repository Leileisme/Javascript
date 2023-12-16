import marketTemplates from '../templates/market_templates.js'

export const markets = []
const template = marketTemplates()

export default async (e) => {
  try {
    markets.splice(0, markets.length)
    // 網址要用百分比編碼
    // (原本搜尋後面是寫中文 EX：https://www.google.com/maps/search/家樂福/)
    // https://developers.line.biz/en/reference/messaging-api/#other-common-specifications
    // encodeURI() 中文轉換編碼的語法
    // decodeURI() 編碼的語法轉成中文
    template.quickReply.items[0].action.uri = encodeURI('https://www.google.com/maps/search/市場')

    template.quickReply.items[0].imageUrl =
      'https://raw.githubusercontent.com/Leileisme/Linebot/main/images/Logo/Logo2.png'
    // template.quickReply.items[0].action.uri = 'https://www.google.com/maps/search/%E5%B8%82%E5%A0%B4'
    template.quickReply.items[0].action.label = '傳統市場'
    template.quickReply.items[1].imageUrl =
      'https://raw.githubusercontent.com/Leileisme/Linebot/main/images/Logo/quickReply_logo_01.jpg'
    template.quickReply.items[1].action.uri = 'https://www.google.com/maps/search/%E5%AE%B6%E6%A8%82%E7%A6%8F'
    template.quickReply.items[1].action.label = '家樂福'
    template.quickReply.items[2].imageUrl =
      'https://raw.githubusercontent.com/Leileisme/Linebot/main/images/Logo/quickReply_logo_02.jpg'
    template.quickReply.items[2].action.uri = 'https://www.google.com/maps/search/%E5%85%A8%E8%81%AF'
    template.quickReply.items[2].action.label = '全聯'
    template.quickReply.items[3].imageUrl =
      'https://raw.githubusercontent.com/Leileisme/Linebot/main/images/Logo/quickReply_logo_03.jpg'
    template.quickReply.items[3].action.uri = 'https://www.google.com/maps/search/%E6%84%9B%E8%B2%B7'
    template.quickReply.items[3].action.label = '愛買'
    template.quickReply.items[4].imageUrl =
      'https://raw.githubusercontent.com/Leileisme/Linebot/main/images/Logo/quickReply_logo_04.jpg'
    template.quickReply.items[4].action.uri = 'https://www.google.com/maps/search/%E5%A4%A7%E6%BD%A4%E7%99%BC'
    template.quickReply.items[4].action.label = '大潤發'
    template.quickReply.items[5].imageUrl =
      'https://raw.githubusercontent.com/Leileisme/Linebot/main/images/Logo/quickReply_logo_05.jpg'
    template.quickReply.items[5].action.uri = 'https://www.google.com/maps/search/%E5%A5%BD%E5%B8%82%E5%A4%9A'
    template.quickReply.items[5].action.label = 'costco'

    markets.push(template)

    const result = await e.reply(markets)
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}
