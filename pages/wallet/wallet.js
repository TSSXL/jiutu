// pages/wallet/wallet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true,
  info:{}
  },
  withDraw(){
 this.setData({
   hidden:false
 })
  },
  cancel(){
    this.setData({
      hidden: true
    })
  },
  confirm(){
    this.setData({
      hidden: true
    })
    wx.navigateTo({
      url: '../../pages/withDraw/withDraw',
    })
  },
  gotoMySy(){
  wx.navigateTo({
    url: '../../pages/mySy/mySy',
  })
  },
  gotoMx(){
  wx.navigateTo({
    url: '../../pages/mx/mx',
  })
  },
 getInfo(){
 let _this=this
 wx.request({
   url: 'https://jznj.nbxuanma.com/api/User/Wallet',
   header:{
     Authorization:wx.getStorageSync('Token')
   },
   success(res){
     _this.setData({
       info:res.data.Result
     })
   }
 })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "我的钱包"
    })
    this.getInfo()
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