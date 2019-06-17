// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  updateAddress(e){
    let str = JSON.stringify(e.currentTarget.dataset.item)
   wx.navigateTo({
     url: '../../pages/updateAddress/updateAddress?item=' + str,
   })
  },
  delAddress(e){
    let _this=this
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Address/Del',
      header:{
        Authorization:wx.getStorageSync('Token')
      },
      data:{
        id: e.target.dataset.id
      },
      success(res){
      if(res.data.Status===1){
        wx.showToast({
          title: '删除成功',
        })
        _this.getCity()
      }
      }
    })
  },
  addAddress(){
  wx.navigateTo({
    url: '../../pages/addAddress/addAddress',
  })
  },
  setDefault(e){
    let _this=this
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Address/SetDefault',
      header:{
        Authorization:wx.getStorageSync('Token')
      },
      data:{
        id:e.target.dataset.id
      },
      success(res){
        if(res.data.Status===1){
          wx.showToast({
            title: '设置成功',
          })
          _this.getCity()
        }
      }
    })
  },
  getCity(){
let _this=this
wx.request({
  url: 'https://jznj.nbxuanma.com/api/Address/GetListByPage',
  header:{
    Authorization:wx.getStorageSync('Token')
  },
  data:{
    pageIndex:1
  },
  success(res){
   _this.setData({
     list:res.data.Result.Data
   })
  }
})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   wx.setNavigationBarTitle({
     title: '我的地址',
   })
   this.getCity()
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