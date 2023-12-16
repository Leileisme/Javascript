// import axios from 'axios'
// import cheerio from 'cheerio'
import closedDayTemplates from '../templates/closedDay_templates.js'

export const closedDayData = []

export const closedDayUpload = async (e) => {
  try {
    const now = new Date()
    const nowYear = now.getFullYear()
    const nowMonth = now.getMonth() + 1

    for (let i = nowMonth; i <= 24; i++) {
      const template = closedDayTemplates()
      if (i < 13) {
        template.body.contents[0].url = `https://raw.githubusercontent.com/Leileisme/Linebot/main/images/date/date_${nowYear}_${i}.jpg`

        closedDayData.push(template)
      } else {
        template.body.contents[0].url = `https://raw.githubusercontent.com/Leileisme/Linebot/main/images/date/date_${
          nowYear + 1
        }_0${i - 12}.jpg`
        closedDayData.push(template)
      }
    }

    // console.log(closedDayData[7].body.contents[0].url)
  } catch (error) {
    console.log(error)
  }
}

closedDayUpload()
