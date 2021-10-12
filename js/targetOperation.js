
function moveStop() {
  const _enemyStore = enemyStore.getStore()
  const _bulletStore = bulletStore.getStore()

  intervalStore.clearInterval()
  shootIntervalStore.clearInterval()
  // 停止飞机移动
  if (Object.keys(_enemyStore).length) {
    for (const enemy in _enemyStore) {
      if (Object.hasOwnProperty.call(_enemyStore, enemy)) {
        const element = _enemyStore[enemy];
        if (element.target) {
          if (typeof element.target.enemyStop === 'function') {
            element?.target?.enemyStop()
            element?.operationOptions?.operationStop()
          }
        }
      }
    }
  }

  // 停止子弹移动
  if (Object.keys(_bulletStore).length) {
    for (const enemy in _bulletStore) {
      if (Object.hasOwnProperty.call(_bulletStore, enemy)) {
        const element = _bulletStore[enemy];
        if (element.target) {
          if (typeof element.target.bulletStop === 'function') {
            element.target.bulletStop()
          }
        }
      }
    }
  }
  // 停止定时器进行生成敌机
  if (typeof stop === 'function') {
    stop()
  }
  // 添加键盘按下事件
  document.removeEventListener('keydown', keydownFunc)
  // 添加键盘抬起事件
  document.removeEventListener('keyup', keyupFunc)
  // 停止操作飞机移动
  for (const key in keyLimit) {
    const element = keyLimit[key];
    if (!element.isCoolingTime) {
      element.status = false;
    }
    element.moveStop();
    element.keyDom.style.border = ''
  }
}

function moveing() {
  if (isClickStopButton) {
    return
  }
  const _enemyStore = enemyStore.getStore()
  const _bulletStore = bulletStore.getStore()

  intervalStore.createInterval()
  shootIntervalStore.createInterval()
  // 如果暂停了冷却倒计时
  if (keyLimit[73].nowCoolingTime) {
    keyLimit[73].coolingFunc()
  }
  // 开始飞机移动
  if (Object.keys(_enemyStore).length) {
    for (const enemy in _enemyStore) {
      if (Object.hasOwnProperty.call(_enemyStore, enemy)) {
        const element = _enemyStore[enemy];
        if (element.target) {
          if (typeof element.target.enemyMove === 'function') {
            element.target.enemyMove()
          }
        }
      }
    }
  }
  // 开始子弹移动
  if (Object.keys(_bulletStore).length) {
    for (const enemy in _bulletStore) {
      if (Object.hasOwnProperty.call(_bulletStore, enemy)) {
        const element = _bulletStore[enemy];
        if (element.target) {
          if (typeof element.target.bulletMove === 'function') {
            element.target.bulletMove()
          }
        }
      }
    }
  }
  // 添加键盘按下事件
  document.addEventListener('keydown', keydownFunc)
  // 添加键盘抬起事件
  document.addEventListener('keyup', keyupFunc)
  // 进行定时生成敌机
  if (typeof init === 'function') {
    init()
  }
}
