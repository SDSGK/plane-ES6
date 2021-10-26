/**
 * health：生命值
 * width：宽度
 * height：高度
 * image：图片名称 使用时自动拼接前置地址
 * enemyMoveFunc：function 返回自动移动的数据
 * timer：ms 执行时间间隔时间
 * moveDirection：移动方向、按下的键位 可以设置多个 , 作为分隔符 将会同时按下
 * distance：一次性移动多少距离
 */
// 敌机数据
const enemyMap = {
  planeLeftRight: {
    health: 100,
    width: 80,
    height: 60,
    distance: 2,
    delayX: 100,
    image: 'enemy-1',
    enemyMoveFunc() {
      return [
        {
          timer: 500,
          moveDirection: 'button',
          distance: 3
        },
        {
          timer: 500,
          moveDirection: 'left,shoot',
          distance: 3
        },
        {
          timer: 2000,
          moveDirection: 'button,right',
          distance: 4
        },
        {
          timer: 3000,
          moveDirection: 'top,left,shoot',
          distance: 3
        },
        {
          timer: 3000,
          moveDirection: 'right',
          distance: 3
        },
        {
          timer: 6000,
          moveDirection: 'button,shoot',
          distance: 3
        },
      ]
    }
  },
  planeRightLeft: {
    health: 100,
    width: 80,
    height: 60,
    distance: 2,
    delayX: 600,
    image: 'enemy-1',
    enemyMoveFunc() {
      return [
        {
          timer: 500,
          moveDirection: 'button',
          distance: 3
        },
        {
          timer: 500,
          moveDirection: 'right,shoot',
          distance: 3
        },
        {
          timer: 2000,
          moveDirection: 'button,left',
          distance: 4
        },
        {
          timer: 3000,
          moveDirection: 'top,right,shoot',
          distance: 3
        },
        {
          timer: 3000,
          moveDirection: 'left',
          distance: 3
        },
        {
          timer: 6000,
          moveDirection: 'button,shoot',
          distance: 3
        },
      ]
    }
  },
  planeBoss1: {
    health: 6000,
    width: 240,
    height: 160,
    distance: 2,
    image: 'enemy-1',
    enemyMoveFunc() {
      return [
        {
          timer: 1500,
          moveDirection: 'button',
          distance: 3
        },
        {
          timer: 1000,
          moveDirection: 'left,shoot',
          distance: 1.5
        },
        {
          timer: 2000,
          moveDirection: 'right,shoot',
          distance: 1.5
        },
        {
          timer: 1000,
          moveDirection: 'left,shoot',
          distance: 2
        },
        {
          timer: 1000,
          moveDirection: 'top',
          distance: 3
        },
        {
          timer: 1000,
          moveDirection: 'left,button,shoot',
          distance: 1.5
        },
        {
          timer: 1000,
          moveDirection: 'right,button,shoot',
          distance: 1.5
        },
        {
          timer: 1000,
          moveDirection: 'left,button',
          distance: 1.5
        },
      ]
    }
  },
}
