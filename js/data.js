// 容器
const container = document.querySelector('.container')
// 容器的偏移量
const delayX = container.offsetLeft
const delayY = container.offsetTop
const containerHeight = container.offsetHeight
const containerWidth = container.offsetWidth
// 飞机
const planeDom = document.querySelector('.plane')
// 移动键
const wKey = document.querySelector('.w_key')
const aKey = document.querySelector('.a_key')
const sKey = document.querySelector('.s_key')
const dKey = document.querySelector('.d_key')
// 操作键
const jKey = document.querySelector('.j_key')
const kKey = document.querySelector('.k_key')
const lKey = document.querySelector('.l_key')
const iKey = document.querySelector('.i_key')

const playBloodVolumeDom = document.querySelector('.playBloodVolume')
const experienceDom = document.querySelector('.experience')
const requiredForUpgradeDom = document.querySelector('.requiredForUpgrade')
const rankDom = document.querySelector('.rank')
const shootSpeedDom = document.querySelector('.shootSpeed')
const hurtDom = document.querySelector('.hurt')

const pause = document.querySelector('.pause')
// 全局定时器延迟
const allMoveSpeed = 16
// 是否手动点击过暂停按钮
let isClickStopButton = false
let isFollowBullet = false
// TODO：移动速度改变
let moveSpeed = 6
// TODO：子弹速度修改
let shootSpeed = 160
// TODO：飞机的移动距离
let distance = 3
// 玩家血量
let playBloodVolume = 100
// 玩家无敌时间
let playInvincibleTimer = 500
// 是否在无敌时间
let isInvincibleTimer = false
// 射击初始间隔
const shootSpeedOrginal = 160
// 玩家子弹伤害
let hurt = 15
// 子弹的宽高度
const bulletHeight = 20
const bulletWidth = 10
// 技能冷却时间颜色
const defaultCoolingTimeColor = '#ffffff'
// ESC键code
const escKeyCode = 27
// 固定的敌机列表（下表）
let fixedEnemyIndex = 0
// 第一波
const firstEnemy = [
  'wall1', 
  'wall2', 
  'planeRightLeft', 'planeLeftRight', 'planeRightLeft', 'planeLeftRight', 'planeRightLeft', 'planeLeftRight', 'planeRightLeft',
  'planeLeftRight',]

const Boss = [
  'planeBoss1',
  'planeBoss1',
  'planeBoss1',
  'planeBoss1',
  'planeBoss1',
  'planeBoss1',
  'planeBoss1',
  'planeBoss1',
]
// 第二波
// 固定的敌机列表（对应enemyData下标）
const fixedEnemyList = [].concat(firstEnemy)
