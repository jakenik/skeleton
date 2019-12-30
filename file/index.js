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
          cookies,
          stores
        }) => {
          const html = await skeleton.genHtml(path, {
            cookies: cookies,
            stores,
            dir,
            locationType,
            fileName
          })
          let err = await fs.writeFileSync(`${html.fileName}.html`, html.content)
          if (err) throw err;
          console.log(`${html.fileName}.html  文件已被保存`);
        })
        resolve(skeleton)
      })
    });
  }
}