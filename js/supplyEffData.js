/**
 * describe：效果描述
 * effTime：持续时间
 */
const effData = [
  {
    describe: "增加 25% 攻击力，持续一分钟",
    describeEnd: "攻击力增幅时间结束",
    efftTime: 60000,
    nowEfftTime: 0,
    range: 0.25,
    keyName: 'hurt'
  },
  {
    describe: "增加 50% 受伤无敌时间，持续一分钟",
    describeEnd: "无敌时间增幅时间结束",
    efftTime: 60000,
    nowEfftTime: 0,
    range: 0.5,
    keyName: 'playInvincibleTimer'
  },
  // {
  //   describe: "增加 25% 移动速度，持续一分钟",
  //   effTime: 60000,
  //   range: 0.25,
  //   keyName: 'hurt'
  // },
];
