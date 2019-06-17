// pages/confirm/confirm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    RealName:'',
    IDCardNo:'',
    bgColorOne:'',
    color:'#86C166',
    bgColorTwo:'#86C166',
    colorTwo:'white'
  },
  takePh(){
  wx.navigateTo({
    url: '../../pages/real/real',
  })
  },
  getName(e){
    this.setData({
      RealName:e.detail.value
    })
  },
  getID(e){
    this.setData({
      IDCardNo: e.detail.value
    })
  },
  confirm(){
   let _this=this
   if(_this.data.RealName=='' || _this.data.IDCardNo==''){
     wx.showToast({
       title: '信息不完整',
     })
   }else{
     wx.request({
       url: 'https://jznj.nbxuanma.com/api/User/ConfirmIdentity',
       header: {
         Authorization: wx.getStorageSync('Token')
       },
       data: {
         RealName: _this.data.RealName,
         IDCardNo: _this.data.IDCardNo
       },
       success(res) {
         wx.showModal({
           title: '提示',
           content: res.data.Result,
         })
       }
     })
   }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  wx.setNavigationBarTitle({
    title: '确认信息',
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