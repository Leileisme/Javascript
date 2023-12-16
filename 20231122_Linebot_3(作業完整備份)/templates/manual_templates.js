export default () => {
  return {
    type: 'bubble',
    hero: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: '小蔬 Robot',
          size: 'xl',
          weight: 'bold',
          color: '#212529'
        }
      ],
      paddingAll: '20px',
      paddingBottom: '10px',
      backgroundColor: '#ffc107'
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: '編號 89467｜ 使用說明',
          size: 'lg',
          color: '#ffc107',
          weight: 'bold'
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: '【當季蔬果-每日預估價】',
              color: '#ffc107',
              size: 'md',
              weight: 'bold'
            },
            {
              type: 'text',
              text: '1、輸入蔬果「品名」或「品種」',
              color: '#cccccc',
              size: 'sm'
            },
            {
              type: 'text',
              text: '2、使用一個單詞搜尋,例：香蕉、青江...',
              color: '#cccccc',
              size: 'sm'
            },
            {
              type: 'text',
              text: '3、馬上查詢價格行情',
              color: '#cccccc',
              size: 'sm'
            }
          ],
          paddingAll: '0px',
          paddingTop: '15px'
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: '【傳統市場-休市日】',
              color: '#ffc107',
              size: 'md',
              weight: 'bold'
            },
            {
              type: 'text',
              text: '1、輸入關鍵字「休市日、休市、休、營業時間、營業、時間、日期、市場」',
              color: '#cccccc',
              size: 'sm'
            },
            {
              type: 'text',
              text: '2、或按下方選單「休市日」(僅手機版)',
              color: '#cccccc',
              size: 'sm'
            },
            {
              type: 'text',
              text: '3、馬上知道近3個月的台北市場休市日',
              color: '#cccccc',
              size: 'sm'
            }
          ],
          paddingAll: '0px',
          paddingTop: '10px'
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: '【哪邊買的到?】',
              color: '#ffc107',
              size: 'md',
              weight: 'bold'
            },
            {
              type: 'text',
              text: '1、輸入關鍵字「買、購、buy、哪裡、賣」',
              color: '#cccccc',
              size: 'sm'
            },
            {
              type: 'text',
              text: '2、或按下方選單「哪裡買」(僅手機版)',
              color: '#cccccc',
              size: 'sm'
            },
            {
              type: 'text',
              text: '3、附近「傳統市場」或「量販店」馬上知',
              color: '#cccccc',
              size: 'sm'
            }
          ],
          paddingAll: '0px',
          paddingTop: '10px'
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [{
            type: 'text',
            text: '小提醒',
            color: '#ff7d7d',
            size: 'md',
            weight: 'bold'
          },
          {
            type: 'text',
            text: '* 「一次多詞」或「空白」 , 會影響搜尋結果',
            color: '#ff7d7d',
            size: 'sm'
            // weight: 'bold'
          }, {
            type: 'text',
            text: '* 「換日」或「休市日」可能會查無資料',
            color: '#ff7d7d',
            size: 'sm'
            // weight: 'bold'
          }
          ],
          paddingAll: '0px',
          paddingTop: '10px'
        }
      ],
      paddingAll: '20px',
      backgroundColor: '#212529',
      spacing: 'md'
    },
    footer: {
      type: 'box',
      layout: 'horizontal',
      contents: [
        {
          type: 'separator',
          margin: 'none'
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              contents: [
                {
                  type: 'span',
                  text: '免責聲明',
                  weight: 'bold',
                  color: '#bbbbbb',
                  size: 'sm'
                },
                {
                  type: 'span',
                  text: '     ',
                  size: 'xs'
                },
                {
                  type: 'span',
                  text: '希望「當季好蔬果」好的立意能被更便利的使用，故介接該資料並融合北農之公開資料，讓消費者能方便推估市場零售價格，不代表蔬果保證取得價或品質優劣，又因商品可能因品質差異、運送距離、環境陳列...等眾多因素影嚮價格。勿以此預估價格為殺價依據，有違本機器人與「當季好蔬果」網設立之本意，另以上資料僅供參考，恕不負責資料正確性之責任。',
                  size: 'sm',
                  color: '#999999'
                }
              ],
              size: 'sm',
              wrap: true
            },
            {
              type: 'box',
              layout: 'baseline',
              contents: [],
              spacing: 'sm',
              margin: 'md'
            }
          ],
          margin: 'md'
        }
      ],
      paddingAll: '20px',
      backgroundColor: '#212529',
      paddingTop: '0px'
    }
  }
}
