import fs from 'node:fs'
import manualTemplate from '../templates/manual_templates.js'

export default async (e) => {
// export const aaa = async (e) => {
  try {
    console.log('使用說明')
    const template = manualTemplate()

    if (process.env.DEBUG === 'true') {
      fs.writeFileSync('./debug/manual.json', JSON.stringify(template, null, 2))
    }
    const result = await e.reply({
      type: 'flex',
      altText: '小蔬機器人使用說明',
      contents: template
    })

    console.log(result)
  } catch (error) {
    console.log(error)
  }
}

// aaa()
