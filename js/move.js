const shootIntervalStore = new Interval(shootSpeed)
shootIntervalStore.createInterval()
// 键位
const keyLimit = {
  87: {
    key: 'w',
    status: false,
    keyDom: wKey,
    moveing() {
      intervalStore.add(() => {
        if (planeDom.offsetTop <= 0) return
        planeDom.style.top = planeDom.offsetTop - moveSpeed + 'px'
      }, this.key)
    },
    moveStop() {
      intervalStore.remove(this.key)
    }
  },
  83: {
    key: 's',
    status: false,
    keyDom: sKey,
    moveing() {
      intervalStore.add(() => {
        if (planeDom.offsetTop >= containerHeight - planeDom.offsetWidth) return
        planeDom.style.top = planeDom.offsetTop + moveSpeed + 'px'
      }, this.key)
    },
    moveStop() {
      intervalStore.remove(this.key)
    }
  },
  65: {
    key: 'a',
    status: false,
    keyDom: aKey,
    moveing() {
      intervalStore.add(() => {
        if (planeDom.offsetLeft <= 0) return
        planeDom.style.left = planeDom.offsetLeft - moveSpeed + 'px'
      }, this.key)
    },
    moveStop() {
      intervalStore.remove(this.key)
    }
  },
  68: {
    key: 'd',
    status: false,
    keyDom: dKey,
    moveing() {
      intervalStore.add(() => {
        if (planeDom.offsetLeft >= containerWidth - planeDom.offsetWidth) return
        planeDom.style.left = planeDom.offsetLeft + moveSpeed + 'px'
      }, this.key)
    },
    moveStop() {
      intervalStore.remove(this.key)
    }
  },
  74: {
    key: 'j',
    value: true,
    timer: null,
    status: false,
    keyDom: jKey,
    moveing() {
      // 定时创建子弹
      shootIntervalStore.add(() => {
        let positionX = ((planeDom.offsetLeft + delayX) + (planeDom.offsetWidth / 2))
        let positionY = planeDom.offsetTop
        let bullet = new Bullet(allMoveSpeed, positionX, positionY, 'top', 20)
        bullet.createBullet()
        bullet.bulletMove(container)
      }, this.key)
    },
    moveStop() {
      shootIntervalStore.remove(this.key)
    }
  },
  73: {
    key: 'i',
    value: true,
    timer: null,
    status: false,
    coolingTimeOrginal: 10,
    nowCoolingTime: 0,
    keyDom: iKey,
    isCoolingTime: true,
    duration: 3000,
    coolingClassName: '',
    moveing() {
      this.nowCoolingTime = this.coolingTimeOrginal
      // 大招 计时器
      shootIntervalStore.setIntervalDelay(32)
      if (keyLimit[74].status) {
        keyLimit[74].moveStop()
        keyLimit[74].moveing()
      }
      // TODO：技能时间计入定时器暂停
      setTimeout(() => {
        shootIntervalStore.setIntervalDelay(shootSpeedOrginal)
        if (keyLimit[74].status && !isClickStopButton) {
          keyLimit[74].moveStop()
          keyLimit[74].moveing()
        }
      }, this.duration);
      coolingFunc(this)
    },
    // 停止冷却计时
    stopCooling() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    moveStop() {
      this.stopCooling()
    }
  }
}
// 按下
function keydownFunc(e) {
  const code = e.keyCode
  if (keyLimit[code]) {
    if (typeof keyLimit[code].moveing === 'function' && !keyLimit[code].status) {
      keyLimit[code].status = true
      keyLimit[code].keyDom.style.border = '1px solid #67C23A'
      keyLimit[code].moveing(e)
    }
  }
}
// 抬起
function keyupFunc(e) {
  const code = e.keyCode
  if (keyLimit[code]) {
    if (typeof keyLimit[code].moveStop === 'function') {
      if (!keyLimit[code].isCoolingTime) {
        keyLimit[code].status = false
        keyLimit[code].moveStop(e)
      }
      keyLimit[code].keyDom.style.border = ''
    }
  }
}
// 添加键盘按下事件
document.addEventListener('keydown', keydownFunc)
// 添加键盘抬起事件
document.addEventListener('keyup', keyupFunc)

// 监听高优先按键
document.addEventListener('keydown', (e) => {
  const code = e.keyCode
  if (code === escKeyCode) {
    escKeyFunc()
  }
})

// 按下esc键调用函数
function escKeyFunc() {
  // 判断是否处于暂停状态
  if (isClickStopButton) {
    isClickStopButton = false
    moveing()
  } else {
    isClickStopButton = true
    moveStop()
  }
  // 切换样式 用于隐藏、显示 暂停提示
  pause.classList.toggle('display-none')
}
