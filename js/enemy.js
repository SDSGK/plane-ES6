
const enemyStore = new Store()

class Enemy {
  constructor(enemyFlySpeed, positionX, positionY, moveType) {
    // 飞行速度
    this.enemyFlySpeed = enemyFlySpeed
    // 位置信息
    this.positionX = positionX
    this.positionY = positionY
    // 方向
    this.moveType = moveType
    // 伤害
    // this.hurt = hurt
    // 类型
    // this.cut = cut
    // 唯一id
    this.id = 'enemy-' + guid()
    // 定时器
    this.timer = null
    // Dom元素
    this.enemyDom = null
    this.enemyHealthDom = null
    this.enemyHealthTextDom = null
    // 当前血量
    this.health = 100
    // 最大血量
    this.healthOriginal = 100
    // 移动间隔时间 ms
    this.enemyFlyInterval = allMoveSpeed
  }
  /**
   * @description: 创建敌机
   * @return {Object} 随机敌机数据
   */  
  createEnemyInfo() {
    // 从数据当中 随机生成列表
    return Object.assign({}, enemyList[Math.floor(Math.random() * enemyList.length)])
  }
  enemyStart() {
    this.createEnemy()
    this.enemyMove()
  }
  // 创建飞机
  createEnemy() {
    // 生成飞机
    const _info = this.createEnemyInfo()
    // 飞机元素
    const _enemyDom = document.createElement('div')
    // 血条背景
    const _enemyhealthDom = document.createElement('div')
    _enemyhealthDom.classList.add('enemyhealth')
    // 血条文字
    const _enemyHealthTextDom = document.createElement('span')
    _enemyHealthTextDom.innerText = _info.health
    _enemyHealthTextDom.classList.add('enemyHealthText')

    _enemyDom.appendChild(_enemyhealthDom)
    _enemyDom.appendChild(_enemyHealthTextDom)
    // 血量
    this.health = _info.health
    // 原血量
    this.healthOriginal = _info.health
    // 飞行速度
    this.enemyFlyInterval = _info.moveSpeed || allMoveSpeed
    // 实际位置
    const realX = this.positionX
    const realY = this.positionY
    // 生成位置
    const positionX = realX <= _info.width ? _info.width : realX - _info.width
    const positionY = realY - _info.height
    // 保存当前敌机
    enemyStore.setId(
      this.id, 
      Object.assign(
        _info, {
          positionY,
          positionX
        },
        {
          target: this
        }
      )
    )
    _enemyDom.style.cssText = `
      position: absolute;
      width: ${_info.width || 50}px; 
      height: ${_info.height || 50}px; 
      left: ${positionX}px; 
      top: ${positionY}px; 
      background: url(../image/${_info.image}.png) no-repeat;
      background-size: contain;
    `
    _enemyDom.setAttribute('id', this.id)
    this.enemyDom = _enemyDom
    this.enemyHealthDom = _enemyhealthDom
    this.enemyHealthTextDom = _enemyHealthTextDom
    container.appendChild(_enemyDom)
  }
  // 飞机移动
  enemyMove() {
    if (this.timer) this.enemyStop()
    this.timer = interval(() => {
      // 更新位置信息
      enemyStore.setId(this.id, {
        positionY: this.enemyDom.offsetTop
      })
      // 类型是网上移动
      if (this.moveType === 'top') { 
        if (this.enemyDom.offsetTop <= 0) {
          this.clearEnemy()
          return
        }
        this.enemyDom.style.top = this.enemyDom.offsetTop - this.enemyFlySpeed + 'px'
      // 如果类型是往下移动
      } else if (this.moveType === 'buttom') { 
        if (this.enemyDom.offsetTop >= containerHeight) {
          this.clearEnemy()
          return
        }
        this.enemyDom.style.top = this.enemyDom.offsetTop + this.enemyFlySpeed + 'px'
      }
    }, this.enemyFlyInterval);
  }
  // 停止定时器
  enemyStop() {
    clearInterval(this.timer)
    this.timer = null
  }
  // 清除飞机
  clearEnemy() {
    this.enemyStop()
    container.removeChild(this.enemyDom)
    enemyStore.removeStore(this.id)
  }
}