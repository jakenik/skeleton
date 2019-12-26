const file = require('./file')
const route = require('./route')
const {
  awaitFor
} = require('./util')
module.exports = (async ()=> {
  await awaitFor(route, async (data = {}) => {
    let {
      dirName,
      routes
    } = data
    const skeleton = await file.create(dirName, routes)
    skeleton.closePage()
    return true
  })
})()

