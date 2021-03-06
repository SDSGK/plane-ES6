const positionX = containerInfo.offsetLeft;;
const positionY = containerInfo.offsetTop;;
let enemyTimer = null;
let enemyFlySpeed = 3;

// 场上存在的敌机最大值
let limitSize = 10;
// 当前记录刷新飞机的数量
let nowIndex = 0;
// 初始化
function init() {
  if (enemyTimer) stop();
  if (rende2Canvas) {
    // TODO：刷新画布暂停开启
    intervalStore.add(() => {
      draw()
    }, 'draw')
  }
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
    let mathX = Math.floor(Math.random() * containerInfo.width);
    // 构建对象 创建属性并添加到页面中
    new Enemy(enemyFlySpeed, mathX, positionY, "buttom").enemyStart();
  }, 500);
}
function stop() {
  if (enemyTimer) {
    clearInterval(enemyTimer);
    enemyTimer = null;
  }
  intervalStore.remove('draw')
}
// 重新开始
function reStart() {
  intervalStore.clearInterval()
  // 清空已经生成的仓库
  bulletStore.clearStore()
  enemyStore.clearStore()
  storeStore.clearStore()
  supplyStore.clearStore()
  // 清空定时器记录的函数
  intervalStore.clearData()
  shootIntervalStore.clearData()
  followingShootIntervalStore.clearData()
  // 回滚数据
  Object.assign(playerInfo, playerInfoOrginal)
  Object.assign(increaseData, increaseDataOrginal)
  // 刷新页面显示
  playExperience.synchronization();
  notice.addNotice("游戏重新开始", { color: "red" });
  // 取消遮蔽层
  escKeyFunc()
  // 重新开始
  init()
}
