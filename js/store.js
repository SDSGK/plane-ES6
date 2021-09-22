class Store {
  constructor(data) {
    this.Store = data || {}
  }
  // 通过id获取单个数据
  getId(id) {
    return this.Store[id]
  }
  // 获取数据长度
  getLength() {
    return Object.keys(this.Store).length
  }
  // 获取所有仓库
  getStore() {
    return this.Store
  }
  // 通过id删除
  removeStore(id) {
    delete this.Store[id]
    return true
  }
  // 通过id设置内容
  setId(id, value) {
    if (this.Store.hasOwnProperty(id)) {
      return Object.assign(this.Store[id], value)
    } else {
      return this.Store[id] = value
    }
  }
  // 设置整个仓库
  setStore(value) {
    this.Store = value
  }
  // 清空仓库
  clearStore() {
    const Store = this.Store
    for (const key in Store) {
      delete Store[key]
    }
    return true
  }
}