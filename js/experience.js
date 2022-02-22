class Experience {
  constructor() {
    // 经验比率
    this.empiricalRatio = 1.65;
    // 攻击力升级加成
    this.aggressivityRatio = 1.15;
  }
  // 获取等级
  getRank() {
    return playerInfo.rank;
  }
  // 获取经验比率
  getEmpiricalRatio() {
    return this.empiricalRatio;
  }
  // 累计经验
  accumulateExperience(targetHealth, playerInfo) {
    // 获取信息
    const info = {
      rank: playerInfo.rank,
      hurt: playerInfo.hurt,
      requiredForUpgrade: playerInfo.requiredForUpgrade,
      playBloodVolume: 0,
      experience: playerInfo.experience,
      level: 0,
    };
    // (等级 * 经验比率) * (经验 * 经验比率)
    info.levelExperience = parseInt(
      (info.rank / this.empiricalRatio) *
        ((targetHealth / this.empiricalRatio) * 0.5)
    );
    // 当前经验
    const currenExperience = info.experience + info.levelExperience;
    info.experience = currenExperience;
    // 计算是否升级
    if (currenExperience >= info.requiredForUpgrade) {
      // info.level += 1;
      // 升级提高伤害
      info.hurt = toDecimal(info.hurt * this.aggressivityRatio);
      this.getNextForUpgrade(info);
      info.playBloodVolume += info.level * 15;
      info.rank += info.level;
    }
    return info;
  }
  // 获取下一次升级所需要的数据
  getNextForUpgrade(expObject) {
    // 计算升级的等级
    const requiredLevel = parseInt(
      expObject.experience / expObject.requiredForUpgrade
    );
    if (expObject.experience >= expObject.requiredForUpgrade) {
      // 进行经验相减
      expObject.experience -= expObject.requiredForUpgrade;
    }
    if (requiredLevel > 0) {
      // 计算下一次需要提升的经验
      expObject.requiredForUpgrade = parseInt(
        (expObject.requiredForUpgrade *= this.empiricalRatio)
      );
      expObject.level += 1;
      // 递归
      this.getNextForUpgrade(expObject);
    }
  }
  // 升级提升
  upgrade(playerInfo) {
    const uploadingMap = {
      10: true,
      20: true,
      25: true,
      30: true,
      35: true,
      50: true,
      60: true,
      70: true,
      80: true,
      90: true,
    };
    if (uploadingMap[parseInt(playerInfo.rank)]) {
      playerInfo.hurt = toDecimal(playerInfo.hurt * this.empiricalRatio);
      playerInfo.playInvincibleTimer *= this.empiricalRatio;
      playerInfoControl.changeHurt(playerInfo.hurt);
      playerInfoControl.changeShootSpeed(
        playerInfo.shootSpeed - (playerInfo.shootSpeed *= 0.2)
      );
      playerInfoControl.changeFollowingShootSpeed(
        playerInfo.followingShootSpeed - (playerInfo.followingShootSpeed *= 0.2)
      );
      playerInfoControl.changeBulletLength(playerInfo.bulletLength + 1);
    }
  }
  // 同步数据显示
  synchronization() {
    operationDom.setExperience(playerInfo.experience);
    operationDom.setRequiredForUpgrade(playerInfo.requiredForUpgrade);
    operationDom.setRank(playerInfo.rank);
    operationDom.setShootSpeed(playerInfo.shootSpeed);
    operationDom.setHurt(playerInfo.hurt);
    operationDom.setPlayBloodVolume(playerInfo.playBloodVolume);
  }
}

const playExperience = new Experience();
playExperience.synchronization();
