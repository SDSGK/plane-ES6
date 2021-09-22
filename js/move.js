// 键位
const keyLimit = {
  87: {
    key: 'w',
    value: true,
    timer: null,
    status: false,
    moveing() {
      this.status = true
      wKey.style.border = '1px solid #67C23A'
      this.timer = interval(() => {
        if(planeDom.offsetTop <= 0) return
        planeDom.style.top = planeDom.offsetTop - moveSpeed + 'px'
      })
    },
    movend() {
      this.status = false
      wKey.style.border = ''
      clearInterval(this.timer)
    }
  },
  83: {
    key: 's',
    value: true,
    timer: null,
    status: false,
    moveing() {
      this.status = true
      sKey.style.border = '1px solid #67C23A'
      this.timer = interval(() => {
        if(planeDom.offsetTop >= containerHeight - planeDom.offsetWidth) return
        planeDom.style.top = planeDom.offsetTop + moveSpeed + 'px'
      })
    },
    movend() {
      this.status = false
      sKey.style.border = ''
      clearInterval(this.timer)
    }
  },
  65: {
    key: 'a',
    value: true,
    timer: null,
    status: false,
    moveing() {
      this.status = true
      aKey.style.border = '1px solid #67C23A'
      this.timer = interval(() => {
        if(planeDom.offsetLeft <= 0) return
        planeDom.style.left = planeDom.offsetLeft - moveSpeed + 'px'
      })
    },
    movend() {
      this.status = false
      aKey.style.border = ''
      clearInterval(this.timer)
    }
  },
  68: {
    key: 'd',
    value: true,
    timer: null,
    status: false,
    moveing() {
      this.status = true
      dKey.style.border = '1px solid #67C23A'
      this.timer = interval(() => {
        if(planeDom.offsetLeft >= containerWidth - planeDom.offsetWidth) return
        planeDom.style.left = planeDom.offsetLeft + moveSpeed + 'px'
      })
    },
    movend() {
      this.status = false
      dKey.style.border = ''
      clearInterval(this.timer)
    }
  },
  74: {
    key: 'j',
    value: true,
    timer: null,
    status: false,
    moveing() {
      this.status = true
      jKey.style.border = '1px solid #67C23A'
      // 定时创建子弹
      this.timer = interval(() => {
        let positionX = ((planeDom.offsetLeft + delayX) + (planeDom.offsetWidth / 2))
        let positionY = planeDom.offsetTop
        let bullet = new Bullet(allMoveSpeed, positionX, positionY, 'top', 20)
        bullet.createBullet()
        bullet.bulletMove(container)
      }, shootSpeed)
    },
    movend() {
      this.status = false
      jKey.style.border = ''
      clearInterval(this.timer)
    }
  },
  73: {
    key: 'i',
    value: true,
    timer: null,
    status: false,
    CoolingTimeOrginal: 10,
    nowCoolingTime: 0,
    moveing() {
      this.status = true
      iKey.style.border = '1px solid #67C23A'
      this.nowCoolingTime = this.CoolingTimeOrginal
      // 大招 计时器
      const className = setCoolingTime(iKey, this.CoolingTimeOrginal, '#ffffff')
      shootSpeed = 16
      keyLimit[74].movend()
      keyLimit[74].moveing()
      
      setTimeout(() => {
        shootSpeed = shootSpeedOrginal
        keyLimit[74].movend()
        keyLimit[74].moveing()
      }, 3000);
      // TODO：按下esc暂停计时
      this.timer = interval(() => {
        this.nowCoolingTime -= 1
        if (this.nowCoolingTime === 0) {
          this.status = false
          iKey.classList.remove(className)
          iKey.classList.remove('coolingTime')
          clearInterval(this.timer)
        }
      }, 1000)
    },
    movend() {
      iKey.style.border = ''
    }
  }
}
// 按下
function keydownFunc(e) {
  const code = e.keyCode
  if(keyLimit[code]) {
    if(typeof keyLimit[code].moveing === 'function' && !keyLimit[code].status) {
      keyLimit[code].moveing(e)
    }
  }
}
// 抬起
function keyupFunc(e) {
  const code = e.keyCode
  if(keyLimit[code]) {
    if(typeof keyLimit[code].movend === 'function') {
      keyLimit[code].movend(e)
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
  console.log(code);
  // ESC键code
  const escKeyCode = 27
  if (code === escKeyCode) {
    escKeyFunc()
    // isClickStopButton = true
  }
})

// 按下esc键调用函数
function escKeyFunc() {
  // 判断是否处于暂停状态
  if (isClickStopButton) {
    isClickStopButton = false
    moveing()
  }else {
    isClickStopButton = true
    moveStop()
  }
  // 切换样式 用于隐藏、显示 暂停提示
  pause.classList.toggle('display-none')
}