const positionX = delayX
const positionY = delayY
let enemyTimer = null
let enemyFlySpeed = 3

function init() {
  intervalStore.createInterval()
  if(enemyTimer) stop()
  enemyTimer = setInterval(() => {
    // 限制飞机数量
    if (enemyStore.getLength() >= 10) {
      return
    }
    // 容器内随机位置
    let mathX = Math.floor(Math.random() * containerWidth)
    // 构建对象 创建属性并添加到页面中
    new Enemy(enemyFlySpeed, mathX, positionY, 'buttom').enemyStart()
  }, 500)
}
function stop() {
  if (enemyTimer) {
    clearInterval(enemyTimer)
    enemyTimer = null
  }
}
