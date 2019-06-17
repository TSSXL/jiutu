import { hexMD5 } from '../../utils/md5.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    oneFocus:true,
    twoFocus:false,
    threeFocus:false,
    fourFocus:false,
    fiveFocus:false,
    sixFocus:false,
    isShow:false,
    isNoForget:true,
    text:'',
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    six: '',
    psd: '',
    yzm:'',
    Money:'',
    Account:'',
    Name:''
  },
  showDialog(e){
    let  re = /^[0-9]+.?[0-9]*$/;
    if (e.detail.value.Account == "" || e.detail.value.Name == "" || e.detail.value.Money=="" )
    {
      wx.showToast({
        title: '请输完整',
      })
    } else if (re.test(e.detail.value.Money) != true){
      wx.showToast({
        title: '金额为数字',
      })
    }
    else{
      this.setData({
        isShow: true,
        isNoForget: true,
        Money: e.detail.value.Money,
        Account: e.detail.value.Account,
        Name: e.detail.value.Name,
        oneFocus: true,
        twoFocus: false,
        threeFocus: false,
        fourFocus: false,
        fiveFocus: false,
        sixFocus: false
      })
    }
  },
  showForget(){
 this.setData({
   isNoForget:false
 })
  },
  confirm(){
    let _this=this
    _this.setData({
      psd: (_this.data.one + _this.data.two + _this.data.three + _this.data.four + _this.data.five + _this.data.six)
    })
    if(_this.data.isNoForget==true){
        if(_this.data.psd.length==6){
    _this.setData({
      psd: hexMD5(_this.data.one + _this.data.two + _this.data.three + _this.data.four + _this.data.five + _this.data.six)
    })
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/User/Withdraw',
      header:{
        Authorization:wx.getStorageSync('Token')
      },
      data:{
        Money:_this.data.Money,
        Account:_this.data.Account,
        Name:_this.data.Name,
        PayPassword:_this.data.psd
      },
      success(res){
        _this.setData({
          isShow:false
        })
        if(res.data.Status===1){
       wx.navigateTo({
         url: '../../pages/withDrawSuccess/withDrawSuccess',
       })
        }else{
          wx.showModal({
            title: '抱歉',
            content: res.data.Result,
          })
        }
      }
    })
  }else{
   wx.showToast({
     title: '密码不完整',
   })
  }
    }else{
    if(_this.data.yzm=="" || _this.data.psd.length<6 ){
      wx.showToast({
        title: '信息不完整',
      })
    }else{
      _this.setData({
        psd: hexMD5(_this.data.one + _this.data.two + _this.data.three + _this.data.four + _this.data.five + _this.data.six)
      })
      wx.request({
        url: 'https://jznj.nbxuanma.com/api/User/Withdraw',
        header: {
          Authorization: wx.getStorageSync('Token')
        },
        data: {
          Money: _this.data.Money,
          Account: _this.data.Account,
          Name: _this.data.Name,
          PayPassword: _this.data.psd
        },
        success(res) {
          _this.setData({
            isShow: false
          })
          if (res.data.Status === 1) {
            wx.navigateTo({
              url: '../../pages/withDrawSuccess/withDrawSuccess',
            })
          } else {
            wx.showModal({
              title: '抱歉',
              content: res.data.Result,
            })
          }
        }
      })
    }
    }
  

  },
  close(){
  this.setData({
    isShow:false,
  })
  },
  getYzm() {
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/User/SendCode',
      header: {
        Authorization: wx.getStorageSync('Token')
      },
      success(res) {
        if (res.data.Status === 1) {
          wx.showToast({
            title: '发送成功',
          })
        }
      }
    })
  },
  gety(e) {
    this.setData({
      yzm: e.detail.value
    })
  },
  getOne(e) {
    if (e.detail.value == '') {
      this.setData({
        oneFocus: true
      })
    }else{
      this.setData({
        one: e.detail.value,
        twoFocus: true
      })
    }
  },
  getTwo(e) {
    if (e.detail.value==''){
     this.setData({
       twoFocus:true
     })
    }else{
      this.setData({
        two: e.detail.value,
        threeFocus: true
      })
    }
  },
  getThree(e) {
    if (e.detail.value == '') {
      this.setData({
        threeFocus: true
      })
    }else{
      this.setData({
        three: e.detail.value,
        fourFocus: true
      })
    }
  },
  getFour(e) {
    if (e.detail.value == '') {
      this.setData({
        fourFocus: true
      })
    }else{
      this.setData({
        four: e.detail.value,
        fiveFocus: true
      })
    }
  },
  getFive(e) {
    if (e.detail.value == '') {
      this.setData({
        fiveFocus: true
      })
    } else{
      this.setData({
        five: e.detail.value,
        sixFocus: true
      })
    }
  },
  getSix(e) {
    this.setData({
      six: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  wx.setNavigationBarTitle({
    title: '提现',
  })
  let _this=this
  wx.request({
    url: 'https://jznj.nbxuanma.com/api/User/WithdrawPayRate',
    success(res){
      if(res.data.Status===1){
        _this.setData({
          text:res.data.Result
        })
      }
    }
  })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})