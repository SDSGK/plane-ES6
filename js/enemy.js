
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
    // 记录移动的定时器
    this.enemyForwardTimer = null
    this.enemyBackOffTimer = null
    this.enemyLeftTranslationTimer = null
    this.enemyRightTranslationTimer = null
    // 自定义移动方法
    this.autoMoveList = null
  }
  /**
   * @description: 创建敌机
   * @return {Object} 随机敌机数据
   */  
  createEnemyInfo() {
    // 从数据当中 随机生成列表
    return Object.assign({}, enemyList[Math.floor(Math.random() * enemyList.length)])
  }
  // 创建敌机并且开始移动
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

    this.autoMoveList = _info.enemyMoveFunc && _info.enemyMoveFunc()
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
    const autoMoveList = this.autoMoveList
    // 按键映射
    const moveDirectionMap = {
      top: 'enemyForward',
      button: 'enemyBackOff',
      left: 'enemyLeftTranslation',
      right: 'enemyRightTranslation'
    }
    if (Array.isArray(autoMoveList) && autoMoveList.length !== 0) {
      let index = 0
      // 使用自定义移动方法
      const moveFunc = async () => {
        // 检测并运行
        const singleMove = autoMoveList[index];
        const directionList = singleMove.moveDirection.split(',');
        for (const index in directionList) {
          if (Object.hasOwnProperty.call(directionList, index)) {
            const element = directionList[index];
            console.log('element', element);
            // 移动
            this[moveDirectionMap[element]] && this[moveDirectionMap[element]]()
          }
        }
        // 添加相对应的速度
        this.enemyFlyInterval = singleMove.speed || this.enemyFlyInterval
        this.enemyFlySpeed = singleMove.distance || this.enemyFlySpeed
        // 等待上一个执行完后执行下一个
        setTimeout(() => {
          // 停止移动
          this.enemyStop()
          index += 1
          if (index < autoMoveList.length) {
            moveFunc()
          }
        }, singleMove.timer);
      }
      // 使用方法
      moveFunc()
    }else {
      // 类型是网上移动
      if (this.moveType === 'top') { 
        this.enemyForward()
      // 如果类型是往下移动
      } else if (this.moveType === 'buttom') { 
        this.enemyBackOff()
      }
    }
  }
  // 前进（往下
  enemyForward() {
    // 清除重复定时器
    this.enemyMoveStop('enemyForwardTimer')
    this.enemyForwardTimer = interval(() => {
      // 更新位置信息
      this.updatePosition()
      // 判断范围
      if (this.enemyDom.offsetTop <= delayY) return
      this.enemyDom.style.top = this.enemyDom.offsetTop - this.enemyFlySpeed + 'px'
    }, this.enemyFlyInterval);
  }
  // 后退（往上
  enemyBackOff() {
    this.enemyMoveStop('enemyBackOffTimer')
    this.enemyBackOffTimer = interval(() => {
      // 更新位置信息
      this.updatePosition()
      // 限制范围
      if (this.enemyDom.offsetTop >= containerHeight) {
        this.clearEnemy()
        return
      }
      // 移动元素
      this.enemyDom.style.top = this.enemyDom.offsetTop + this.enemyFlySpeed + 'px'
    }, this.enemyFlyInterval);
  }
  // 左平移
  enemyLeftTranslation() {
    this.enemyMoveStop('enemyLeftTranslationTimer')
    this.enemyLeftTranslationTimer = interval(() => {
      // 更新位置信息
      this.updatePosition()
      // 限制范围
      if (this.enemyDom.offsetLeft <= 0) return
      // 移动元素
      this.enemyDom.style.left = this.enemyDom.offsetLeft - this.enemyFlySpeed + 'px'
    }, this.enemyFlyInterval);
  }
  // 右平移
  enemyRightTranslation() {
    this.enemyMoveStop('enemyRightTranslationTimer')
    this.enemyRightTranslationTimer = interval(() => {
      // 更新位置信息
      this.updatePosition()
      // 限制范围
      if (this.enemyDom.offsetLeft >= containerWidth - this.enemyDom.offsetWidth) return
      // 移动元素
      this.enemyDom.style.left = this.enemyDom.offsetLeft + this.enemyFlySpeed + 'px'
    }, this.enemyFlyInterval);
  }
  // 更新位置
  updatePosition() {
    enemyStore.setId(this.id, {
      positionX: this.enemyDom.offsetLeft,
      positionY: this.enemyDom.offsetTop
    })
  }
  // 清除相对应的移动定时器
  enemyMoveStop(key) {
    if (this[key]) {
      clearInterval(this[key])
      this[key] = null
    }
  }
  // 停止所有移动定时器
  enemyStop() {
    const timerList = ['enemyForwardTimer', 'enemyBackOffTimer', 'enemyLeftTranslationTimer', 'enemyRightTranslationTimer']
    for (const index in timerList) {
      const key = timerList[index]
      this.enemyMoveStop(key)
    }
  }
  // 清除飞机
  clearEnemy() {
    this.enemyStop()
    container.removeChild(this.enemyDom)
    enemyStore.removeStore(this.id)
  }
}