
//获取应用实例
const app = getApp()

Page({
  data: {
    modalHidden:false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    num: '',
    psd: '',
    isChecked: false,
  },
  confirm(){
   if(this.data.hasUserInfo===true){
     this.setData({
       modalHidden:true
     })
   }else{
     wx.showModal({
       title: '提示',
       content: '请先获取您的头像昵称进行授权',
     })
   }
  },
  cancle(){
   wx.switchTab({
     url: '../../pages/home/home',
   })
  },
  getYzm() {
    let _this = this
    if (_this.data.num == '') {
      wx.showModal({
        title: '提示',
        content: '请先输入手机号',
      })
    } else {
      wx.request({
        url: 'https://jznj.nbxuanma.com/api/VerifyCode/Send',
        data: {
          phone: _this.data.num,
          type:1
        },
        success(res) {
          wx.showToast({
            title: res.data.Result,
          })
        }
      })
    }
  },
  a() {
    this.setData({
      isChecked: !this.data.isChecked
    })
  },
  //事件处理函数
  // bindViewTap: function () {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  inputNum(e) {
    this.setData({
      num: e.detail.value
    })
  },
  inputPsd(e) {
    this.setData({
      psd: e.detail.value
    })
  },
  login() {
    if (this.data.isChecked === true) {
      if (this.data.num === '' || this.data.psd === '') {
        wx.showToast({
          title: '信息不完整',
          image: '../../image/c.svg'
        })
      } else {
        wx.request({
          url: 'https://jznj.nbxuanma.com/api/User/Register',
          method: 'post',
          data: {
            "Phone": this.data.num,
            "Code": this.data.psd,
            "Lng": 0,
            "Lat": 0,
            "ID": "string"
          },
          success(res) {

            if (res.data.Result !== '验证码错误' && res.data !== "") {
              wx.setStorageSync('Token', res.data.Result)
              wx.showModal({
                title: '登录成功',
                content: '',
                success(res) {
                  if (res.confirm) {
                    wx.login({
                      success(res) {
                        wx.request({
                          url: 'https://jznj.nbxuanma.com/api/Home/GetOpenID',
                          data: {
                            Code: res.code
                          },
                          header: {
                            Authorization: wx.getStorageSync('Token')
                          },
                          success(res) {
                            // console.log(res.data.Result)
                            wx.setStorageSync('openid', res.data.Result.openid)
                          }
                        })
                      }
                    })
                    wx.switchTab({
                      url: '/pages/home/home',
                    })
                  }

                }
              })
            } else if (res.data === "") {
              wx.showModal({
                title: '登录失败',
                content: '',
              })
            }
            else {
              wx.showModal({
                title: '验证码验证错误',
                content: '',
              })
            }
          }
        })
      }
    } else {
      wx.showToast({
        title: '请先同意',
      })
    }
  },
  onLoad: function () {
    wx.getLocation({
      success: function (res) {
        wx.request({
          url: 'https://jznj.nbxuanma.com/api/Community/Position',
          data: {
            lng: res.longitude,
            lat: res.latitude
          },
          success(res) {
            if (res.data.Status === 1) {
              wx.setStorageSync('city', res.data.Result)
            }
          }
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log(this.data.userInfo)
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
