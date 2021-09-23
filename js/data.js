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
  const shootSpeedOrginal = 160
  // 子弹的宽高度
  const bulletHeight = 20
  const bulletWidth = 10
  // 技能冷却时间
  const defaultCoolingTimeColor = '#ffffff'
  // 敌机数据
  const enemyList = [
      {
        health: 100,
        moveSpeed: 24,
        width: 80,
        height: 60,
        image: 'enemy-1',
        enemyMoveFunc() {
          return [
            {
              timer: 3000, // ms 执行时间
              moveDirection: 'button,left', // direction 移动方向、按下的键位 可以设置多个 , 作为分隔符 将会同时按下
              speed: 16, // ms 多少秒执行一次移动
              distance: 3 // distance 一次性移动多少距离
            },
            {
              timer: 2000,
              moveDirection: 'top',
              speed: 12,
              distance: 4
            },
            {
              timer: 2000,
              moveDirection: 'left',
              speed: 16,
              distance: 3
            },
            {
              timer: 4000,
              moveDirection: 'right',
              speed: 16,
              distance: 3
            },
          ]
        }
      },
      // {
      //   health: 60,
      //   moveSpeed: 16,
      //   width: 40,
      //   height: 30,
      //   image: 'enemy-1',
      //   enemyMoveFunc() {
      //     return []
      //   }
      // },
      // {
      //   health: 200,
      //   moveSpeed: 500,
      //   width: 120,
      //   height: 90,
      //   image: 'enemy-1',
      //   enemyMoveFunc() {
      //     return []
      //   }
      // }
    ]