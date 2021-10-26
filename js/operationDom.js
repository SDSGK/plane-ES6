class OperationDom {
  constructor() {
    // 玩家血量
    this.playBloodVolume = playBloodVolumeDom
    // 当前经验
    this.experience = experienceDom
    // 当前升级所需经验
    this.requiredForUpgrade = requiredForUpgradeDom
    // 当前等级
    this.rank = rankDom
    // 当前当前子弹射速
    this.shootSpeed = shootSpeedDom
    // 当前当前子弹伤害
    this.hurt = hurtDom
  }
  // 设置玩家血量
  setPlayBloodVolume(value) {
    this.playBloodVolume.innerText = value
  }
  // 当前经验
  setExperience(value) {
    this.experience.innerText = value
  }
  // 当前升级所需经验
  setRequiredForUpgrade(value) {
    this.requiredForUpgrade.innerText = value
  }
  // 当前等级
  setRank(value) {
    this.rank.innerText = value
  }
  // 当前当前子弹射速
  setShootSpeed(value) {
    this.shootSpeed.innerText = value
  }
  // 当前当前子弹伤害
  setHurt(value) {
    this.hurt.innerText = value
  }
}
const operationDom = new OperationDom()