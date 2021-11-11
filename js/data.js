// 容器
const container = document.querySelector(".container");
// canvas容器
const canvasContainer = document.querySelector(".canvas");
const ctx = canvasContainer.getContext('2d');
// 玩家贴图
const playerImage = new Image();
playerImage.src = '../image/player.png'
// 子弹贴图
const bulletImage = new Image();
bulletImage.src = '../image/bullet.png'
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
// 全局定时器延迟
const allMoveSpeed = 1 / 60 * 1000;
// 是否手动点击过暂停按钮
let isClickStopButton = false;
let isFollowBullet = false;
// 移动速度
let moveSpeed = 4.5;
let moveSpeedOrginal = moveSpeed;
const planeWidth = 80;
const planeHeight = 60;
// 子弹发射间隔
let shootSpeed = 160;
// 射击初始间隔
const shootSpeedOrginal = shootSpeed;
let shootDistance = 9.5;
// 飞机的移动距离
let distance = 2.5;
// 一次性发射子弹的数量
let bulletLength = 1;
// 玩家血量
let playBloodVolume = 100;
// 玩家无敌时间
let playInvincibleTimer = 500;
// 是否在无敌时间
let isInvincibleTimer = false;
let rende2Canvas = true
// 玩家子弹伤害
let hurt = 15;
let hurtOrginal = hurt;
// 子弹的宽高度
const bulletHeight = 20;
const bulletWidth = 10;
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
  height: 60
}
const containerInfo = {
  width: 800,
  height: 800,
  offsetLeft: 560,
  offsetTop: 20
}
// 第一波
const wall = [
  "wall1",
  "wall2",
]
const supply = [
  'supplyHp',
  'supplySpeed'
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
const fixedEnemyList = [].concat(wall, firstEnemy, secondEnemy, firstEnemy, supply, Boss, firstEnemy, secondEnemy, firstEnemy, Boss, Boss, wall, firstEnemy, secondEnemy, firstEnemy, firstEnemy, secondEnemy, firstEnemy, Boss, firstEnemy, secondEnemy, firstEnemy, Boss, Boss, );
