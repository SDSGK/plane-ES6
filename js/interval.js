class Interval {
  constructor(delayTimer) {
    this.intervalTimer = null;
    this.intervalFuncMap = {};
    this.intervalDelay = delayTimer || allMoveSpeed;
  }
  // 创建定时器
  createInterval() {
    this.clearInterval();
    this.intervalTimer = setInterval(() => {
      this.intervalOperationFunc();
    }, this.intervalDelay);
  }
  // 清除定时器
  clearInterval() {
    if (this.intervalTimer) {
      clearInterval(this.intervalTimer);
      this.intervalTimer = null;
    }
  }
  // 重新设置定时器的间隔时间
  setIntervalDelay(delay) {
    this.intervalDelay = delay;
    this.clearInterval();
    this.createInterval();
  }
  // 添加
  add(func, id) {
    if (this.hasOwnProperty(id)) {
      this.remove(id);
    }
    this.intervalFuncMap[id] = func;
    return true;
  }
  // 是否存在
  hasOwnProperty(id) {
    return this.intervalFuncMap.hasOwnProperty(id);
  }
  // 删除
  remove(id) {
    return delete this.intervalFuncMap[id];
  }
  // 清空所有记录的函数
  clearData() {
    const intervalFuncMap = this.intervalFuncMap;
    for (const key in intervalFuncMap) {
      this.remove(key);
    }
  }
  // 执行定期函数
  intervalOperationFunc() {
    const intervalFuncMap = this.intervalFuncMap;
    for (const key in intervalFuncMap) {
      const func = intervalFuncMap[key];
      if (typeof func === "function") {
        func();
      }
    }
  }
}
// 全局刷新定时器
const intervalStore = new Interval();
intervalStore.createInterval();
// 玩家子弹定时器
const shootIntervalStore = new Interval(playerInfo.shootSpeed);
shootIntervalStore.createInterval();
// 跟踪子弹定时器
const followingShootIntervalStore = new Interval(playerInfo.followingShootSpeed);
followingShootIntervalStore.createInterval();
