/*
 * @Author: jake 
 * @Date: 2019-12-23 14:05:44 
 * @Last Modified by: jake
 * @Last Modified time: 2019-12-27 10:22:18
 * 骨架屏启动实例
 */

const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors');
const { parse, toPlainObject, fromPlainObject, generate } = require('css-tree')
const config = require('./config')
const { getScriptContent, awaitFor } = require('./util')
const HTML_MODEL = require('./model')
const DEAD_OBVIOUS = new Set(['*', 'body', 'html'])
class Skeleton {
  constructor(options = {}) {
    const {
      debug = false,
      log = console
    } = options
    this.log = log
    this.debug = debug
  }
  async initialize() {
    const { log } = this
    try {
      this.scriptContent = await getScriptContent()
      this.browser = await puppeteer.launch(config.puppeteer)
    } catch (err) {
      log(err)
    }
  }
  async newPage() {
    const page = await this.browser.newPage()
    await page.emulate(devices[config.emulate])
    return page
  }
  cleaner(ast, callback) {
    const decisionsCache = {}
    const clean = (children, cb) => children.filter((child) => {
      if (child.type === 'Rule') {
        const values = child.prelude.value.split(',').map(x => x.trim())
        const keepValues = values.filter((selectorString) => {
          if (decisionsCache[selectorString]) {
            return decisionsCache[selectorString]
          }
          const keep = cb(selectorString)
          decisionsCache[selectorString] = keep
          return keep
        })
        if (keepValues.length) {
          // re-write the selector value
          child.prelude.value = keepValues.join(', ')
          return true
        }
        return false
      } else if (child.type === 'Atrule' && child.name === 'media') {
        // recurse
        child.block.children = clean(child.block.children, cb)
        return child.block.children.length > 0
      }
      // The default is to keep it.
      return true
    })

    ast.children = clean(ast.children, callback)
    return ast
  }
  checker(selector) {
    if (DEAD_OBVIOUS.has(selector)) {
      return true
    }
    if (/:-(ms|moz)-/.test(selector)) {
      return true
    }
    if (/:{1,2}(before|after)/.test(selector)) {
      return true
    }
    try {
      const keep = !!document.querySelector(selector)
      return keep
    } catch (err) {
      const exception = err.toString()
      // console.log(`Unable to querySelector('${selector}') [${exception}]`, 'error') // eslint-disable-line no-console
      return false
    }
  }
  async cleanedStyles(hrefs, stylesheetAstObjects) {
    const cleanedStyles = []
    hrefs.forEach((stylesheet) => {
      if (!stylesheetAstObjects[stylesheet]) {
        throw new Error(`${stylesheet} not in stylesheetAstObjects`)
      }
      if (!Object.keys(stylesheetAstObjects[stylesheet]).length) {
        return
      }
      const ast = stylesheetAstObjects[stylesheet]
      try {
        const s = this.cleaner(ast, this.checker)
        cleanedStyles.push(s)
      } catch (error) {
        console.log(error);
      }
    })
    return cleanedStyles
  }
  async genHtml(url, {
    cookies
  }) {
    const page = await this.newPage()
    const stylesheetAstObjects = {}
    const stylesheetContents = []
    page.on('response', (response) => { // 监听当前页面发出的所有请求
      const requestUrl = response.url()
      const ct = response.headers()['content-type'] || ''
      if (response.ok && !response.ok()) {
        throw new Error(`${response.status} on ${requestUrl}`)
      }

      if (ct.indexOf('text/css') > -1 || /\.css$/i.test(requestUrl)) {
        response.text().then((text) => {
          const ast = parse(text, {
            parseValue: false,
            parseRulePrelude: false
          })
          stylesheetAstObjects[requestUrl] = toPlainObject(ast)
          stylesheetContents.push(text)
        })
      }
    })
    await this.setCookie(page, url, cookies)
    const response = await page.goto(url, { waitUntil: 'networkidle2' })
    if (response && !response.ok()) {
      throw new Error(`${response.status} on ${url}`)
    }
    return await this.makeSkeleton(page, stylesheetContents, stylesheetAstObjects)

  }
  async setCookie(page, url, cookies) {
    return await awaitFor(cookies, async ({
      value,
      name
    }) => await page.setCookie({
      url,
      value: value,
      name: name
    }))
  }
  async closePage() {
    await this.browser.close();
  }
  async makeSkeleton(page, stylesheetContents, stylesheetAstObjects) { // 使用内嵌Js窃取节点信息
    await page.addScriptTag({ content: this.scriptContent })
    const hrefs = await page.evaluate(() => Skeleton.getHrefs())
    const cleanedCSS = await this.cleanedStyles(hrefs, stylesheetAstObjects)
    const allCleanedCSS = cleanedCSS.map((ast) => {
      const cleanedAst = fromPlainObject(ast)
      return generate(cleanedAst)
    }).join('\n')
    await page.evaluate((config) => Skeleton.genSkeleton(config.defaultOptions), config)
    const { styles, cleanedHtml, head } = await page.evaluate((config) => Skeleton.getHtmlAndStyle(config), config)

    let css = [styles, ...stylesheetContents, allCleanedCSS].join(' ')

    let shellHtml = HTML_MODEL
    shellHtml = shellHtml
      .replace('$$head$$', head)
      .replace('$$css$$', css)
      .replace('$$html$$', cleanedHtml)
    const result = {
      pathname: await page.evaluate('window.location.pathname'),
      hash: await page.evaluate(() => {
        var str = window.location.hash;
        try {
          str = str.indexOf('?') !== -1
            ? str.match(/#\/(\S*)(\?)/)[1]
            : str.match(/#\/(\S*)(\?|$)/)[1]
          return str
        } catch (error) {
          return str
        }
      }),
      content: shellHtml
    }
    await page.close()
    return result
  }
}
module.exports = Skeleton