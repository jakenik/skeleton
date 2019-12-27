const http = require('http')
const fs = require('fs')
const path = require('path')

class FileServer {
  constructor(options = {}) {
    const {
      root = './dict'
    } = options
    this.root = path.resolve(__dirname, root)
    return this.init()
  }
  init() {
    this.server = http.createServer(async (req, res) => {
      let url = path.join(this.root, req.url)
      console.log('访问的地址:', url);
      fs.stat(url, (err, stat) => {
        if (stat && stat.isDirectory()) {
          res.statusCode = 404
          res.end('Not Found')
          return
        }
        if (err) {
          if ('ENOENT' == err.code) {
            res.statusCode = 404
            console.error('文件暂无:', err);
            res.end('Not Found')
          } else {
            res.statusCode = 500
            console.error('服务器内部错误:', err);
            res.end('服务器内部错误')
          }
        } else { // 有该文件
          res.setHeader('Content-Length', stat.size)
          var stream = fs.createReadStream(url)
          stream.pipe(res)

          stream.on('error', (err) => { // 如果读取文件出错
            res.statusCode = 500
            res.end('服务器内部错误')
          })
        }
      })
    })
    return this.server
  }
}
module.exports = FileServer
// new FileServer().listen(3000)