class Experience {
  constructor() {
    // 等级
    this.rank = 1;
    // 经验
    this.experience = 0;
    // 升级所需要的经验
    this.requiredForUpgrade = 100;
    // 经验比率
    this.empiricalRatio = 1.5;
    // 攻击力升级加成
    this.aggressivityRatio = 1.10
    
  }
  // 获取等级
  getRank() {
    return this.rank;
  }
  // 获取经验比率
  getEmpiricalRatio() {
    return this.empiricalRatio;
  }
  // 累计经验
  accumulateExperience(target) {
    const { healthOriginal } = target.target;
    // (等级 * 经验比率) * (经验 * 经验比率)
    const levelExperience = parseInt(
      (this.rank / this.empiricalRatio) *
        ((healthOriginal / this.empiricalRatio) * 0.5)
    );
    this.experience += levelExperience;
    // 更新经验显示页面
    operationDom.setExperience(this.experience);
    if (this.experience >= this.requiredForUpgrade) {
      // 记录提升的等级（可能会出现连续升级的情况）
      const level = parseInt(this.experience / this.requiredForUpgrade) || 1;
      this.rank += level;
      // 升级提高伤害
      hurt = toDecimal(hurt * this.aggressivityRatio);
      // 翻倍经验
      this.requiredForUpgrade = parseInt(
        (this.requiredForUpgrade *= this.empiricalRatio) * level
      );
      this.upgrade();
      this.synchronization();
    }
    return { experience: this.experience, rank: this.rank, levelExperience };
  }
  // 升级提升
  upgrade() {
    switch (this.rank) {
      case 5:
        shootSpeed = 150;
        bulletLength += 1;
        // 应用射速间隔
        shootIntervalStore.setIntervalDelay(shootSpeed);
        notice.addNotice(
          `${new Date().toLocaleTimeString("zh-cn", {
            hour12: false,
          })}-射速提高到：${shootSpeed} 子弹数量提高到：${bulletLength}`
        );
        break;
      case 10:
        shootSpeed = 130;
        bulletLength += 1;
        hurt = toDecimal(hurt * 1.25);
        playInvincibleTimer = 700;
        shootIntervalStore.setIntervalDelay(shootSpeed);
        notice.addNotice(
          `${new Date().toLocaleTimeString("zh-cn", {
            hour12: false,
          })}-射速提高到：${shootSpeed} 子弹数量提高到：${bulletLength}`
        );
        break;
      case 20:
        shootSpeed = 110;
        hurt = toDecimal(hurt * 1.25);
        bulletLength += 1;
        playInvincibleTimer = 1200;
        shootIntervalStore.setIntervalDelay(shootSpeed);
        notice.addNotice(
          `${new Date().toLocaleTimeString("zh-cn", {
            hour12: false,
          })}-射速提高到：${shootSpeed} 子弹数量提高到：${bulletLength}`
        );
        break;
      case 30:
        shootSpeed = 100;
        hurt = toDecimal(hurt * 1.25);
        playInvincibleTimer = 1500;
        shootIntervalStore.setIntervalDelay(shootSpeed);
        notice.addNotice(
          `${new Date().toLocaleTimeString("zh-cn", {
            hour12: false,
          })}-射速提高到：${shootSpeed} 子弹数量提高到：${bulletLength}`
        );
        break;
    }
  }
  // 同步数据显示
  synchronization() {
    operationDom.setRequiredForUpgrade(this.requiredForUpgrade);
    operationDom.setRank(this.rank);
    operationDom.setShootSpeed(shootSpeed);
    operationDom.setHurt(hurt);
  }
}

const playExperience = new Experience();
playExperience.synchronization();
