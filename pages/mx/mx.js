// pages/mx/mx.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PageIndex:1,
    PageSize:10,
     list:[
       { name: "米其林轮胎(收入)", time:"2017-10-11 12：01 ",money:"+588"},
       { name: "米其林轮胎(收入)", time: "2017-10-11 12：01 ", money: "+588" },
       { name: "米其林轮胎(支出)", time: "2017-10-11 12：01 ", money: "-588" },
       { name: "米其林轮胎(收入)", time: "2017-10-11 12：01 ", money: "+588" }
     ]
  },
   getWalletDetail(){
    let _this=this
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/User/WalletDetail',
      header:{
        Authorization:wx.getStorageSync('Token')
      },
      data:{
        PageIndex: _this.data.PageIndex,
        PageSize: _this.data.PageSize
      },
      success(res){
    _this.setData({
      list:res.data.Result
    })
      }
    })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   wx.setNavigationBarTitle({
     title: '收支明细',
   })
   this.getWalletDetail()
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