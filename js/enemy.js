
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
    // 自定义移动方法
    this.autoMoveList = null
    // 记录移动的定时器
    this.moveDirectionMap = {
      top: 'enemyForward',
      button: 'enemyBackOff',
      left: 'enemyLeftTranslation',
      right: 'enemyRightTranslation',
      shoot: 'enemyShoot',
    }
    this.shootTimer = null
    this.shootInterval = 160
  }
  /**
   * @description: 创建敌机
   * @return {Object} 随机敌机数据
   */
  createEnemyInfo() {
    // 从数据当中 随机生成列表
    if (typeof fixedEnemyList[fixedEnemyIndex] === 'number') {
      return Object.assign({}, enemyList[fixedEnemyList[fixedEnemyIndex++]])
    }
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
    this.enemyFlyInterval = allMoveSpeed
    this.enemyFlySpeed = _info.distance || distance

    this.autoMoveList = _info.enemyMoveFunc && _info.enemyMoveFunc()
    // 实际位置
    const realX = this.positionX
    const realY = this.positionY
    // 生成位置
    const positionX = _info.delayX || realX <= _info.width ? _info.width : realX - _info.width
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
      background: url(./image/${_info.image}.png) no-repeat;
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
    const moveDirectionMap = this.moveDirectionMap

    if (Array.isArray(autoMoveList) && autoMoveList.length !== 0) {
      // 如果当前没有正在移动的数据则进行重新判断
      let operationIndex = 0
      // 使用自定义移动方法
      const moveFunc = async () => {
        // 检测并运行
        const singleMove = autoMoveList[operationIndex];
        if (singleMove === undefined) return
        // 配置当前操作
        const operationOptions = {
          operationIndex: operationIndex,
          operationTimer: null,
          moveNumber: 1,
          moveTimer: null,
          operationStop() {
            if (this.operationTimer) {
              clearTimeout(this.operationTimer)
              this.operationTimer = null
            }
            if (this.moveTimer) {
              clearInterval(this.moveTimer)
              this.moveTimer = null
            }
          }
        }
        // 将操作表进行分割 进行多个按键同时生效
        const directionList = singleMove.moveDirection.split(',');
        for (const index in directionList) {
          if (Object.hasOwnProperty.call(directionList, index)) {
            const element = directionList[index];
            // 移动
            this[moveDirectionMap[element]] && this[moveDirectionMap[element]]()
          }
        }
        // 添加相对应的速度
        this.enemyFlySpeed = singleMove.distance || this.enemyFlySpeed

        // 进行移动时间记录 按照 60hz/1(具体取决于配置的飞机移动间隔) 的记录规则
        operationOptions.moveTimer = interval(() => {
          operationOptions.moveNumber += 1
        }, allMoveSpeed)
        // 等待上一个执行完后执行下一个
        operationOptions.operationTimer = setTimeout(() => {
          // 停止移动
          this.enemyStop()
          operationIndex += 1
          operationOptions.operationIndex += 1
          operationOptions.moveNumber = 1
          if (operationIndex < autoMoveList.length) {
            moveFunc()
          } else {
            if (enemyStore.hasOwnProperty(this.id)) {
              this.enemyBackOff()
            }
          }
        }, singleMove.timer);
        // 保存
        enemyStore.setId(this.id, { operationOptions })
      }
      // 如果 当前在移动 （暂停后继续执行
      const operationTarget = enemyStore.getId(this.id)
      if (operationTarget && operationTarget.hasOwnProperty('operationOptions')) {
        // 获取操作对象
        const operationOptions = operationTarget.operationOptions
        // 获取上一次正在操作的数据
        operationIndex = operationOptions.operationIndex
        const singleMove = autoMoveList[operationIndex];
        if (singleMove === undefined) return
        // 将上一次执行的时间 进行合并
        if (singleMove) {
          singleMove.timer = singleMove.timer - (allMoveSpeed * operationOptions.moveNumber)
        }
        moveFunc()
      } else {
        // 使用方法
        moveFunc()
      }

    } else {
      // 类型是网上移动
      if (this.moveType === 'top') {
        this.enemyForward()
        // 如果类型是往下移动
      } else if (this.moveType === 'buttom') {
        this.enemyBackOff()
      }
    }
  }
  // 前进（往上
  enemyForward() {
    // 清除重复定时器
    intervalStore.add(() => {
      // 判断范围
      if (this.enemyDom.offsetTop <= delayY) return
      // 更新位置信息
      this.updatePosition()
      this.enemyDom.style.top = this.enemyDom.offsetTop - this.enemyFlySpeed + 'px'
    }, this.id + 'enemyForwardTimer')
  }
  // 后退（往下
  enemyBackOff() {
    intervalStore.add(() => {
      // 限制范围
      if (this.enemyDom.offsetTop >= containerHeight) {
        this.enemyMoveStop('enemyBackOffTimer')
        this.clearEnemy()
        return
      }
      // 更新位置信息
      this.updatePosition()
      // 移动元素
      this.enemyDom.style.top = this.enemyDom.offsetTop + this.enemyFlySpeed + 'px'
    }, this.id + 'enemyBackOffTimer')
  }
  // 左平移
  enemyLeftTranslation() {
    intervalStore.add(() => {
      // 限制范围
      if (this.enemyDom.offsetLeft <= 0) return
      // 更新位置信息
      this.updatePosition()
      // 移动元素
      this.enemyDom.style.left = this.enemyDom.offsetLeft - this.enemyFlySpeed + 'px'
    }, this.id + 'enemyLeftTranslationTimer')
  }
  // 右平移
  enemyRightTranslation() {
    intervalStore.add(() => {
      // 限制范围
      if (this.enemyDom.offsetLeft >= containerWidth - this.enemyDom.offsetWidth) return
      // 更新位置信息
      this.updatePosition()
      // 移动元素
      this.enemyDom.style.left = this.enemyDom.offsetLeft + this.enemyFlySpeed + 'px'
    }, this.id + 'enemyRightTranslationTimer')
  }
  // 发射子弹
  enemyShoot() {
    this.stopEnemyShoot()
    this.shootTimer = setInterval(() =>{
      const enemyDom = this.enemyDom
      let positionX = ((enemyDom.offsetLeft + delayX) + (enemyDom.offsetWidth / 2))
      let positionY = enemyDom.offsetTop
      let bullet = new Bullet(allMoveSpeed, positionX, positionY, 'buttom', 10, 'enemy')
      bullet.createBullet()
      bullet.bulletMove()
    }, this.shootInterval)
  }
  stopEnemyShoot() {
    if (this.shootTimer) {
      clearInterval(this.shootTimer)
      this.shootTimer = null
    }
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
      intervalStore.remove(this.id + this[key]);
      this[key] = null
    }
  }
  // 停止所有移动定时器
  enemyStop() {
    const timerList = ['enemyForwardTimer', 'enemyBackOffTimer', 'enemyLeftTranslationTimer', 'enemyRightTranslationTimer']
    for (const index in timerList) {
      const key = timerList[index]
      intervalStore.remove(this.id + key);
    }
    // 暂停发射
    this.stopEnemyShoot()
  }
  // 清除飞机
  clearEnemy() {
    const enemyTarget = enemyStore.getId(this.id)
    enemyTarget?.operationOptions?.operationStop()
    this.enemyStop()
    container.removeChild(this.enemyDom)
    enemyStore.removeStore(this.id)
  }
}
