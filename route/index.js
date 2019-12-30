module.exports = [
  {
    dirName: 'madePlanV3',
    routes: [
      {
        locationType: 'hash', // 设置爬取文件名称 hash pathname两种模式
        path: 'https://admin.91duobaoyu.com/test/h5_new_media/madePlanV3/#/planDetailToB?apiver=test&source=adviser&schemeUuid=OR201912251802561019090900000073',
        cookies: [{
          'name': 'token',
          'value': 'wx-794d5987-e74b-43dc-b5ff-5ee183d6bd76'
        }]
      },
      // {
      //   locationType: 'hash', // 设置爬取文件名称 hash pathname两种模式
      //   path: 'http://192.168.20.113:63343/#/sellShareAllNew/home',
      //   stores: [
      //     {
      //       'name': '/sellShareAllNew/login',
      //       'value': { "admin_token": { "admin_token": "8ac0a8d3-66ff-4b95-a41d-1f1d91ed654b" }, "empId": { "empId": 311 } }
      //     }
      //   ]
      // },
      {
        locationType: 'hash', // 设置爬取文件名称 hash pathname两种模式
        path: 'https://admin.91duobaoyu.com/test/h5_new_media/adviserScore/#/adviserScore/home?empId=111&ufiId=222&code=081YW39604kSNF151R9601WM860YW39F&isAppendParam=true&wxLoginSrc=%2FadviserScore&wxLoginHost=https%3A%2F%2Fwww.91duobaoyu.com%2Fweixin%2Foauth3',
        cookies: [{
          'name': 'token',
          'value': 'wx-794d5987-e74b-43dc-b5ff-5ee183d6bd76'
        }]
      }
    ]
  },
  {
    dirName: 'element',
    routes: [
      {
        locationType: 'hash', // 设置爬取文件名称 hash pathname两种模式
        path: 'https://admin.91duobaoyu.com/test/h5_new_media/madePlanV3/#/planDetailToB?apiver=test&source=adviser&schemeUuid=OR201912251802561019090900000073',
        cookies: [{
          'name': 'token',
          'value': 'wx-794d5987-e74b-43dc-b5ff-5ee183d6bd76'
        }]
      },
      {
        fileName: 'table',
        locationType: 'hash', // 设置爬取文件名称 hash pathname两种模式
        path: 'https://element.eleme.cn/#/zh-CN/component/table',
        cookies: [{
          'name': 'token',
          'value': 'wx-794d5987-e74b-43dc-b5ff-5ee183d6bd76'
        }]
      }
    ]
  }
]