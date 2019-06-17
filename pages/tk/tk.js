// pages/tk/tk.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
 PageIndex:1,
 PageSize:10,
 list:[]
  },
  lxSales(){
    wx.navigateTo({
      url: '../../pages/conversation/list',
    })
  },
  gotoTkXq(e){
   wx.navigateTo({
     url: '../../pages/tkXq/tkXq?item='+JSON.stringify(e.currentTarget.dataset.item),
   })
  },
  getList(){
  let _this=this
  wx.request({
    url: 'https://jznj.nbxuanma.com/api/Home/RefundOrderList',
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
    title: '退款/售后',
  })
  this.getList()
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