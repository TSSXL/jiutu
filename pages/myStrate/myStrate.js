// pages/myStrate/myStrate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PageIndex:1,
    PageSize:100,
   zbInfo:[]
  },
  changeData: function () {
    this.getMyStrate()
  },
  gotoCommuXq(e) {
    wx.navigateTo({
      url: '../../pages/commuXq/commuXq?id=' + e.currentTarget.dataset.id+'&type=0',
    })
  },
getMyStrate(){
  let _this = this
  wx.request({
    url: 'https://jznj.nbxuanma.com/api/Community/MyStrategys',
    header:{
      Authorization:wx.getStorageSync('Token')
    },
    data: {
      PageIndex: _this.data.PageIndex,
      PageSize: _this.data.PageSize
    },
    success(res) {
      if (res.data.Status === 1) {
        _this.setData({
          zbInfo: res.data.Result
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
      title: '我的攻略',
    })
this.getMyStrate()
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
    this.onLoad()
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