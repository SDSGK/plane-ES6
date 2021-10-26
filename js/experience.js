class Experience {
  constructor() {
    // 等级
    this.rank = 1
    // 经验
    this.experience = 0
    // 升级所需要的经验
    this.requiredForUpgrade = 100
    // 经验比率
    this.empiricalRatio = 1.5
  }
  // 获取等级
  getRank() {
    return this.rank
  }
  // 获取经验比率
  getEmpiricalRatio() {
    return this.empiricalRatio
  }
  // 累计经验
  accumulateExperience(target) {
    const { healthOriginal } = target.target
    // (等级 * 经验比率) * (经验 * 经验比率)
    this.experience += parseInt((this.rank / this.empiricalRatio) * (healthOriginal / this.empiricalRatio * 0.5) )
    // 更新经验显示页面
    operationDom.setExperience(this.experience)
    if (this.experience >= this.requiredForUpgrade) {
      // 升级
      this.rank += 1
      // 翻倍经验
      this.requiredForUpgrade  = parseInt(this.requiredForUpgrade *= this.empiricalRatio)
      this.upgrade()
      this.synchronization()
    }
  }
  // 升级提升
  upgrade() {
    switch (this.rank) {
      case 5:
        shootSpeed = 150
        // 应用射速间隔
        shootIntervalStore.setIntervalDelay(shootSpeed)
        break;
      case 10:
        shootSpeed = 130
        hurt = 15
        playInvincibleTimer = 700
        shootIntervalStore.setIntervalDelay(shootSpeed)
        break;
      case 20:
        shootSpeed = 110
        hurt = 20
        playInvincibleTimer = 1200
        shootIntervalStore.setIntervalDelay(shootSpeed)
        break;
      case 30:
        shootSpeed = 100
        hurt = 30
        playInvincibleTimer = 1500
        shootIntervalStore.setIntervalDelay(shootSpeed)
        break;
    }
  }
  // 同步数据显示
  synchronization() {
    operationDom.setRequiredForUpgrade(this.requiredForUpgrade)
    operationDom.setRank(this.rank)
    operationDom.setShootSpeed(shootSpeed)
    operationDom.setHurt(hurt)
  }
}

const playExperience = new Experience()
playExperience.synchronization()