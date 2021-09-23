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

  const pause = document.querySelector('.pause')
  // 全局定时器延迟
  const allMoveSpeed = 16
  // 是否手动点击过暂停按钮
  let isClickStopButton = false
  // TODO：移动速度改变
  let moveSpeed = 10
  // TODO：子弹速度修改
  let shootSpeed = 160
  // TODO：飞机的移动距离
  let distance = 3

  const shootSpeedOrginal = 160
  // 子弹的宽高度
  const bulletHeight = 20
  const bulletWidth = 10
  // 技能冷却时间
  const defaultCoolingTimeColor = '#ffffff'