/*
 * @Author: jake
 * @Date: 2019-12-02 15:02:23
 * @Last Modified by: jake
 * @Last Modified time: 2019-12-28 14:24:06
 * 储存方法都放与这里
 */

(function install(window) {
  const getHash = function () {
    let hash = window.location.hash
    let index = hash.indexOf('?')
    if (index === -1) index = hash.length
    return hash.substring(hash.indexOf('#') + 1, index)
  }
  class Store {
    constructor (type) {
      this.type = type
      this._store = window[type]
    }
    getType (object) {
      let class2type = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Object]': 'object',
        '[object Error]': 'error'
      }
      return class2type[Object.prototype.toString.call(object)]
    }
    /**
     * 设置储存
     * @param {string} [name=getHash()] // name字段默认hash
     * @param {string, number, array} [data={}] // 储存字段
     * @param {string} [mode='merge'] // 模式 默认合并 merge合并 cover覆盖
     * @returns void
     * @memberof Store
     */
    set ({
      name = getHash(),
      data = {},
      mode = 'merge'
    }) {
      if (mode !== 'merge') {
        return this._store.setItem(name, data)
      }
      const historyData = this.get(name)
      const type = this.getType(historyData)
      const isObj = type !== 'object' && type !== 'array'
      const save = (data) => {
        if (typeof data === 'object') {
          data = JSON.stringify(data)
        }
        this._store.setItem(name, data)
      }
      if (isObj) {
        save(data)
      } else {
        const _data = type === 'array'
          ? [...historyData, ...data]
          : {...historyData, ...data}
        save(_data)
      }
    }
    /**
     *
     * 获取储存
     * @param {String} name // name字段默认hash
     * @returns data
     * @memberof Store
     */
    get (params = {}) {
      const {
        name = getHash()
      } = params
      if (!name) return
      let data = this._store.getItem(name)
      if (!data) {
        return null
      }
      try {
        data = JSON.parse(data)
      } catch (error) {}
      return data
    }
    /**
     *
     * 删除储存
     * @param {String} name // name字段默认hash
     * @param {boolean} [all=true] // 是否删除当前name下全部数据 默认是
     * @param {String,Number} childName // 只删除子级数据
     * @returns Boolean // 成功true
     * @memberof Store
     */
    remove (params = {}) {
      let {
        name = getHash(),
        all = true,
        childName
      } = params
      if (all) {
        this._store.removeItem(name)
      } else {
        let data = this._store.getItem(name)
        const type = this.getType(data)
        if (type === 'object') {
          delete data[childName]
        } else if (type === 'array') {
          data.splice(Number(childName), 1)
        } else {
          return false
        }
        return true
      }
    }
    /**
     * 删除所有储存
     * @memberof Store
     */
    clear () {
      this._store.clear()
    }
  }
  window.$store = {
    local: new Store('localStorage'),
    session: new Store('sessionStorage')
  }
})(window)

