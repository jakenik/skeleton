const SkeletonInstance = require('../skeleton')
const skeleton = new SkeletonInstance()
const fs = require('fs')
const config = require('../config')
const {
  awaitFor
} = require('../util')
module.exports = {
  create(fileName, routes) {
    return new Promise((resolve, reject) => {
      const rootFile = config.rootFile
      const dir = `${rootFile}/${fileName}`
      fs.mkdir(dir, { recursive: true }, async (err) => {
        if (err) reject(err);
        await skeleton.initialize()
        await awaitFor(routes, async ({
          path,
          locationType = 'hash',
          fileName = null,
          cookies
        }) => {
          const html = await skeleton.genHtml(path, {
            cookies: cookies
          })
          let name = fileName || html[locationType].replace(/\//g, '-').replace(/(^-)|(-$)/, '')
          if (name === '') name = 'index'
          let file = `${dir}/${name}.html`
          fs.writeFile(file, html.content, (err) => {
            if (err) throw err;
            console.log(file + ' 文件已被保存');
          })
        })
        resolve(skeleton)
      })
    });
  }
}