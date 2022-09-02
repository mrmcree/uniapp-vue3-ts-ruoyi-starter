export class Modal {
  // 消息提示
  static msg(content: string) {
    uni.showToast({
      title: content,
      icon: 'none',
    })
  }
  // 错误消息
  static msgError(content: string) {
    uni.showToast({
      title: content,
      icon: 'error',
    })
  }
  // 成功消息
  static msgSuccess(content: string) {
    uni.showToast({
      title: content,
      icon: 'success',
    })
  }
  // 隐藏消息
  static  hideMsg() {
    uni.hideToast()
  }
  // 弹出提示
  static alert(content: string) {
    uni.showModal({
      title: '提示',
      content,
      showCancel: false,
    })
  }
  // 确认窗体
  static confirm(content: string) {
    return new Promise((resolve) => {
      uni.showModal({
        title: '系统提示',
        content,
        cancelText: '取消',
        confirmText: '确定',
        success(res) {
          if (res.confirm) {
            resolve(res.confirm)
          }
        },
      })
    })
  }
  // 提示信息
  static showToast(option: string) {
    if (typeof option === 'object') {
      uni.showToast(option)
    } else {
      uni.showToast({
        title: option,
        icon: 'none',
        duration: 2500,
      })
    }
  }
  // 打开遮罩层
  static loading(content: string) {
    uni.showLoading({
      title: content,
    })
  }
  // 关闭遮罩层
  static closeLoading() {
    uni.hideLoading()
  }
}
