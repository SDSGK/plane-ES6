
// 初始化画布
function initCanvas() {
  clearCanvas()
  playerImage.onload = () => {
    ctx.drawImage(
      playerImage, 
      playerInfo.offsetLeft, 
      playerInfo.offsetTop, 
      playerInfo.width, 
      playerInfo.height
    )
    ctx.stroke();
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, 800, 800);
}

// 绘制玩家位置
function drawPlayer() {
  ctx.drawImage(
    playerImage, 
    playerInfo.offsetLeft, 
    playerInfo.offsetTop, 
    playerInfo.width, 
    playerInfo.height
  )
  ctx.stroke();
}
// 绘制子弹
function drewBullet() {
  const bulletMap = bulletStore.getStore()
  for (const key in bulletMap) {
    const element = bulletMap[key].target || bulletMap[key];
    ctx.strokeStyle = '#cccccc';
    ctx.fillStyle = ''; 
    ctx.lineWidth = 5; 
    ctx.strokeRect(
      element.positionX - containerInfo.offsetLeft,
      element.positionY - containerInfo.offsetTop,
      5, 10
    )
    ctx.stroke();
  }
}
// 绘制敌机
function drewEnemy() {
  for (const type in typeStore) {
    const store = typeStore[type];
    const storeMap = store.getStore()
    for (const key in storeMap) {
      const element = storeMap[key]
      // 敌机贴图
      ctx.drawImage(
        element.canvasImage, 
        element.positionX, 
        element.positionY, 
        element.width, 
        element.height
      )
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 1; 
      // 血条
      ctx.strokeRect(
        element.positionX,
        element.positionY - 20,
        element.width,
        12
      )
      ctx.fillStyle = '#ff0000'
      ctx.fillRect(
        element.positionX + 1,
        element.positionY - 20 + 1,
        ((element.target.health / element.target.healthOriginal * element.width) - 2) ,
        12 -2
      )
      // 血量文字
      ctx.fillStyle = '#ffffff'
      ctx.textAlign = 'center'
      ctx.fillText(
        element.target.health, 
        element.positionX + element.width / 2, 
        element.positionY - 10
      );
      ctx.stroke();
    }
  }
}
// TODO：飞机摧毁爆炸贴图
function setBoom() {

}
// 总体绘制
function draw() {
  clearCanvas()
  drawPlayer()
  drewBullet()
  drewEnemy()
}

