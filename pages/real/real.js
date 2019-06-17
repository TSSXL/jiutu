// pages/real/real.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    srcOne:"../../image/id_card_positive@3x.png",
    srcTwo:"../../image/id_card_back@3x.png",
  },
  confirm(){
    if (this.data.srcOne == "../../image/id_card_positive@3x.png" || this.data.srcTwo == "../../image/id_card_back@3x.png"){
      wx.showToast({
        title: '请先上传',
      })
    }else{
      wx.navigateTo({
        url: '../../pages/confirm/confirm',
      })
    }

  },
  showOne() {
    let _this=this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://jznj.nbxuanma.com/api/C_Tool/FileUploader',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'type': '0'
          },
          header: {
            'Authorization': wx.getStorageSync('Token'),
            'Content-Type': "multipart/form-data"
          },
          success: function (res) {
           _this.setData({
             srcOne: 'http://jznj.nbxuanma.com/'+ JSON.parse(res.data).Result[0],
           })
          }
        })
      }
    })
  },
  showTwo() {
    let _this = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://jznj.nbxuanma.com/api/C_Tool/FileUploader',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'type': '0'
          },
          header: {
            'Authorization': wx.getStorageSync('Token'),
            'Content-Type': "multipart/form-data"
          },
          success: function (res) {
            _this.setData({
              srcTwo: 'http://jznj.nbxuanma.com/'+ JSON.parse(res.data).Result[0],
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  wx.setNavigationBarTitle({
    title: '实名认证',
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