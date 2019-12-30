const path = require('path')
module.exports = {
  host: '127.0.0.1',
  port: '9898',
  rootFile: path.resolve(__dirname, '../dict'), // 设置储存顶级文件
  puppeteer: {
    headless: true // 是否在执行时候关闭浏览器
  },
  emulate: 'iPhone 6 Plus', // 配置当前需要爬取的网页打开大小环境
  defaultOptions: {
    loading: false,
    text: { // 该配置对象可以配置一个 color 字段，用于决定骨架页面中文字块的的颜色，颜色值支持16进制、RGB等。
      color: '#EEEEEE'
    },
    image: { // 该配置接受 3 个字段，color、shape、shapeOpposite。color 和 shape 用于确定骨架页面中图片块的颜色和形状，颜色值支持16 进制和 RGB等，形状支持两个枚举值，circle （矩形）和 rect（圆形）。shapeOpposite 字段接受一个数组，数组中每个元素是一个 DOM 选择器，用于选择 DOM 元素，被选择 DOM 的形状将和配置的 shape 形状相反，例如，配置的是 rect那么，shapeOpposite 中的图片块将在骨架页面中显示成 circle 形状（圆形），具体怎么配置可以参考该部分末尾的默认配置。
      // `rect` | `circle`
      shape: 'rect',
      color: '#EFEFEF',
      shapeOpposite: []
    },
    button: { // 该配置接受两个字段，color 和 excludes。color 用来确定骨架页面中被视为按钮块的颜色，excludes 接受一个数组，数组中元素是 DOM 选择器，用来选择元素，该数组中的元素将不被视为按钮块
      color: '#EFEFEF',
      excludes: []
    },
    svg: { // 该配置接受 3 个字段，color、shape、shapeOpposite。color 和 shape 用于确定骨架页面中 svg 块的颜色和形状，颜色值支持16 进制和 RGB等，同时也支持 transparent 枚举值，设置为 transparent 后，svg 块将是透明块。形状支持两个枚举值，circle （矩形）和 rect（圆形）。shapeOpposite 字段接受一个数组，数组中每个元素是一个 DOM 选择器，用于选择 DOM 元素，被选择 DOM 的形状将和配置的 shape 形状相反，例如，配置的是 rect那么，shapeOpposite 中的 svg 块将在骨架页面中显示成 circle 形状（圆形），具体怎么配置可以参考该部分末尾的默认配置。
      // or transparent
      color: '#EFEFEF',
      // circle | rect
      shape: 'circle',
      shapeOpposite: []
    },
    pseudo: { // 该配置接受两个字段，color 和 shape。color 用来确定骨架页面中被视为伪元素块的颜色，shape 用来设置伪元素块的形状，接受两个枚举值：circle 和 rect。
      // or transparent
      color: '#EFEFEF',
      // circle | rect
      shape: 'circle',
      shapeOpposite: []
    },
    debug: false,
    excludes: [],
    remove: [],
    hide: [],
    grayBlock: [],
    cookies: [],
    headless: true,
    h5Only: false,
    cssUnit: 'rem',
    decimal: 4,
    logLevel: 'info',
    quiet: false,
    noInfo: false,
    logTime: true
  }
}