export default () => {
  return {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'image',
          url: 'https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip1.jpg',
          size: 'full',
          aspectMode: 'cover',
          aspectRatio: '2:3',
          gravity: 'top'
        }
      ],
      paddingAll: '0px'
    }
  }
}
