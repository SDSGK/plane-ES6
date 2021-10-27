//用于生成uuid
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function guid() {
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
// 随机取数字
function getRandomNumber(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
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

// 原文链接：https://blog.csdn.net/erweimac/article/details/82256087
// https://blog.csdn.net/weixin_30756499/article/details/97551805
// https://blog.csdn.net/looffer/article/details/8846159
// https://github.com/processing/p5.js
/**
 * @description: 追踪目标
 * @param {number} x1 追踪目标x轴
 * @param {number} y1 追踪目标y轴
 * @param {number} x2 追踪者x轴
 * @param {number} y2 追踪者y轴
 * @param {number} speed 追踪者速度
 * @return {Object} {x, y} 返回下一次要移动的位置
 */
function FollowUpBullet(x1, y1, x2, y2, speed) {
  // 向量
  const deltaX = x1 - x2
  const deltaY = y1 - y2

  if (deltaX == 0) {
    if (y1 >= y2) {
      deltaX = 0.0000001
    } else {
      deltaX = -0.0000001
    }
  }
  if (deltaY == 0) {
    if (x1 >= x2) {
      deltaY = 0.0000001
    } else {
      deltaY = -0.0000001
    }
  }
  // 向量长度
  const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  let angle = 0
  let π = 3.1415926
  if (deltaX > 0 && deltaY > 0) {
    angle = Math.atan(Math.abs(deltaY / deltaX)) // 第一项限
  } else if (deltaX < 0 && deltaY > 0) {
    angle = π - Math.atan(Math.abs(deltaY / deltaX)) // 第二项限
  } else if (deltaX < 0 && deltaY < 0) {
    angle = π + Math.atan(Math.abs(deltaY / deltaX)) // 第三项限
  } else {
    angle = 2 * π - Math.atan(Math.abs(deltaY / deltaX)) // 第四项限
  }
  // 偏移量
  let x =  deltaX * (1 / length) * speed
  let y = deltaY * (1 / length) * speed
  return {x, y, angle}
}
