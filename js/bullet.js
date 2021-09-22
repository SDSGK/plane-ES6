
// 构建子弹仓库
const bulletStore = new Store()

const killEnemy = new Store()

class Bullet {
  constructor(bulletFlySpeed, positionX, positionY, moveType, hurt = 10, cut = 'play') {
    // 飞行速度
    this.bulletFlySpeed = bulletFlySpeed
    // 位置信息
    this.positionX = positionX - bulletWidth / 2
    this.positionY = positionY + bulletHeight * 2
    // 方向
    this.moveType = moveType
    // 伤害
    this.hurt = hurt
    // 类型
    this.cut = cut
    // 唯一id
    this.id = 'bullet-' + guid()
    // 定时器
    this.timer = null
    // Dom元素
    this.bulletDom = null
  }
  // 创建子弹
  createBullet() {
    const _bulletDom = document.createElement('div')
    _bulletDom.classList.add('bullet')
    bulletStore.setId(this.id, { target: this })
    // 设置子弹信息
    _bulletDom.style.cssText = `
      width: ${ bulletWidth}px; 
      height: ${ bulletHeight}px; 
      left: ${this.positionX}px; 
      top: ${this.positionY}px;
    `
    this.bulletDom = _bulletDom
    document.body.appendChild(_bulletDom)
  }
  // 子弹移动 
  bulletMove() {
    if (this.timer) this.bulletStop()
    this.timer = interval(() => {
      if (this.moveType === 'top') {
        // 碰壁
        if (this.bulletDom.offsetTop <= delayY) {
          this.clearBullet()
          return
        }
        // 元素移动
        this.bulletDom.style.top = this.bulletDom.offsetTop - this.bulletFlySpeed + 'px'
        // 数据移动
        this.positionY = this.bulletDom.offsetTop - this.bulletFlySpeed
        // 调用碰撞检测
        this.bulletShooting()
      // TODO：撞到底部 后续添加
      } else if (this.moveType === 'buttom') {
        // 元素移动
        this.bulletDom.style.top = this.bulletDom.offsetTop + this.bulletFlySpeed + 'px'
        // 数据移动
        this.positionY = this.bulletDom.offsetTop + this.bulletFlySpeed
      }
    });
  }
  // 子弹射击 
  bulletShooting() {
    // 体积判断
    if (this.bulletDom) {
      const enemyStoreList = enemyStore.getStore()
      // 遍历飞机列表
      for (const key in enemyStoreList) {
        if (Object.hasOwnProperty.call(enemyStoreList, key)) {
          const enemy = enemyStoreList[key];
          // 子弹偏移位置
          const bulletDelayY = this.positionY - delayY
          const bulletDelayX = this.positionX - delayX
          // 碰撞判断
          if (// Y轴判断
            (enemy.positionY <= bulletDelayY && ( enemy.positionY + enemy.height ) >= bulletDelayY)
            && // X轴判断
            (enemy.positionX <= bulletDelayX && ( enemy.positionX + enemy.width ) >= bulletDelayX)
          ) {
            enemy.health -= this.hurt
            const target =  enemy.target
            // 页面上删除子弹
            this.clearBullet()
            // 更新飞机血量
            const enemyHealthDom = target.enemyHealthDom
            enemyHealthDom.style.width = enemy.health / enemy.target.healthOriginal * 100 + '%'
            // 更新血量提示文字
            const enemyHealthTextDom = target.enemyHealthTextDom
            enemyHealthTextDom.innerText = enemy.health
            // 如果生命清零 则删除飞机
            if (enemy.health <= 0) {
              // 记录击杀的列表
              killEnemy.setId(
                enemy.target.id,
                enemy
              )
              // 血条提示文字变为空
              enemyHealthTextDom.innerText = ''
              // 更换爆炸gif
              const enemyDom = target.enemyDom
              enemyDom.style.background = 'url(../image/boom.gif) no-repeat'
              enemyDom.style.backgroundSize = 'contain'
              // 页面上删除敌机
              target.enemyStop()
              enemyStore.removeStore(target.id)
              setTimeout(() => {
                target.clearEnemy()
              }, 1000)
            }
            return;
          }
        }
      }
    }
  }
  // 子弹停止 清除定时器
  bulletStop() {
    clearInterval(this.timer)
    this.timer = null
  }
  // 清除子弹
  clearBullet() {
    this.bulletStop()
    document.body.removeChild(this.bulletDom)
    bulletStore.removeStore(this.id)
  }
}