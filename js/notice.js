class Notice {
  constructor() {
    // 队列
    this.noticeQueue = new Queue();
    // 提示dom
    this.noticeDom = noticeDom;
    // 最大index
    this.maxIndex = 1;
    // 超过一定数量进行出栈
    this.autoDequeue = 50;
  }
  // 添加文字提示
  addNotice(notice, options = {}) {
    const defaultOptions = {
      autoAddTimer: true, // 是否默认添加时间
      color: "", // 文字颜色
      className: "", // 样式名称
    };
    Object.assign(defaultOptions, options);
    // 生成唯一id
    const id = "notice" + "-" + guid();
    const noticeQueue = this.noticeQueue;
    const noticeDom = this.noticeDom;
    // 进栈
    noticeQueue.enqueue(
      {
        notice,
        id,
      },
      this.maxIndex++
    );
    // 创建元素
    const noticeChildDom = document.createElement("div");
    noticeChildDom.setAttribute("id", id);
    noticeChildDom.innerText =
      (defaultOptions.autoAddTimer
        ? new Date().toLocaleTimeString("zh-cn", { hour12: false }) + "-"
        : "") + notice;
    noticeChildDom.classList.add("noticeItem");
    if (defaultOptions.color) {
      noticeChildDom.style.color = defaultOptions.color;
    }
    if (defaultOptions.className) {
      noticeChildDom.classList.add(defaultOptions.className);
    }
    // 添加元素
    noticeDom.appendChild(noticeChildDom);
    noticeDom.scrollTop = noticeDom.scrollHeight;
    // 进行出栈释放内存
    if (noticeQueue.size() > this.autoDequeue) {
      const frontElement = noticeQueue.front();
      // 找到子内容
      const noticeItem = noticeDom.querySelector("#" + frontElement.data.id);
      // 进行删除当前记录的内容
      noticeDom.removeChild(noticeItem);
      noticeQueue.dequeue();
    }
  }
  // 同步所有提示
  asyncNotice() {
    const noticeQueue = this.noticeQueue;
    for (const index in noticeQueue) {
      if (Object.hasOwnProperty.call(noticeQueue, index)) {
        const element = noticeQueue[index];
        // TODO：暂无同步所有数据需求
      }
    }
  }
}

const notice = new Notice();
