class Store {
  constructor(data) {
    this.Store = data || {}
  }
  // 通过id获取单个数据
  getId(id) {
    return this.Store[id]
  }
  // 检测是否存在
  hasOwnProperty(id) {
    return this.Store.hasOwnProperty(id)
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
    return delete this.Store[id]
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
    const keys = Object.keys(this.Store)
    for (const index in keys) {
      delete this.Store[keys[index]]
    }
    return true
  }
}
