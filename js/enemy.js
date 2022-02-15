class Enemy {
  constructor(enemyFlySpeed, positionX, positionY, moveType) {
    // 飞行速度
    this.enemyFlySpeed = enemyFlySpeed;
    // 位置信息
    this.positionX = positionX;
    this.positionY = positionY;
    // 方向
    this.moveType = moveType;
    // 伤害
    this.hurt = 15;
    // 类型
    // this.cut = cut
    // 唯一id
    this.id = "ceateEnemyID";
    // 定时器
    this.timer = null;
    // Dom元素
    this.enemyDom = null;
    this.enemyHealthDom = null;
    this.enemyHealthTextDom = null;
    // 类型
    this.type = "enemy";
    // 当前血量
    this.health = 100;
    this.bulletNumber = 1;
    // 最大血量
    this.healthOriginal = 100;
    // 移动间隔时间 ms
    this.enemyFlyInterval = allMoveSpeed;
    // 自定义移动方法
    this.autoMoveList = null;
    // 记录移动的定时器
    this.moveDirectionMap = {
      top: "enemyForward",
      button: "enemyBackOff",
      left: "enemyLeftTranslation",
      right: "enemyRightTranslation",
      shoot: "enemyShoot",
    };
    this.shootTimer = null;
    this.shootInterval = 160;
    // 速度加成
    this.speedUp = 1;
    // 攻击力加成
    this.hurtUp = 1;
    // 宽度
    this.width = 50;
    this.height = 50;

    this.isHideHealth = false;
  }
  /**
   * @description: 创建敌机
   * @return {Object} 随机敌机数据
   */
  createEnemyInfo() {
    // 从数据当中 随机生成列表
    if (enemyMap.hasOwnProperty(fixedEnemyList[fixedEnemyIndex])) {
      return Object.assign({}, enemyMap[fixedEnemyList[fixedEnemyIndex++]]);
    } else {
      const keys = Object.keys(enemyMap);
      return Object.assign(
        {},
        enemyMap[keys[Math.floor(Math.random() * keys.length)]]
      );
    }
  }
  // 创建敌机并且开始移动
  enemyStart() {
    this.createEnemy();
    this.enemyMove();
  }
  // 创建飞机
  createEnemy() {
    // 生成飞机
    const _info = this.createEnemyInfo();
    // 飞机元素
    const _enemyDom = document.createElement("div");
    // 血条背景
    const _enemyhealthDom = document.createElement("div");
    _enemyhealthDom.classList.add("enemyhealth");
    // 血条文字
    const _enemyHealthTextDom = document.createElement("span");
    // 获取玩家等级
    const rank = playExperience.getRank();
    const empiricalRatio = playExperience.getEmpiricalRatio();
    const health = parseInt(
      (rank / empiricalRatio) * (_info.health * empiricalRatio * 0.25)
    );

    _enemyHealthTextDom.innerText = health;
    _enemyHealthTextDom.classList.add("enemyHealthText");
    // 不显示血条
    if (_info.isHideHealth) {
      _enemyHealthTextDom.style.display = "none";
      _enemyhealthDom.style.display = "none";
    }
    _enemyDom.appendChild(_enemyhealthDom);
    _enemyDom.appendChild(_enemyHealthTextDom);
    // 血量
    this.health = health;
    // 原血量
    this.healthOriginal = health;
    this.isHideHealth = _info.isHideHealth;
    // 飞行速度
    this.enemyFlyInterval = allMoveSpeed;
    this.enemyFlySpeed = _info.distance || distance;
    // 创建ID
    this.id = _info.type + "-" + guid();
    this.autoMoveList = _info.enemyMoveFunc && _info.enemyMoveFunc();
    // 实际位置
    const realX = this.positionX;
    const realY = this.positionY;
    // 生成位置
    const positionX =
      _info.delayX ||
      (realX <= _info.width ? _info.width : realX - _info.width);
    const positionY = realY - _info.height;
    this.positionX = positionX;
    this.positionY = positionY;

    this.bulletNumber = _info.bulletNumber;

    this.enemyType = _info.enemyType;
    // 合并数据
    const saveObject = Object.assign(
      _info,
      { positionY, positionX },
      { target: this }
    );
    this.width = _info.width;
    this.height = _info.height;
    this.type = _info.type;
    typeStore[_info.type].setId(this.id, saveObject);
    _enemyDom.style.cssText = `
      position: absolute;
      width: ${_info.width || 50}px; 
      height: ${_info.height || 50}px; 
      left: ${positionX}px; 
      top: ${positionY}px; 
      background: url(./image/${_info.image}.png) no-repeat;
      background-size: contain;
    `;
    _enemyDom.setAttribute("id", this.id);
    this.enemyDom = _enemyDom;
    this.enemyHealthDom = _enemyhealthDom;
    this.enemyHealthTextDom = _enemyHealthTextDom;
    if (!rende2Canvas) {
      container.appendChild(_enemyDom);
    }
  }
  // 飞机移动
  enemyMove() {
    const autoMoveList = this.autoMoveList;
    // 按键映射
    const moveDirectionMap = this.moveDirectionMap;

    if (Array.isArray(autoMoveList) && autoMoveList.length !== 0) {
      // 如果当前没有正在移动的数据则进行重新判断
      let operationIndex = 0;
      // 使用自定义移动方法
      const moveFunc = async () => {
        // 检测并运行
        const singleMove = autoMoveList[operationIndex];
        if (singleMove === undefined) return;
        // 配置当前操作
        const operationOptions = {
          operationIndex: operationIndex,
          operationTimer: null,
          moveNumber: 1,
          moveTimer: null,
          operationStop() {
            if (this.operationTimer) {
              clearTimeout(this.operationTimer);
              this.operationTimer = null;
            }
            if (this.moveTimer) {
              clearInterval(this.moveTimer);
              this.moveTimer = null;
            }
          },
        };
        // 将操作表进行分割 进行多个按键同时生效
        const directionList = singleMove.moveDirection.split(",");
        for (const index in directionList) {
          if (Object.hasOwnProperty.call(directionList, index)) {
            const element = directionList[index];
            // 移动
            this[moveDirectionMap[element]] &&
              this[moveDirectionMap[element]]();
          }
        }
        // 添加相对应的速度
        this.enemyFlySpeed =
          (singleMove.distance || this.enemyFlySpeed) * this.speedUp;

        // 进行移动时间记录 按照 60hz/1(具体取决于配置的飞机移动间隔) 的记录规则
        operationOptions.moveTimer = interval(() => {
          operationOptions.moveNumber += 1;
        }, allMoveSpeed);
        // 等待上一个执行完后执行下一个
        operationOptions.operationTimer = setTimeout(() => {
          // 停止移动
          this.enemyStop();
          operationIndex += 1;
          operationOptions.operationIndex += 1;
          operationOptions.moveNumber = 1;
          if (operationIndex < autoMoveList.length) {
            moveFunc();
          } else {
            if (typeStore[this.type].hasOwnProperty(this.id)) {
              this.enemyBackOff();
            }
          }
        }, singleMove.timer);
        // 保存
        typeStore[this.type].setId(this.id, { operationOptions });
      };
      // 如果 当前在移动 （暂停后继续执行
      const operationTarget = typeStore[this.type].getId(this.id);
      if (
        operationTarget &&
        operationTarget.hasOwnProperty("operationOptions")
      ) {
        // 获取操作对象
        const operationOptions = operationTarget.operationOptions;
        // 获取上一次正在操作的数据
        operationIndex = operationOptions.operationIndex;
        const singleMove = autoMoveList[operationIndex];
        if (singleMove === undefined) return;
        // 将上一次执行的时间 进行合并
        if (singleMove) {
          singleMove.timer =
            singleMove.timer - allMoveSpeed * operationOptions.moveNumber;
        }
        moveFunc();
      } else {
        // 使用方法
        moveFunc();
      }
    } else {
      // 类型是往上移动
      if (this.moveType === "top") {
        this.enemyForward();
        // 如果类型是往下移动
      } else if (this.moveType === "buttom") {
        this.enemyBackOff();
      }
    }
  }
  // 前进（往上
  enemyForward() {
    // 清除重复定时器
    intervalStore.add(() => {
      // 判断范围
      if (this.positionY <= containerInfo.offsetTop) return;
      this.positionY -= this.enemyFlySpeed;
      // 更新位置信息
      this.updatePosition();
      if (!rende2Canvas) {
        this.enemyDom.style.top =
          this.enemyDom.offsetTop - this.enemyFlySpeed + "px";
      }
    }, this.id + "enemyForwardTimer");
  }
  // 后退（往下
  enemyBackOff() {
    intervalStore.add(() => {
      // 限制范围
      if (this.positionY >= containerInfo.height) {
        this.enemyMoveStop("enemyBackOffTimer");
        this.clearEnemy();
        return;
      }
      this.positionY += this.enemyFlySpeed;
      // 更新位置信息
      this.updatePosition();
      if (!rende2Canvas) {
        // 移动元素
        this.enemyDom.style.top =
          this.enemyDom.offsetTop + this.enemyFlySpeed + "px";
      }
    }, this.id + "enemyBackOffTimer");
  }
  // 左平移
  enemyLeftTranslation() {
    intervalStore.add(() => {
      // 限制范围
      if (this.positionX <= 0) return;
      this.positionX -= this.enemyFlySpeed;
      // 更新位置信息
      this.updatePosition();
      if (!rende2Canvas) {
        // 移动元素
        this.enemyDom.style.left = this.positionX + "px";
      }
    }, this.id + "enemyLeftTranslationTimer");
  }
  // 右平移
  enemyRightTranslation() {
    intervalStore.add(() => {
      // 限制范围
      if (this.positionX >= containerInfo.height - this.width) return;
      this.positionX += this.enemyFlySpeed;
      // 更新位置信息
      this.updatePosition();
      if (!rende2Canvas) {
        // 移动元素
        this.enemyDom.style.left = this.positionX + "px";
      }
    }, this.id + "enemyRightTranslationTimer");
  }
  // 发射子弹
  enemyShoot() {
    this.stopEnemyShoot();
    this.shootTimer = setInterval(() => {
      const positionX = this.positionX + containerInfo.offsetLeft;
      const positionY = this.positionY + this.height / 2;
      const bulletImage =
        this.enemyType === "boss" ? enemyBoosBulletImage : enemyBulletImage;
      // 循环发射子弹
      for (let i = 0; i < this.bulletNumber; i++) {
        // 宽度进行取平均分布子弹
        const average = this.width / (this.bulletNumber + 1);
        // 依次分布子弹位置
        let bulletPositionX = positionX + average * (i + 1);
        const bullet = new Bullet({
          positionX: bulletPositionX,
          positionY,
          moveType: "buttom",
          bulletType: this.id,
          hurt: this.hurt,
          cut: "enemy",
          image: bulletImage,
        });
        bullet.createBullet();
        bullet.bulletMove();
      }
    }, this.shootInterval);
  }
  stopEnemyShoot() {
    if (this.shootTimer) {
      clearInterval(this.shootTimer);
      this.shootTimer = null;
    }
  }
  // 更新位置
  updatePosition() {
    const saveObject = {
      positionX: this.positionX,
      positionY: this.positionY,
    };
    typeStore[this.type].setId(this.id, saveObject);
    // 判断是否撞到玩家
    if (
      this.positionX >= playerInfo.offsetLeft &&
      this.positionX <= playerInfo.offsetLeft + playerInfo.width &&
      this.positionY + this.height >= playerInfo.offsetTop &&
      this.positionY <= playerInfo.offsetTop + playerInfo.height
    ) {
      playerInfoControl.dscPlayBloodVolume(-this.hurt)
    }
  }
  // 清除相对应的移动定时器
  enemyMoveStop(key) {
    if (this[key]) {
      intervalStore.remove(this.id + this[key]);
      this[key] = null;
    }
  }
  // 停止所有移动定时器
  enemyStop() {
    const timerList = [
      "enemyForwardTimer",
      "enemyBackOffTimer",
      "enemyLeftTranslationTimer",
      "enemyRightTranslationTimer",
    ];
    for (const index in timerList) {
      const key = timerList[index];
      intervalStore.remove(this.id + key);
    }
    // 暂停发射
    this.stopEnemyShoot();
  }
  // 清除飞机
  clearEnemy() {
    const enemyTarget = typeStore[this.type].getId(this.id);
    enemyTarget?.operationOptions?.operationStop();
    this.enemyStop();
    if (!rende2Canvas) {
      container.removeChild(this.enemyDom);
    }
    typeStore[this.type].removeStore(this.id);
  }
}
