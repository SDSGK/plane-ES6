class Bullet {
  constructor(bulletFlySpeed, positionX, positionY, moveType, hurt = hurt, cut = 'play') {
    // 飞行速度
    this.bulletFlySpeed = bulletFlySpeed
    // 位置信息
    this.positionX = positionX - bulletWidth / 2
    this.positionY = positionY + bulletHeight
    // 方向
    this.moveType = moveType
    // 伤害
    this.hurt = hurt
    // 类型
    this.cut = cut
    // 唯一id
    this.id = 'bullet-' + guid()
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
      width: ${bulletWidth}px; 
      height: ${bulletHeight}px; 
      left: ${this.positionX}px; 
      top: ${this.positionY}px;
      transform: rotate(${this.cut === 'play' ? '0deg' : '180deg'});
    `
    this.bulletDom = _bulletDom
    document.body.appendChild(_bulletDom)
  }
  // 子弹移动 
  bulletMove() {
    intervalStore.add(() => {
      if (this.moveType === 'top') {
        // 碰壁
        if (this.bulletDom.offsetTop <= delayY) {
          this.clearBullet()
          return
        }
        if (isFollowBullet) {
          // 跟踪子弹
          const enemyStoreList = enemyStore.getStore()
          const keys = Object.keys(enemyStoreList)
          const enemy = enemyStoreList[keys[0]]
          // 如果没有敌机 清除子弹
          if (enemy === undefined) {
             // 数据移动
            this.bulletDom.style.top = this.bulletDom.offsetTop - this.bulletFlySpeed + 'px'
            this.positionY = this.bulletDom.offsetTop - this.bulletFlySpeed
          } else {
            const {x, y, angle} = FollowUpBullet(
              enemy.positionX + delayX + enemy.width / 2, 
              enemy.positionY + delayY + enemy.height / 2, 
              this.positionX,
              this.positionY, 
              this.bulletFlySpeed
            )
            // 元素移动
            this.bulletDom.style.top = this.positionY + y + 'px'
            this.bulletDom.style.left = this.positionX + x + 'px'
            this.bulletDom.style.transform = 'rotate(' + angle + 'deg)'
            // 保存位置
            this.positionY = this.positionY + y
            this.positionX = this.positionX + x
          }
        } else {
          // 数据移动
          this.bulletDom.style.top = this.bulletDom.offsetTop - this.bulletFlySpeed + 'px'
          this.positionY = this.bulletDom.offsetTop - this.bulletFlySpeed
        }
        // 调用碰撞检测
        this.bulletShooting()
      } else if (this.moveType === 'buttom') {
        // 到底部
        if (this.bulletDom.offsetTop >= containerHeight) {
          this.clearBullet()
          return
        }
        // 元素移动
        this.bulletDom.style.top = this.bulletDom.offsetTop + this.bulletFlySpeed + 'px'
        this.bulletShooting()
        // 数据移动
        this.positionY = this.bulletDom.offsetTop + this.bulletFlySpeed
      }
    }, this.id);
  }
  // 子弹射击 
  bulletShooting() {
    // 子弹偏移位置
    const bulletDelayY = this.positionY - delayY
    const bulletDelayX = this.positionX - delayX
    // 子弹射击掩体
    let wall = storeStore.getStore()
    for (const key in wall) {
      const enemy = storeStore.getId(key)
      if (// Y轴判断
        (enemy.positionY <= bulletDelayY && (enemy.positionY + enemy.height) >= bulletDelayY)
        && // X轴判断
        (enemy.positionX <= bulletDelayX && (enemy.positionX + enemy.width) >= bulletDelayX)
      ) {
        this.updateEnemyInfo(enemy)
        return 
      }
    }
    // 体积判断
    if (this.bulletDom && this.cut === 'play') {
      const enemyStoreList = enemyStore.getStore()
      // 遍历飞机列表
      for (const key in enemyStoreList) {
        if (Object.hasOwnProperty.call(enemyStoreList, key)) {
          const enemy = enemyStoreList[key];
          // 碰撞判断
          if (// Y轴判断
            (enemy.positionY <= bulletDelayY && (enemy.positionY + enemy.height) >= bulletDelayY)
            && // X轴判断
            (enemy.positionX <= bulletDelayX && (enemy.positionX + enemy.width) >= bulletDelayX)
          ) {
            this.updateEnemyInfo(enemy)
            return;
          }
        }
      }
    } else {
      // 敌机子弹
      const planeDomDelayY = planeDom.offsetTop
      const planeDomDelayX = planeDom.offsetLeft
      const planeHeight = planeDom.offsetHeight
      const planeWidth = planeDom.offsetWidth
      
      if (// Y轴判断
        (planeDomDelayY <= bulletDelayY && (planeDomDelayY + planeHeight) >= bulletDelayY)
        && // X轴判断
        (planeDomDelayX <= bulletDelayX && (planeDomDelayX + planeWidth) >= bulletDelayX)
      ) {
        this.clearBullet()
        if (!isInvincibleTimer) {
          playBloodVolume -= this.hurt
          operationDom.setPlayBloodVolume(playBloodVolume)
          if (playBloodVolume <= 0) {
            // 游戏结束
            console.log('game over');
          }
          // 无敌时间
          planeDom.classList.add('invincibleTimer')
          isInvincibleTimer = true;
          setTimeout(() => {
            planeDom.classList.remove('invincibleTimer')
            isInvincibleTimer = false;
          }, playInvincibleTimer)
        }
      }
    }
  }
  updateEnemyInfo(enemy) {
    enemy.target.health -= this.hurt
    const target = enemy.target
    // 页面上删除子弹
    this.clearBullet()
    // 更新飞机血量
    const enemyHealthDom = target.enemyHealthDom
    enemyHealthDom.style.width = enemy.target.health / enemy.target.healthOriginal * 100 + '%'
    // 更新血量提示文字
    const enemyHealthTextDom = target.enemyHealthTextDom
    enemyHealthTextDom.innerText = enemy.target.health
    // 如果生命清零 则删除飞机
    if (enemy.target.health <= 0) {
      enemyHealthDom.style.width = '0%'
      // 获取经验
      playExperience.accumulateExperience(enemy)
      // 血条提示文字变为空
      enemyHealthTextDom.innerText = ''
      // 更换爆炸gif
      const enemyDom = target.enemyDom
      enemyDom.style.background = 'url(../image/boom.gif' + '?' + 'gif-' + guid() + ') no-repeat'
      enemyDom.style.backgroundSize = 'contain'
      // 页面上删除敌机
      target.enemyStop()
      enemy.operationOptions?.operationStop()
      enemyStore.removeStore(target.id)
      setTimeout(() => {
        target.clearEnemy()
      }, 1000)
    }
  }
  // 子弹停止 清除定时器
  bulletStop() {
    intervalStore.remove(this.id);
  }
  // 清除子弹
  clearBullet() {
    this.bulletStop()
    document.body.removeChild(this.bulletDom)
    bulletStore.removeStore(this.id)
  }
}


