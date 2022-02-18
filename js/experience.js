class Experience {
  constructor() {
    // 经验比率
    this.empiricalRatio = 1.5;
    // 攻击力升级加成
    this.aggressivityRatio = 1.1;
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
      level: 0
    };
    // (等级 * 经验比率) * (经验 * 经验比率)
    info.levelExperience = parseInt(
      (info.rank / this.empiricalRatio) *
        ((targetHealth / this.empiricalRatio) * 0.5)
    );
    // 当前经验
    const currenExperience = info.experience + info.levelExperience;
    info.experience = currenExperience
    // 计算是否升级
    if (currenExperience >= info.requiredForUpgrade) {
      // 记录提升的等级（可能会出现连续升级的情况）
      const level = parseInt(currenExperience / info.requiredForUpgrade) || 1;
      info.level = level
      info.rank += level;
      // 升级提高伤害
      info.hurt = toDecimal(info.hurt * this.aggressivityRatio);
      // 增加血量
      info.playBloodVolume += level * 15;
      // 翻倍经验
      info.requiredForUpgrade = parseInt(
        (info.requiredForUpgrade *= this.empiricalRatio) * level
      );
    }
    return info;
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
      playerInfoControl.changeShootSpeed(playerInfo.shootSpeed - (playerInfo.shootSpeed *= 0.2));
      playerInfoControl.changeFollowingShootSpeed(playerInfo.followingShootSpeed - (playerInfo.followingShootSpeed *= 0.2));
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
