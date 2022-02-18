class EfftControl {
  constructor() {
    this.efftData = {}
  }
  // 添加效果的封装
  addEff(efftKey, efftData, callback) {
    // 如果有 则清除
    if (intervalStore.hasOwnProperty(efftKey)) {
      intervalStore.remove(efftKey)
    }
    this.efftData[efftKey] = efftData
    // 添加定时器
    intervalStore.add(() => {
      efftData.nowEfftTime += 16
      if (efftData.nowEfftTime >= efftData.efftTime) {
        intervalStore.remove(efftKey)
        callback && callback(efftData)
      }
    }, efftKey)
  }
}
const efftControl = new EfftControl();
