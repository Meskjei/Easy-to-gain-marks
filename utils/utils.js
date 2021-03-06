// 改变时间格式
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// 改变数字格式
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 1000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 带标题的消息提示
var showModel = (title, content) => {
  wx.hideToast();
  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false,
    confirmText: "确定"
  })
}

// 带“确认”及”取消“的消息提示
var showMessage = content => {
  wx.hideToast();
  wx.showModal({
    content: JSON.stringify(content),
    showCancel: true,
    confirmText: "确定"
  })
}


module.exports = { formatTime, showBusy, showSuccess, showModel, showMessage }
