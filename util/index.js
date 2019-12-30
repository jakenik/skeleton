/*
 * @Author: jake 
 * @Date: 2019-12-23 14:04:20 
 * @Last Modified by: jake
 * @Last Modified time: 2019-12-28 14:11:04
 * 工具类
 */
'use strict'

const { promisify } = require('util')
const fs = require('fs')
const path = require('path')

async function getScriptContent(src = '../script/index.js') { // 获取文件内容返回 promise
  const sourcePath = path.resolve(__dirname, src)
  const result = await promisify(fs.readFile)(sourcePath, 'utf-8')
  return result
}

async function awaitFor(array, cb) { // 使用等待的循环
  let i = 0
  let handle = async (array, cb) => {
    if(i === array.length){
      return true
    } else {
      await cb(array[i] ,i)
      i ++
      await handle(array, cb)
    } 
  }
  return await handle(array, cb)
}

module.exports = {
  getScriptContent,
  awaitFor
}