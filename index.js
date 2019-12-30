const file = require('./file')
const route = require('./route')
const FileServer = require('./server.js')
const config = require('./config')
const params = process.argv.slice(2)[0]
const getParams = () => params ? params.replace(/^--/, '') : 'default'
const {
  awaitFor
} = require('./util')
const run = {
  default: async () => {
    await awaitFor(route, async (data = {}) => {
      let {
        dirName,
        routes
      } = data
      const skeleton = await file.create(dirName, routes)
      skeleton.closePage()
      return true
    })
    this.server()
  },
  server: async () => {
    const {
      port,
      host
    } = config
    await new FileServer().listen(port, host, () => {
      console.log(`文件访问服务开启访问地址   http://${host}:${port}`)
    })
  }
}
run[getParams()]()

