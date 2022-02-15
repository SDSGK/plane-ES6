// 键位
const keyLimit = {
  87: {
    key: "w",
    status: false,
    keyDom: wKey,
    moveing() {
      intervalStore.add(() => {
        // 边界判断
        if (playerInfo.offsetTop <= 0) return;
        playerInfo.offsetTop -= moveSpeed
        ansycPosition()
      }, this.key);
    },
    moveStop() {
      intervalStore.remove(this.key);
    },
  },
  83: {
    key: "s",
    status: false,
    keyDom: sKey,
    moveing() {
      intervalStore.add(() => {
        // 边界判断
        if (playerInfo.offsetTop >= containerInfo.height - playerInfo.height) return;
        playerInfo.offsetTop += moveSpeed
        ansycPosition()
      }, this.key);
    },
    moveStop() {
      intervalStore.remove(this.key);
    },
  },
  65: {
    key: "a",
    status: false,
    keyDom: aKey,
    moveing() {
      intervalStore.add(() => {
        // 边界判断
        if (playerInfo.offsetLeft <= 0) return;
        playerInfo.offsetLeft -= moveSpeed
        ansycPosition()
      }, this.key);
    },
    moveStop() {
      intervalStore.remove(this.key);
    },
  },
  68: {
    key: "d",
    status: false,
    keyDom: dKey,
    moveing() {
      intervalStore.add(() => {
        // 边界判断
        if (playerInfo.offsetLeft >= containerInfo.width - playerInfo.width) return;
        playerInfo.offsetLeft += moveSpeed
        ansycPosition()
      }, this.key);
    },
    moveStop() {
      intervalStore.remove(this.key);
    },
  },
  74: {
    key: "j",
    value: true,
    timer: null,
    status: false,
    keyDom: jKey,
    moveing() {
      // 定时创建子弹
      shootIntervalStore.add(() => {
        const positionX = playerInfo.offsetLeft + containerInfo.offsetLeft;
        const positionY = playerInfo.offsetTop;
        // 循环发射子弹
        for (let i = 0; i < playerInfo.bulletLength; i++) {
          // 宽度进行取平均分布子弹
          const average = playerInfo.width / (playerInfo.bulletLength + 1);
          // 依次分布子弹位置
          let bulletPositionX = positionX + average * (i + 1);
          const bullet = new Bullet({
            positionX: bulletPositionX,
            positionY,
            hurt: playerInfo.hurt,
            image: playerBulletImage,
            following: false,
          });
          bullet.createBullet();
          bullet.bulletMove();
        }
      }, this.key);
      // 跟踪子弹
      followingShootIntervalStore.add(() => {
        // 随机ture\false
        const flag =
          probabilityData[Math.floor(Math.random() * probabilityData.length)];
        // 获取当前偏移量
        let positionX = playerInfo.offsetLeft + containerInfo.offsetLeft;
        // 如果是true
        if (flag) {
          positionX += playerInfo.width;
        }
        const positionY = playerInfo.offsetTop;
        const bullet = new Bullet({
          positionX,
          positionY,
          hurt: playerInfo.hurt,
          image: followingBullet,
          following: true,
          bulletWidth: 25,
          bulletHeight: 25
        });
        bullet.createBullet();
        bullet.bulletMove();
      }, this.key);
    },
    moveStop() {
      shootIntervalStore.remove(this.key);
      followingShootIntervalStore.remove(this.key);
    },
  },
  73: {
    key: "i",
    value: true,
    timer: null,
    status: false,
    coolingTimeOrginal: 10,
    nowCoolingTime: 0,
    keyDom: iKey,
    isCoolingTime: true,
    duration: 3000,
    coolingClassName: "",
    moveing() {
      this.nowCoolingTime = this.coolingTimeOrginal;
      // 大招 计时器
      shootIntervalStore.setIntervalDelay(32);
      if (keyLimit[74].status) {
        keyLimit[74].moveStop();
        keyLimit[74].moveing();
      }
      setTimeout(() => {
        shootIntervalStore.setIntervalDelay(shootSpeedOrginal);
        if (keyLimit[74].status && !isClickStopButton) {
          keyLimit[74].moveStop();
          keyLimit[74].moveing();
        }
      }, this.duration);
      coolingFunc(this);
    },
    // 停止冷却计时
    stopCooling() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    moveStop() {
      this.stopCooling();
    },
  },
  76: {
    key: "l",
    value: true,
    timer: null,
    status: false,
    coolingTimeOrginal: 10,
    nowCoolingTime: 0,
    keyDom: lKey,
    isCoolingTime: true,
    duration: 3000,
    coolingClassName: "",
    moveing() {
      this.nowCoolingTime = this.coolingTimeOrginal;
      isFollowBullet = true;
      setTimeout(() => {
        shootIntervalStore.setIntervalDelay(shootSpeedOrginal);
        // 技能持续时间结束
        isFollowBullet = false;
      }, this.duration);
      coolingFunc(this);
    },
    // 停止冷却计时
    stopCooling() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    moveStop() {
      this.stopCooling();
    },
  },
  75: {
    key: "k",
    status: false,
    keyDom: kKey,
    isHoldOn: false,
    moveing() {
      this.isHoldOn = true;
      // 记录当前速度
      moveSpeedOrginal = moveSpeed;
      // 加速
      moveSpeed = moveSpeed * 1.35;
      // 记录当前子弹伤害
      hurtOrginal = hurt;
      // 进行伤害降低
      hurt = hurt * 0.75;
      // 更新界面显示
      operationDom.setHurt(hurt);
      playerInfo.width /= 2;
      playerInfo.height /= 2;

      playerInfo.offsetLeft += (playerInfo.width / 2);
      playerInfo.offsetTop += (playerInfo.height / 2);
      
      if (!rende2Canvas) {
        // 体积减少
        planeDom.style.width = playerInfo.width + "px";
        planeDom.style.height = playerInfo.height + "px";
        // 位置变为中心点
        planeDom.style.left = playerInfo.offsetLeft + "px";
        planeDom.style.top = playerInfo.offsetTop + "px";
      }
    },
    moveStop() {
      if (this.isHoldOn) {
        // 移动速度还原
        moveSpeed = moveSpeedOrginal;
        // 伤害还原
        hurt = hurtOrginal;
        // 更新界面显示
        operationDom.setHurt(hurt);
        // 体积还原
        playerInfo.width *= 2;
        playerInfo.height *= 2;
        
        // 位置变为中心点
        playerInfo.offsetLeft -= (playerInfo.width / 4);
        playerInfo.offsetTop -= (playerInfo.height / 4);
        if (!rende2Canvas) {
          // 体积减少
          planeDom.style.width = playerInfo.width + "px";
          planeDom.style.height = playerInfo.height + "px";
          // 位置变为中心点
          planeDom.style.left = playerInfo.offsetLeft + "px";
          planeDom.style.top = playerInfo.offsetTop + "px";
        }
        this.isHoldOn = false
      }
    },
  },
};
// 按下
function keydownFunc(e) {
  const code = e.keyCode;
  if (keyLimit[code]) {
    if (
      typeof keyLimit[code].moveing === "function" &&
      !keyLimit[code].status
    ) {
      keyLimit[code].status = true;
      keyLimit[code].keyDom.style.border = "1px solid #67C23A";
      keyLimit[code].moveing(e);
    }
  }
}
// 抬起
function keyupFunc(e) {
  const code = e.keyCode;
  if (keyLimit[code]) {
    if (typeof keyLimit[code].moveStop === "function") {
      if (!keyLimit[code].isCoolingTime) {
        keyLimit[code].status = false;
        keyLimit[code].moveStop(e);
      }
      keyLimit[code].keyDom.style.border = "";
    }
  }
}
// 添加键盘按下事件
document.addEventListener("keydown", keydownFunc);
// 添加键盘抬起事件
document.addEventListener("keyup", keyupFunc);

// 监听高优先按键
document.addEventListener("keydown", (e) => {
  const code = e.keyCode;
  if (code === escKeyCode) {
    escKeyFunc('暂停');
  }
});

// 按下esc键调用函数
function escKeyFunc(tips = '暂停') {
  // 判断是否处于暂停状态
  if (isClickStopButton) {
    isClickStopButton = false;
    moveing();
  } else {
    isClickStopButton = true;
    moveStop();
  }
  // 切换样式 用于隐藏、显示 暂停提示
  pause.querySelector('span').innerText = tips
  pause.classList.toggle("display-none");
}
// 同步飞机位置
function ansycPosition() {
  if (!rende2Canvas) {
    planeDom.style.left = playerInfo.offsetLeft + "px";
    planeDom.style.top = playerInfo.offsetTop + "px";
  }
}
