  /**
   * health：生命值
   * width：宽度
   * height：高度
   * image：图片名称 使用时自动拼接前置地址
   * enemyMoveFunc：function 返回自动移动的数据
   * timer：ms 执行时间间隔时间
   * moveDirection：移动方向、按下的键位 可以设置多个 , 作为分隔符 将会同时按下
   * moveSpeed：ms 多少秒执行一次移动
   * distance：一次性移动多少距离
   */
  // 敌机数据
  const enemyList = [
    {
      health: 100,
      moveSpeed: 24,
      width: 80,
      height: 60,
      distance: 3,
      image: 'enemy-1',
    },
    {
      health: 100,
      moveSpeed: 24,
      width: 80,
      height: 60,
      distance: 3,
      image: 'enemy-1',
      enemyMoveFunc() {
        return [
          {
            timer: 3000, 
            moveDirection: 'left', 
            moveSpeed: 16, 
            distance: 3 
          },
          {
            timer: 2000,
            moveDirection: 'button,right',
            moveSpeed: 12,
            distance: 4
          },
          {
            timer: 2000,
            moveDirection: 'top,left',
            moveSpeed: 16,
            distance: 3
          },
          {
            timer: 4000,
            moveDirection: 'right',
            moveSpeed: 16,
            distance: 3
          },
          {
            timer: 6000, 
            moveDirection: 'button', 
            moveSpeed: 16, 
            distance: 3 
          },
        ]
      }
    },
    {
      health: 60,
      moveSpeed: 16,
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
      moveSpeed: 16,
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
      moveSpeed: 16,
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
      moveSpeed: 16,
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
      moveSpeed: 500,
      width: 120,
      height: 90,
      distance: 3,
      image: 'enemy-1',
      enemyMoveFunc() {
        return [
          {
            timer: 6000, 
            moveDirection: 'button,left', 
            moveSpeed: 120, 
            distance: 3 
          },
          {
            timer: 6000, 
            moveDirection: 'button,right', 
            moveSpeed: 120, 
            distance: 3 
          },
          {
            timer: 6000, 
            moveDirection: 'top,left', 
            moveSpeed: 90, 
            distance: 4 
          },
          {
            timer: 12000, 
            moveDirection: 'button,right', 
            moveSpeed: 60, 
            distance: 5 
          },
        ]
      }
    },
    {
      health: 200,
      moveSpeed: 500,
      width: 120,
      height: 90,
      distance: 3,
      image: 'enemy-1',
    }
  ]