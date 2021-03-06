class Bullet {
  constructor(info = {}) {
    const defaultInfo = {
      bulletFlySpeed: playerInfo.shootDistance, // 单次移动距离
      positionX: 0, // X偏移量
      positionY: 0, // y偏移量
      moveType: 'top', // 往什么方位移动
      parentId: 'player', // 父级的id
      hurt: 15, // 子弹伤害
      cut: "play", // 子弹类型
      image: playerBulletImage, // 子弹贴图
      following: false, // 是否是跟踪子弹
      bulletWidth: 10, // 子弹宽度
      bulletHeight: 20 // 子弹高度
    }
    Object.assign(defaultInfo, info)
    // 飞行速度
    this.bulletFlySpeed = defaultInfo.bulletFlySpeed;
    // 位置信息
    this.positionX = defaultInfo.positionX - defaultInfo.bulletWidth / 2;
    this.positionY = defaultInfo.positionY + defaultInfo.bulletHeight;
    // 方向
    this.moveType = defaultInfo.moveType;
    // 伤害
    this.hurt = defaultInfo.hurt;
    // 父级ID 用于记录谁发射的子弹
    this.parentId = defaultInfo.parentId;
    // 类型
    this.cut = defaultInfo.cut;
    // 唯一id
    this.id = "bullet-" + guid();
    // Dom元素
    this.bulletDom = null;
    // 循环的仓库
    this.forStore = {
      wall: storeStore,
      supply: supplyStore,
    };
    this.angle = 0;
    this.width = defaultInfo.bulletWidth;
    this.height = defaultInfo.bulletHeight;
    this.image = defaultInfo.image;
    // 是否为跟踪子弹
    this.following = defaultInfo.following;
  }
  // 创建子弹
  createBullet() {
    const _bulletDom = document.createElement("div");
    _bulletDom.classList.add("bullet");
    bulletStore.setId(this.id, { target: this });
    // 设置子弹信息
    _bulletDom.style.cssText = `
      width: ${this.width}px; 
      height: ${this.height}px; 
      left: ${this.positionX}px; 
      top: ${this.positionY}px;
      transform: rotate(${this.cut === "play" ? "0deg" : "180deg"});
    `;
    this.bulletDom = _bulletDom;
    if (!rende2Canvas) {
      this.appendDom();
    }
  }
  // TODO：子弹移动的改动 参考敌机移动
  // 子弹移动
  bulletMove() {
    intervalStore.add(() => {
      if (this.moveType === "top") {
        // 碰壁
        if (this.positionY <= containerInfo.offsetTop) {
          this.clearBullet();
          return;
        }
        if (isFollowBullet || this.following) {
          // 跟踪子弹
          const enemyStoreList = enemyStore.getStore();
          const keys = Object.keys(enemyStoreList);
          const enemy = enemyStoreList[keys[0]];
          // 如果没有敌机 子弹往前飞
          if (enemy === undefined) {
            // 数据移动
            this.positionY -= this.bulletFlySpeed;
            this.angle = 0;
          } else {
            const { x, y, angle } = FollowUpBullet(
              enemy.positionX + containerInfo.offsetLeft + enemy.width / 2,
              enemy.positionY + containerInfo.offsetTop + enemy.height / 2,
              this.positionX,
              this.positionY,
              this.bulletFlySpeed
            );
            // 保存位置
            this.positionY += y;
            this.positionX += x;
            this.angle = angle;
          }
        } else {
          // 数据移动
          this.positionY -= this.bulletFlySpeed;
          this.angle = 0;
        }
      } else if (this.moveType === "buttom") {
        // 到底部
        if (this.positionY >= containerInfo.height) {
          this.clearBullet();
          return;
        }
        this.angle = 180;
        // 数据移动
        this.positionY += this.bulletFlySpeed;
      }
      // 调用更新位置
      this.updatePosition();
      // 调用碰撞检测
      this.bulletShooting();
    }, this.id);
  }
  // 子弹射击
  bulletShooting() {
    // 子弹偏移位置
    const bulletDelayY = this.positionY - containerInfo.offsetTop;
    const bulletDelayX = this.positionX - containerInfo.offsetLeft;
    // 循环需要碰撞的仓库
    const forStore = this.forStore;
    for (const key in forStore) {
      let store = forStore[key].getStore();
      // 取出仓库 进行循环
      for (const storeKey in store) {
        // 循环取出仓库每一项
        const enemy = forStore[key].getId(storeKey);
        if (
          // Y轴判断
          enemy.positionY <= bulletDelayY &&
          enemy.positionY + enemy.height >= bulletDelayY &&
          // X轴判断
          enemy.positionX <= bulletDelayX &&
          enemy.positionX + enemy.width >= bulletDelayX
        ) {
          this.updateEnemyInfo(enemy);
          return;
        }
      }
    }
    // 体积判断
    if (this.bulletDom && this.cut === "play") {
      const enemyStoreList = enemyStore.getStore();
      // 遍历飞机列表
      for (const key in enemyStoreList) {
        if (Object.hasOwnProperty.call(enemyStoreList, key)) {
          const enemy = enemyStoreList[key];
          // 碰撞判断
          if (
            // Y轴判断
            enemy.positionY <= bulletDelayY &&
            enemy.positionY + enemy.height >= bulletDelayY &&
            // X轴判断
            enemy.positionX <= bulletDelayX &&
            enemy.positionX + enemy.width >= bulletDelayX
          ) {
            this.updateEnemyInfo(enemy);
            return;
          }
        }
      }
    } else {
      // 敌机子弹
      const planeDomDelayY = playerInfo.offsetTop;
      const planeDomDelayX = playerInfo.offsetLeft;
      const planeHeight = playerInfo.height;
      const planeWidth = playerInfo.width;
      if (
        // Y轴判断
        planeDomDelayY <= bulletDelayY &&
        planeDomDelayY + planeHeight >= bulletDelayY &&
        // X轴判断
        planeDomDelayX <= bulletDelayX &&
        planeDomDelayX + planeWidth >= bulletDelayX
      ) {
        this.clearBullet();
        playerInfoControl.dscPlayBloodVolume(-this.hurt);
      }
    }
  }
  // 子弹碰到敌人后续操作
  updateEnemyInfo(enemy) {
    // 页面上删除子弹
    this.clearBullet();
    const target = enemy.target;
    target.health = toDecimal(target.health - this.hurt);
    // 更新飞机血量
    const enemyHealthDom = target.enemyHealthDom;
    if (!rende2Canvas) {
      enemyHealthDom.style.width =
        (target.health / target.healthOriginal) * 100 + "%";
    }
    // 更新血量提示文字
    const enemyHealthTextDom = target.enemyHealthTextDom;
    enemyHealthTextDom.innerText = target.health;
    // 如果生命清零 则删除飞机
    if (target.health <= 0) {
      // 页面上删除敌机
      target.enemyStop();
      // 数据上进行擦除
      typeStore[target.type].removeStore(target.id);
      enemyHealthDom.style.width = "0%";
      // 血条提示文字变为空
      enemyHealthTextDom.innerText = "";
      // 更换爆炸gif
      const enemyDom = target.enemyDom;
      if (!rende2Canvas) {
        enemyDom.style.background =
          "url(../image/boom.gif" + "?" + "gif-" + guid() + ") no-repeat";
        enemyDom.style.backgroundSize = "contain";
      } else {
        setBoom(enemy);
      }
      enemy.operationOptions?.operationStop();
      setTimeout(() => {
        target.clearEnemy();
      }, 1000);
      if (target.type === "supply") {
        if (this.parentId === "player") {
          // 玩家破坏补给
          const effData = supplyEff();
          notice.addNotice(effData.describe, {
            color: '#4E6EF2'
          })
          playerInfoControl.changeHurt()
          // 属性增幅计算
          increaseData[effData.keyName] = playerInfo[effData.keyName] * effData.range
          // 控制类调用计时
          efftControl.addEff(effData.keyName, effData, (efftData) => {
            notice.addNotice(effData.describeEnd, {
              color: '#4E6EF2'
            })
            playerInfoControl.changeHurt()
            increaseData[efftData.keyName] = 0
          })
        } else {
          // TODO：敌机抢夺强化
          // 敌机破坏补给
          const target = enemyStore.getId(this.parentId);
        }
        return
      }
      // 获取经验
      const levelInfo = playerInfoControl.getExperience(enemy);
      notice.addNotice(`击杀 获得经验：${levelInfo.levelExperience}`);
    }
  }
  updatePosition() {
    if (!rende2Canvas) {
      // 元素移动
      this.bulletDom.style.top = this.positionY + "px";
      this.bulletDom.style.left = this.positionX + "px";
      // 子弹旋转
      this.bulletDom.style.transform = "rotate(" + this.angle + "deg)";
    }
  }
  // 子弹停止 清除定时器
  bulletStop() {
    intervalStore.remove(this.id);
  }
  appendDom() {
    document.body.appendChild(this.bulletDom);
  }
  removeDom() {
    document.body.removeChild(this.bulletDom);
  }
  // 清除子弹
  clearBullet() {
    this.bulletStop();
    if (!rende2Canvas) {
      this.removeDom();
    }
    bulletStore.removeStore(this.id);
  }
}
