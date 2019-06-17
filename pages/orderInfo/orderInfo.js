// pages/orderInfo/orderInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
 info:{}
  },
  gotoTk(e){
    if (e.currentTarget.dataset.productid===undefined){
      console.log(e.currentTarget.dataset.productid)
      wx.showToast({
        title: '无法退款',
      })
    }else{
      wx.navigateTo({
        url: '../../pages/tkReason/tkReason?image=' + e.currentTarget.dataset.image + '&size=' + e.currentTarget.dataset.size + '&name=' + e.currentTarget.dataset.name + '&ProductID=' + e.currentTarget.dataset.productid
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this
 wx.setNavigationBarTitle({
   title: '订单详情',
 })

 wx.request({
   url: 'https://jznj.nbxuanma.com/api/Home/OrderDetail',
   header:{
     Authorization:wx.getStorageSync('Token')
   },
   data:{
     OrderID:options.id
   },
   success(res){
     _this.setData({
       info:res.data.Result
     })
     console.log(_this.data.info)
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