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
  const enemyList = [
    {
      health: 100,
      width: 80,
      height: 60,
      distance: 2,
      image: 'enemy-1',
    },
    {
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
            moveDirection: 'left', 
            distance: 3 
          },
          {
            timer: 2000,
            moveDirection: 'button,right',
            distance: 4
          },
          {
            timer: 2000,
            moveDirection: 'top,left',
            distance: 3
          },
          {
            timer: 4000,
            moveDirection: 'right',
            distance: 3
          },
          {
            timer: 6000, 
            moveDirection: 'button', 
            distance: 3 
          },
        ]
      }
    },
    {
      health: 60,
      width: 40,
      height: 30,
      distance: 3,
      image: 'enemy-1',
      enemyMoveFunc() {
        return [
          {
            timer: 2000, 
            moveDirection: 'button', 
            distance: 3
          },
          {
            timer: 6000, 
            moveDirection: '', 
            distance: 3
          },
        ]
      }
    },
    {
      health: 60,
      width: 40,
      height: 30,
      distance: 3,
      image: 'enemy-1',
      enemyMoveFunc() {
        return []
      }
    },
    {
      health: 60,
      width: 40,
      height: 30,
      distance: 3,
      image: 'enemy-1',
      enemyMoveFunc() {
        return []
      }
    },
    {
      health: 60,
      width: 40,
      height: 30,
      distance: 3,
      image: 'enemy-1',
      enemyMoveFunc() {
        return []
      }
    },
    {
      health: 200,
      width: 120,
      height: 90,
      distance: 0.5,
      image: 'enemy-1',
      enemyMoveFunc() {
        return [
          {
            timer: 6000, 
            moveDirection: 'button,left', 
            distance: 0.5
          },
          {
            timer: 6000, 
            moveDirection: 'button,right', 
            distance: 0.2
          },
          {
            timer: 6000, 
            moveDirection: 'top,left', 
            distance: 1
          },
          {
            timer: 12000, 
            moveDirection: 'button,right', 
            distance: 1
          },
        ]
      }
    },
    {
      health: 200,
      width: 120,
      height: 90,
      distance: 0.5,
      image: 'enemy-1',
    }
  ]