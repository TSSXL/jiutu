// pages/wl/wl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   OrderID:'',
   info:{}
  },
   getInfo(){
  let _this=this
  wx.request({
    url: 'https://jznj.nbxuanma.com/api/Home/TrackPack',
    header:{
      Authorization:wx.getStorageSync('Token')
    },
    data:{
      OrderID:_this.data.OrderID
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
     title: '物流跟踪',
   })
   this.setData({
     OrderID: options.OrderID
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