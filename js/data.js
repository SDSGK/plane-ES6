// 容器
const container = document.querySelector(".container");
// canvas容器
const canvasContainer = document.querySelector(".canvas");
const ctx = canvasContainer.getContext('2d');
// 玩家贴图
const playerImage = new Image();
playerImage.src = './image/player.png'
// 玩家子弹贴图
const playerBulletImage = new Image();
playerBulletImage.src = './image/playerBullet.png'
// 玩家子弹贴图
const followingBullet = new Image();
followingBullet.src = './image/followingBullet.png'
// 敌机子弹贴图
const enemyBulletImage = new Image();
enemyBulletImage.src = './image/enemyBullet.png'
// 敌机boss子弹贴图
const enemyBoosBulletImage = new Image();
enemyBoosBulletImage.src = './image/enemyBoosBullet.png'
// 爆炸贴图
const boomImage = document.querySelector('#boom')
// 飞机
const planeDom = document.querySelector(".plane");
// 移动键
const wKey = document.querySelector(".w_key");
const aKey = document.querySelector(".a_key");
const sKey = document.querySelector(".s_key");
const dKey = document.querySelector(".d_key");
// 操作键
const jKey = document.querySelector(".j_key");
const kKey = document.querySelector(".k_key");
const lKey = document.querySelector(".l_key");
const iKey = document.querySelector(".i_key");

const playBloodVolumeDom = document.querySelector(".playBloodVolume");
const experienceDom = document.querySelector(".experience");
const requiredForUpgradeDom = document.querySelector(".requiredForUpgrade");
const rankDom = document.querySelector(".rank");
const shootSpeedDom = document.querySelector(".shootSpeed");
const hurtDom = document.querySelector(".hurt");
// 暂停遮罩DOM
const pause = document.querySelector(".pause");
// 渲染方式文字提示
const rendeMode = document.querySelector(".rendeMode");
// 渲染方式选择框
const switchDom = document.querySelector(".switch");
// 提示框
const noticeDom = document.querySelector(".notice");
// 全局定时器延迟
const allMoveSpeed = 1 / 60 * 1000;
// 是否手动点击过暂停按钮
let isClickStopButton = false;
let isFollowBullet = false;
// 移动速度
let moveSpeed = 4;
let moveSpeedOrginal = moveSpeed;
// 子弹发射间隔
let shootDistance = 9.5;
// 飞机的移动距离
let distance = 2.5;
// 一次性发射子弹的数量
let bulletLength = 1;

// 是否在无敌时间
let isInvincibleTimer = false;
let rende2Canvas = true
// 子弹的宽高度
// const bulletHeight = 20;
// const bulletWidth = 10;
// 技能冷却时间颜色
const defaultCoolingTimeColor = "#ffffff";
// 存放仓库
const typeStore = {}
// ESC键code
const escKeyCode = 27;
// 固定的敌机列表（下表）
let fixedEnemyIndex = 0;
// 玩家飞机基本信息
const playerInfo = {
  offsetLeft: 320,
  offsetTop: 740,
  width: 80,
  height: 60,
  // 血量
  playBloodVolume: 100,
  // 当前经验
  experience: 0,
  // 升级所需经验
  requiredForUpgrade: 100,
  // 等级
  rank: 1,
  // 移动间隔
  shootDistance: 9.5,
  // 发射间隔
  shootSpeed: 160,
  // 跟踪子弹发射间隔
  followingShootSpeed: 750,
  // 子弹发射数量
  bulletLength: 1,
  // 伤害
  hurt: 15,
  hurtOrginal: 15,
  // 无敌时间
  playInvincibleTimer: 500,
  hurtDom,
  rankDom,
  requiredForUpgradeDom,
  experienceDom,
  shootSpeedDom,
  playBloodVolumeDom,
}
const probabilityData = [true, false]
const increaseData = {
  hurt: 0,
  playInvincibleTimer: 0
}
// 射击初始间隔
let shootSpeedOrginal = playerInfo.shootSpeed;

// 容器的信息
const containerInfo = {
  width: 800,
  height: 900,
  offsetLeft: 560,
  offsetTop: 20
}
// 第一波
const wall = [
  "wall1",
  "wall2",
]
const supplyHp = [
  'supplyHp',
]
const supplySpeed = [
  'supplySpeed',
]

const firstEnemy = [
  "planeRightLeft",
  "planeLeftRight",
  "planeRightLeft",
  "planeLeftRight",
  "planeRightLeft",
  "planeLeftRight",
  "planeRightLeft",
  "planeLeftRight",
];

const secondEnemy = [
  "planeLeftRight",
  "planeLeftRight",
  "planeLeftRight",
  "planeLeftRight",
  "planeLeftRight",
  "planeRightLeft",
  "planeRightLeft",
  "planeRightLeft",
  "planeRightLeft",
  "planeRightLeft",
];

const Boss = [
  "planeBoss1",
  "planeLeftRight",
  "planeLeftRight",
  "planeLeftRight",
  "planeLeftRight",
  "planeRightLeft",
  "planeRightLeft",
  "planeRightLeft",
];
// 第二波
// 固定的敌机列表（对应enemyData下标）
const fixedEnemyList = [].concat(wall, firstEnemy, secondEnemy, firstEnemy, supplyHp, Boss, firstEnemy, secondEnemy, firstEnemy, Boss, Boss, wall, firstEnemy, secondEnemy, firstEnemy, firstEnemy, secondEnemy, firstEnemy, Boss, firstEnemy, secondEnemy, firstEnemy, Boss, Boss, supplySpeed, wall, firstEnemy, secondEnemy, firstEnemy, firstEnemy, secondEnemy, firstEnemy, Boss, firstEnemy, secondEnemy, firstEnemy, Boss, Boss, supplySpeed);

// 添加爆炸动图 由于不知道如何实现canvas播放gif所以进行拆分图片
let boomImageArray = []
for(let i = 1; i < 27; i++) {
  const image = new Image();
  image.src = `./image/boom/boom${i}.png`
  boomImageArray.push(image)
}
