// pages/myJj/myJj.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   PageIndex:1,
   PageSize:100,
   list:[]
  },
  changeData: function () {
    this.getMyJj()
  },
  gotoXcXq(e){
    wx.navigateTo({
      url: '../../pages/xcXq/xcXq?id='+e.currentTarget.dataset.id,
    })
  },
  getMyJj(){
    let _this=this
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Community/MyTrip',
      header:{
        Authorization:wx.getStorageSync('Token')
      },
      data:{
        PageIndex:_this.data.PageIndex,
        PageSize:_this.data.PageSize
      },
      success(res){
        if(res.data.Status===40001){
          wx.showToast({
            title: '登录失效',
          })
          wx.navigateTo({
            url: '../../pages/index/index',
          })
        }
        _this.setData({
          list:res.data.Result
        })
      }
    })
  },
  getMyJoin(){
   let _this=this
   wx.request({
     url: 'https://jznj.nbxuanma.com/api/Community/TripsAsParticipant',
     header:{
       Authorization:wx.getStorageSync('Token')
     },
     data:{
       PageIndex:_this.data.PageIndex,
       PageSize:_this.data.PageSize
     },
     success(res){
       if(res.data.Status===40001){
         wx.showToast({
           title: '登录失效',
         })
         wx.navigateTo({
           url: '../../pages/index/index',
         })
       }
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
    let _this=this
    wx.setNavigationBarTitle({
      title: '我的集结令',
    })
    if(options.type==undefined)
    {
      _this.getMyJoin()

    }else{
      _this.getMyJj()
    }
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