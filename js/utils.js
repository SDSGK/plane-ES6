 //用于生成uuid
function S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function guid() {
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
// 随机取数字
function random(min,max) {
  const num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}
// TODO：逐渐替换 函数
function interval(call, dealy = allMoveSpeed) {
  return setInterval(() => {
    call()
  }, dealy)
}
// 设置伪类元素 对应技能冷却提示
function setCoolingTime(parentDom, nowCoolingTime, coolingTimeOrginal, color = defaultCoolingTimeColor) {
  parentDom.classList.add('coolingTime')
  // 随机生成唯一ID 进行样式添加记录
  const selectorText = 'coolingTimeRando-' + guid()
  parentDom.classList.add(selectorText)
  const styleSheets = document.styleSheets[0]
  // 更改伪类元素
  styleSheets.insertRule(`.${selectorText}::before {
    background-color: ${color} !important;
    width: ${nowCoolingTime / coolingTimeOrginal * 100}% !important;
    transition: width 1s ease-in-out !important;
  }`, 0);
  // 返回生成的唯一ID
  return selectorText
}

// 技能冷却
function coolingFunc(self) {
  // 如果当前记录了冷却时间 则清除
  const keyDom = self.keyDom
  if (self.coolingClassName) {
    keyDom.classList.remove(self.coolingClassName)
  }
  // 设置新的时间样式
  self.coolingClassName = setCoolingTime(keyDom, self.nowCoolingTime, self.coolingTimeOrginal, '#ffffff')
  // 间隔一秒冷却
  self.timer = interval(() => {
    self.nowCoolingTime -= 1
    keyDom.classList.remove(self.coolingClassName)
    // 重新设置冷却时间样式
    self.coolingClassName = setCoolingTime(keyDom, self.nowCoolingTime, self.coolingTimeOrginal, '#ffffff')
    // 如果冷却完毕 清除状态
    if (self.nowCoolingTime === 0) {
      self.status = false
      keyDom.classList.remove(self.coolingClassName)
      keyDom.classList.remove('coolingTime')
      clearInterval(self.timer)
    }
  }, 1000)
}
