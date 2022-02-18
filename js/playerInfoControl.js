class PlayerInfoControl {
  constructor() {}
  // 收到伤害
  dscPlayBloodVolume(value) {
    if (!isInvincibleTimer) {
      this.changePlayBloodVolume(value);
      // 无敌时间
      planeDom.classList.add("invincibleTimer");
      isInvincibleTimer = true;
      setTimeout(() => {
        planeDom.classList.remove("invincibleTimer");
        isInvincibleTimer = false;
      }, playerInfo.playInvincibleTimer + increaseData.playInvincibleTimer);
    }
  }
  // 设置玩家血量
  changePlayBloodVolume(value) {
    playerInfo.playBloodVolume += value;
    operationDom.setPlayBloodVolume(playerInfo.playBloodVolume);
    if (value < 0) {
      notice.addNotice(
        `受到伤害：${Math.abs(value)} 当前血量剩余：${
          playerInfo.playBloodVolume
        }`, {color: 'red'}
      );
    }
    if (playerInfo.playBloodVolume <= 0) {
      // 游戏结束
      escKeyFunc("游戏结束");
    }
  }
  getExperience(enemy) {
    // 获取当前的最大血量
    const { healthOriginal } = enemy.target;
    // 计算经验
    const info = playExperience.accumulateExperience(
      healthOriginal,
      playerInfo
    );
    // 基本信息更改
    this.changeExperience(info.experience);
    this.changeRequiredForUpgrade(info.requiredForUpgrade);
    this.changeHurt(info.hurt);
    this.changePlayBloodVolume(info.playBloodVolume);
    for (let i = 0; i < info.level; i++) {
      this.changeRank((playerInfo.rank += 1));
    }
    // 同步信息
    return info;
  }
  // 当前经验
  changeExperience(value = playerInfo.experience) {
    playerInfo.experience = value;
    operationDom.setExperience(value);
  }
  // 当前升级所需经验
  changeRequiredForUpgrade(value = playerInfo.requiredForUpgrade) {
    playerInfo.requiredForUpgrade = value;
    operationDom.setRequiredForUpgrade(value);
  }
  // 当前等级
  changeRank(value = playerInfo.rank) {
    playerInfo.rank = value;
    operationDom.setRank(value);
    playExperience.upgrade(playerInfo);
  }
  // 当前当前子弹射速
  changeShootSpeed(value = playerInfo.shootSpeed) {
    playerInfo.shootSpeed = value;
    shootSpeedOrginal = value;
    operationDom.setShootSpeed(value);
    notice.addNotice(`射速提高到：${value}`, {color: '#4E6EF2'});
    if (keyLimit[73].nowCoolingTime === 0) {
      // 开启技能的时候 不能立马切换
      shootIntervalStore.setIntervalDelay(value);
    }
  }
  // 当前当前跟踪子弹射速
  changeFollowingShootSpeed(value = playerInfo.followingShootSpeed) {
    playerInfo.followingShootSpeed = value;
    followingShootIntervalStore.setIntervalDelay(value);
    notice.addNotice(`跟踪子弹射速提高到：${value}`, {color: '#4E6EF2'});
  }
  // 当前当前子弹射速
  changeBulletLength(value = playerInfo.bulletLength) {
    playerInfo.bulletLength = value;
    notice.addNotice(`子弹数量提高到：${value}`, {color: '#4E6EF2'});
  }
  // 当前当前子弹伤害
  changeHurt(value = playerInfo.hurt) {
    playerInfo.hurt = value;
    operationDom.setHurt(value + increaseData.hurt);
  }
}
const playerInfoControl = new PlayerInfoControl();
