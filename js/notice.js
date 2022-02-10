class Notice {
  constructor() {
    // 队列
    this.noticeQueue = new Queue();
    // 提示dom
    this.noticeDom = noticeDom;
    // 最大index
    this.maxIndex = 1;
    // 提示元素
    this.noticeDom = noticeDom;
  }
  // 添加文字提示
  addNotice(notice, autoAddTimer = true) {
    const id = "notice" + "-" + guid();
    this.noticeQueue.enqueue(
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
      (autoAddTimer
        ? new Date().toLocaleTimeString("zh-cn", { hour12: false }) + "-"
        : "") + notice;
    noticeChildDom.classList.add("noticeItem");
    // 添加元素
    this.noticeDom.appendChild(noticeChildDom);
    this.noticeDom.scrollTop = this.noticeDom.scrollHeight;
  }
  // 同步所有提示
  asyncNotice() {
    const noticeQueue = this.noticeQueue;
    for (const index in noticeQueue) {
      if (Object.hasOwnProperty.call(noticeQueue, index)) {
        const element = noticeQueue[index];
        // TODO
      }
    }
  }
}

const notice = new Notice();
