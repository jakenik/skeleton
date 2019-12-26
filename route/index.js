module.exports = [
  {
    dirName: 'madePlanV3',
    routes: [
      {
        locationType: 'hash', // 设置爬取文件名称 hash pathname两种模式
        path: 'https://admin.91duobaoyu.com/test/h5_new_media/madePlanV3/#/planDetailToB?apiver=test&source=adviser&schemeUuid=OR201912251802561019090900000073'
      },
      {
        fileName: 'table',
        locationType: 'hash', // 设置爬取文件名称 hash pathname两种模式
        path: 'https://element.eleme.cn/#/zh-CN/component/table'
      }
    ]
  },
  {
    dirName: 'element',
    routes: [
      {
        locationType: 'hash', // 设置爬取文件名称 hash pathname两种模式
        path: 'https://admin.91duobaoyu.com/test/h5_new_media/madePlanV3/#/planDetailToB?apiver=test&source=adviser&schemeUuid=OR201912251802561019090900000073'
      },
      {
        fileName: 'table',
        locationType: 'hash', // 设置爬取文件名称 hash pathname两种模式
        path: 'https://element.eleme.cn/#/zh-CN/component/table'
      }
    ]
  }
]