// pages/fbJ/fbJ.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    images:[]
  },
  add(){
    let _this=this
     _this.data.info.Images=_this.data.images.join(",")
  wx.request({
      url: 'https://jznj.nbxuanma.com/api/Community/CreateTrip',
      method:'post',
      header:{
        Authorization:wx.getStorageSync('Token')
      },
      data: _this.data.info,
      success(res){
        wx.showToast({
          title: res.data.Result,
        })
        if (res.data.Status === 1) {
          wx.navigateTo({
            url: '../../pages/success/success',
          })
        }else if(res.data.Status===40001){
          wx.navigateTo({
            url: '../../pages/index/index',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   wx.setNavigationBarTitle({
     title: '发布集结令',
   })
   this.setData({
     info: JSON.parse(options.form),
     images:JSON.parse(options.images)
   })
   console.log(this.data.images)
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