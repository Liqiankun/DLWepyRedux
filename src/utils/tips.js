/**
 * 提示与加载工具类
 */
export default class Tips {
  constructor () {
    this.isLoading = false
    this.pause = false
  }

  static success (title, duration = 500) {
    wx.showToast({
      title: title,
      icon: 'success',
      mask: true,
      duration: duration
    })
    if (duration > 0) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, duration)
      })
    }
  }

  static modal (text, title = '提示') {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: text,
        showCancel: false,
        success: res => {
          resolve(res)
        },
        fail: res => {
          reject(res)
        }
      })
    })
  }

  static confirm (text, callBack, payload = {}, title = '提示') {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: text,
        showCancel: true,
        success: res => {
          if (res.confirm) {
            resolve(payload)
          } else if (res.cancel) {
            reject(payload)
          }
          callBack && callBack(res.confirm)
        },
        fail: res => {
          reject(payload)
        }
      })
    })
  }

  static toast (title, onHide, icon = 'success') {
    wx.showToast({
      title: title,
      icon: 'info',
      mask: true,
      duration: 500
    })
    if (onHide) {
      setTimeout(() => {
        onHide()
      }, 500)
    }
  }

  static alert (title, image) {
    wx.showToast({
      title: title,
      image: image,
      mask: true,
      duration: 500
    })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 500)
    })
  }

  static error (title, onHide) {
    wx.showToast({
      title: title,
      image: '/images/error.png',
      mask: true,
      duration: 1000
    })
    if (onHide) {
      setTimeout(() => {
        onHide()
      }, 500)
    }
  }

  static loading (title = '加载中') {
    if (Tips.isLoading) {
      return
    }
    Tips.isLoading = true
    if (wx.showLoading) {
      wx.showLoading({
        title: title,
        mask: true
      })
    }
  }

  static navLoading () {
    if (Tips.isLoading) {
      return
    }
    Tips.isLoading = true
    wx.showNavigationBarLoading()
  }

  static loaded () {
    if (Tips.isLoading) {
      Tips.isLoading = false
      if (wx.hideLoading) {
        wx.hideLoading()
        wx.hideNavigationBarLoading()
      }
    }
  }

  static action (...items) {
    return new Promise((resolve, reject) => {
      wx.showActionSheet({
        itemList: items,
        itemColor: '#A53334',
        success: function (res) {
          const result = {
            index: res.tapIndex,
            text: items[res.tapIndex]
          }
          resolve(result)
        },
        fail: function (res) {
          reject(res.errMsg)
        }
      })
    })
  }

  static actionWithFunc (items, color, ...functions) {
    wx.showActionSheet({
      itemList: items,
      itemColor: color,
      success: function (res) {
        const index = res.tapIndex
        if (index >= 0 && index < functions.length) {
          functions[index]()
        }
      }
    })
  }

  static share (title, url, desc) {
    return {
      title: title,
      path: url,
      desc: desc,
      success: function (res) {
        Tips.toast('分享成功')
      }
    }
  }

  static setLoading () {
    Tips.isLoading = true
  }
}

Tips.isLoading = false
