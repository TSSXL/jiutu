// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:[],
    isShowImg:true,
   PageIndex:1,
   PageSize:10000,
   list:[],
   isShow:true,
   select:0
  },
  sc(e){
    let _this = this
    let flag = "flag[" + e.currentTarget.dataset.index + "]"
    _this.setData({
      [flag]: false
    })
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Home/Collection',
      header: {
        Authorization: wx.getStorageSync('Token')
      },
      data: {
        ID: e.target.dataset.id
      },
      success(res) {
        if (res.data.Status === 1) {
          wx.showToast({
            title: '收藏成功',
          })
        }
      }
    })
  },
  qx(e){
    let _this=this
    let flag= "flag[" + e.currentTarget.dataset.index + "]"
    _this.setData({
      [flag]: true,
    })
      wx.request({
        url: 'https://jznj.nbxuanma.com/api/Home/Collection',
        header: {
          Authorization: wx.getStorageSync('Token')
        },
        data: {
          ID: e.target.dataset.id
        },
        success(res) {
          if (res.data.Status === 1) {
            wx.showToast({
              title: '取消收藏',
            })
          }
        }
      })
  },
  gl(){
    this.setData({
      isShow:!this.data.isShow
    })
   if(this.data.isShow===true){
     this.getCollect()
   }
  },
  gotoInfo(e) {
    wx.navigateTo({
      url: '/pages/goodInfo/goodInfo?id=' + e.target.dataset.id,
    })
  },
 getCollect(){
  let _this=this
  wx.request({
    url: 'https://jznj.nbxuanma.com/api/Home/Collections',
    header:{
      Authorization:wx.getStorageSync('Token')
    },
    data:{
      PageIndex: _this.data.PageIndex,
      PageSize: _this.data.PageSize
    },
    success(res){
      _this.setData({
        list: res.data.Result
      })
    }
  })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "我的收藏"
    })
 this.getCollect()
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