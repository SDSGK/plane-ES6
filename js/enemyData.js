/**
 * health：生命值
 * width：宽度
 * height：高度
 * image：图片名称 使用时自动拼接前置地址
 * enemyMoveFunc：function 返回自动移动的数据
 * timer：ms 执行时间间隔时间
 * moveDirection：移动方向、按下的键位 可以设置多个 , 作为分隔符 将会同时按下
 * distance：一次性移动多少距离
 * isHideHealth：是否不显示血量
 */
// 敌机贴图
const enemyImage_1 = new Image();
enemyImage_1.src = '../image/enemy-1.png'
// 掩体贴图
const wallImage_1 = new Image();
wallImage_1.src = '../image/store-1.png'
const wallImage_2 = new Image();
wallImage_2.src = '../image/store-2.png'
// 补给贴图
const supplyImage_1 = new Image();
supplyImage_1.src = '../image/supply-1.png'
const supplyImage_2 = new Image();
supplyImage_2.src = '../image/supply-2.png'
// 爆炸贴图
const boom = new Image();
boom.src = '../image/boom.gif'
// 敌机数据
const enemyMap = {
  planeLeftRight: {
    type: "enemy",
    health: 100,
    width: 80,
    height: 60,
    distance: 2,
    delayX: 100,
    image: "enemy-1",
    canvasImage: enemyImage_1,
    enemyMoveFunc() {
      return [
        {
          timer: 500,
          moveDirection: "button",
          distance: 3,
        },
        {
          timer: 500,
          moveDirection: "left,shoot",
          distance: 3,
        },
        {
          timer: 2000,
          moveDirection: "button,right",
          distance: 4,
        },
        {
          timer: 3000,
          moveDirection: "top,left,shoot",
          distance: 3,
        },
        {
          timer: 3000,
          moveDirection: "right",
          distance: 3,
        },
        {
          timer: 6000,
          moveDirection: "button,shoot",
          distance: 3,
        },
      ];
    },
  },
  planeRightLeft: {
    type: "enemy",
    health: 100,
    width: 80,
    height: 60,
    distance: 2,
    delayX: 600,
    image: "enemy-1",
    canvasImage: enemyImage_1,
    enemyMoveFunc() {
      return [
        {
          timer: 500,
          moveDirection: "button",
          distance: 3,
        },
        {
          timer: 500,
          moveDirection: "right,shoot",
          distance: 3,
        },
        {
          timer: 2000,
          moveDirection: "button,left",
          distance: 4,
        },
        {
          timer: 3000,
          moveDirection: "top,right,shoot",
          distance: 3,
        },
        {
          timer: 3000,
          moveDirection: "left",
          distance: 3,
        },
        {
          timer: 6000,
          moveDirection: "button,shoot",
          distance: 3,
        },
      ];
    },
  },
  planeBoss1: {
    type: "enemy",
    health: 6000,
    width: 240,
    height: 160,
    distance: 2,
    image: "enemy-1",
    canvasImage: enemyImage_1,
    enemyMoveFunc() {
      return [
        {
          timer: 1500,
          moveDirection: "button",
          distance: 1.5,
        },
        {
          timer: 1000,
          moveDirection: "left,shoot",
          distance: 1.5,
        },
        {
          timer: 2000,
          moveDirection: "right,shoot",
          distance: 1.5,
        },
        {
          timer: 1000,
          moveDirection: "left,shoot",
          distance: 2,
        },
        {
          timer: 1000,
          moveDirection: "top",
          distance: 3,
        },
        {
          timer: 1000,
          moveDirection: "left,button,shoot",
          distance: 1.5,
        },
        {
          timer: 1000,
          moveDirection: "right,button,shoot",
          distance: 1.5,
        },
        {
          timer: 1000,
          moveDirection: "left,button",
          distance: 1.5,
        },
        {
          timer: 3000,
          moveDirection: "shoot,top",
          distance: 1.5,
        },
      ];
    },
  },
};
// 墙数据
const wallData = {
  wall1: {
    health: 100000000000,
    type: "wall",
    width: 160,
    height: 140,
    distance: 2,
    delayX: 100,
    isHideHealth: true,
    image: "store-1",
    canvasImage: wallImage_1,
    enemyMoveFunc() {
      return [
        {
          timer: 2000,
          moveDirection: "button",
          distance: 2.5,
        },
        {
          timer: 60000,
          moveDirection: "",
          distance: 3,
        },
      ];
    },
  },
  wall2: {
    health: 100000000000,
    type: "wall",
    width: 160,
    height: 140,
    distance: 0.5,
    delayX: 500,
    isHideHealth: true,
    image: "store-2",
    canvasImage: wallImage_1,
    enemyMoveFunc() {
      return [
        {
          timer: 2000,
          moveDirection: "button",
          distance: 2.5,
        },
        {
          timer: 60000,
          moveDirection: "",
          distance: 3,
        },
      ];
    },
  },
}
// 补给数据
const supplyData = {
  supplyHp: {
    health: 50,
    type: "supply",
    width: 50,
    height: 50,
    distance: 2,
    delayX: 100,
    isHideHealth: true,
    image: "supply-1",
    canvasImage: supplyImage_1,
    enemyMoveFunc() {
      return [
        {
          timer: 2000,
          moveDirection: "button",
          distance: 2.5,
        },
        {
          timer: 2000,
          moveDirection: "left",
          distance: 3,
        },
        {
          timer: 4000,
          moveDirection: "right",
          distance: 3,
        },
        {
          timer: 4000,
          moveDirection: "left",
          distance: 3,
        },
        {
          timer: 4000,
          moveDirection: "right,button",
          distance: 3,
        },
      ];
    },
  },
  supplySpeed: {
    health: 50,
    type: "supply",
    width: 50,
    height: 50,
    distance: 2,
    delayX: 600,
    isHideHealth: true,
    image: "supply-2",
    canvasImage: supplyImage_1,
    enemyMoveFunc() {
      return [
        {
          timer: 2000,
          moveDirection: "button",
          distance: 2.5,
        },
        {
          timer: 2000,
          moveDirection: "left",
          distance: 3,
        },
        {
          timer: 4000,
          moveDirection: "right",
          distance: 3,
        },
        {
          timer: 4000,
          moveDirection: "left",
          distance: 3,
        },
        {
          timer: 4000,
          moveDirection: "right,button",
          distance: 3,
        },
      ];
    },
  }
}
Object.assign(enemyMap, wallData, supplyData)
