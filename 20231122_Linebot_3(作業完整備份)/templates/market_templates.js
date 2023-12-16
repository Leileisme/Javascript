export default () => {
  return {
    type: 'text', // 1
    text: '你想去哪裡買?',
    quickReply: {
      // 2
      items: [
        {
          type: 'action', // 3
          action: {
            type: 'uri',
            uri: 'https://wdaweb.github.io',
            label: '網址'
          }
        },
        {
          type: 'action', // 3
          imageUrl: 'https://example.com/sushi.png',
          action: {
            type: 'uri',
            uri: 'https://wdaweb.github.io',
            label: '網址'
          }
        },
        {
          type: 'action', // 3
          imageUrl: 'https://example.com/sushi.png',
          action: {
            type: 'uri',
            uri: 'https://wdaweb.github.io',
            label: '網址'
          }
        },
        {
          type: 'action', // 3
          imageUrl: 'https://example.com/sushi.png',
          action: {
            type: 'uri',
            uri: 'https://wdaweb.github.io',
            label: '網址'
          }
        },
        {
          type: 'action', // 3
          imageUrl: 'https://example.com/sushi.png',
          action: {
            type: 'uri',
            uri: 'https://wdaweb.github.io',
            label: '網址'
          }
        },
        {
          type: 'action', // 3
          imageUrl: 'https://example.com/sushi.png',
          action: {
            type: 'uri',
            uri: 'https://wdaweb.github.io',
            label: '網址'
          }
        }
      ]
    }
  }
}
