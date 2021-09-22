 //用于生成uuid
function S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function guid() {
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
// 随机取数字
function random(min,max) {
  const num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function interval(call, dealy = allMoveSpeed) {
  return setInterval(() => {
    call()
  }, dealy)
}
// 设置伪类元素 对应技能冷却提示
function setCoolingTime(parentDom, timer, color = defaultCoolingTimeColor) {
  parentDom.classList.add('coolingTime')
  // 随机生成唯一ID 进行样式添加记录
  const selectorText = 'coolingTimeRando-' + guid()
  parentDom.classList.add(selectorText)
  const styleSheets = document.styleSheets[0]
  // 更改伪类元素
  styleSheets.insertRule(`.${selectorText}::before {
    background-color: ${color} !important;
    transition: width ${timer}s ease-out !important;
  }`, 0); // 支持非IE的现代浏览器
  setTimeout(() => {
    styleSheets.insertRule(`.${selectorText}::before {
      width: 0% !important;
    }`, 0); 
  }, 16);
  // 返回生成的唯一ID
  return selectorText
}