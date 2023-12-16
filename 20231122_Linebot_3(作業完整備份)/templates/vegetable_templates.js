export default () => {
  return {
    type: 'bubble',
    hero: {
      type: 'image',
      url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
      size: 'full',
      aspectRatio: '20:13',
      aspectMode: 'cover'
    },
    body: {
      type: 'box',
      layout: 'vertical',
      backgroundColor: '#212529',
      contents: [
        {
          type: 'text',
          text: 'Brown Cafe',
          weight: 'bold',
          color: '#ffffff',
          size: 'xl'
        },
        {
          type: 'box',
          layout: 'vertical',
          margin: 'lg',
          spacing: 'sm',
          contents: [
            {
              type: 'box',
              layout: 'baseline',
              spacing: 'sm',
              contents: [
                {
                  type: 'text',
                  text: '預估零售價',
                  color: '#cccccc',
                  size: 'sm',
                  flex: 6
                },
                {
                  type: 'text',
                  text: 'Miraina Tower, 4-1-6 Shinjuku, Tokyo',
                  wrap: true,
                  color: '#ffc107',
                  weight: 'bold',
                  size: 'lg',
                  flex: 3,
                  margin: 'xxl'
                },
                {
                  type: 'text',
                  text: '元 /台斤',
                  wrap: true,
                  color: '#cccccc',
                  size: 'sm',
                  flex: 3
                }
              ]
            },
            {
              type: 'box',
              layout: 'baseline',
              spacing: 'sm',
              contents: [
                {
                  type: 'text',
                  text: '平均批發價(本周)',
                  color: '#cccccc',
                  size: 'sm',
                  flex: 6
                },
                {
                  type: 'text',
                  text: '10:00 - 23:00',
                  wrap: true,
                  color: '#ffc107',
                  weight: 'bold',
                  size: 'lg',
                  flex: 3,
                  margin: 'xxl'
                },
                {
                  type: 'text',
                  text: '元 /台斤',
                  wrap: true,
                  color: '#cccccc',
                  size: 'sm',
                  flex: 3
                }
              ]
            },
            {
              type: 'box',
              layout: 'baseline',
              spacing: 'sm',
              contents: [
                {
                  type: 'text',
                  text: '行情預警',
                  color: '#cccccc',
                  size: 'sm',
                  flex: 6
                },
                {
                  type: 'text',
                  text: '---',
                  wrap: true,
                  color: '#cccccc',
                  weight: 'bold',
                  size: 'lg',
                  flex: 6,
                  margin: 'xxl'
                }
              ]
            },
            {
              type: 'box',
              layout: 'baseline',
              spacing: 'sm',
              contents: [
                {
                  type: 'text',
                  text: '近5年同月批發價',
                  color: '#cccccc',
                  size: 'sm',
                  flex: 6
                },
                {
                  type: 'text',
                  text: '---',
                  wrap: true,
                  color: '#cccccc',
                  weight: 'bold',
                  size: 'lg',
                  flex: 3,
                  margin: 'xxl'
                },
                {
                  type: 'text',
                  text: '元 /台斤',
                  color: '#cccccc',
                  size: 'sm',
                  flex: 3
                }
              ]
            },
            {
              type: 'box',
              layout: 'baseline',
              spacing: 'sm',
              margin: 'xxl',
              contents: [
                {
                  type: 'text',
                  text: '「--」為無資料、「警戒」為與近年比高低差過大',
                  color: '#777777',
                  size: 'xxs',
                  flex: 12
                }
              ]
            },
            {
              type: 'box',
              layout: 'baseline',
              spacing: 'sm',
              contents: [
                {
                  type: 'text',
                  text: '來源為每日介接「北農」與「TWFOOD」公開資料',
                  color: '#777777',
                  size: 'xxs',
                  flex: 12
                }
              ]
            },
            {
              type: 'box',
              layout: 'baseline',
              spacing: 'md',
              contents: [
                {
                  type: 'text',
                  text: '僅供參考方便推估市場價格，勿以此為殺價依據',
                  color: '#777777',
                  size: 'xxs',
                  flex: 12
                }
              ]
            }
          ]
        }
      ]
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      backgroundColor: '#212529',
      spacing: 'sm',
      flex: 0,
      contents: [
        {
          type: 'button',
          style: 'primary',
          height: 'sm',
          color: '#343a40',
          action: {
            type: 'message',
            label: 'action',
            text: 'hello'
          }
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [],
          margin: 'lg'
        }
      ]
    }
  }
}
