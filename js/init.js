const positionX = delayX;
const positionY = delayY;
let enemyTimer = null;
let enemyFlySpeed = 3;

// 场上存在的敌机最大值
let limitSize = 10;
// 当前记录刷新飞机的数量
let nowIndex = 0;
// 初始化
function init() {
  if (enemyTimer) stop();
  enemyTimer = setInterval(() => {
    // 限制飞机数量
    if (nowIndex === limitSize) {
      // 如果刷满了{limitSize} 架飞机 则等待飞机清空进行下一轮
      if (enemyStore.getLength() === 0) {
        nowIndex = 0;
      }
      return;
    }
    nowIndex += 1;
    // 容器内随机位置
    let mathX = Math.floor(Math.random() * containerWidth);
    // 构建对象 创建属性并添加到页面中
    new Enemy(enemyFlySpeed, mathX, positionY, "buttom").enemyStart();
  }, 500);
}
function stop() {
  if (enemyTimer) {
    clearInterval(enemyTimer);
    enemyTimer = null;
  }
}
