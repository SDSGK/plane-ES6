// 原文链接：https://blog.csdn.net/weixin_45615791/article/details/103704267
class Queue {
  constructor() {
    //初始化
    this.queueList = [];
    this.maxPriority = 0;
    this.minPriority = 0
  }
  // 添加队列
  enqueue(element, priority) {
    const data = this.queElement(element, priority);
    const queueList = this.queueList;
    let flg = false; // 创建一个变量，如果判断没有进去的话，则在最后添加
    if(data.priority <= this.maxPriority) {
      // 如果是最小的直接添加
      if (data.priority <= this.minPriority) {
        queueList.splice(i, 0, data);
        flg = true;
      } else {
        // 中间则进行循环判断
        for (let i = 0; i < queueList.length; i++) {
          if (data.priority < queueList[i].priority) {
            // 判断优先级，如果新加的优先级小于原本的优先级，则用splice的方法添加
            this.maxPriority = Math.max(this.maxPriority, data.priority)
            this.minPriority = Math.min(this.minPriority, data.priority)
            queueList.splice(i, 0, data);
            flg = true;
            break; //跳出循环，防止多余的添加，或则性能浪费
          }
        }
      }
    }
    if (!flg) {
      this.maxPriority = Math.max(this.maxPriority, data.priority)
      //如果上面循环没有添加，则最后添加
      queueList.push(data);
    }
  }
  // 创建队列元素
  queElement(data, priority) {
    return {
      data,
      priority,
    };
  }
  //删除
  dequeue() {
    this.queueList.shift();
  }
  //查看顶端元素
  front() {
    return this.queueList[0];
  }
  //是否为空
  isEmpty() {
    return this.queueList.length === 0;
  }
  //长度
  size() {
    return this.queueList.length;
  }
  //转为string
  tostring() {
    let res = "";
    const queueList = this.queueList;
    for (let i in queueList) {
      res += queueList[i] + " ";
    }
    return res;
  }
}
