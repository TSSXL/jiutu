// pages/gl/gl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startCity: ['浙江省', '宁波市', '鄞州区'],
    images:[]
  },
  choseStartCity(e) {
    this.setData({
      startCity: e.detail.value
    })
  },
  formSubmit(e) {
    let _this = this
    if (_this.data.images.length === 0) {
      e.detail.value.Images = "dsdas"
    } else {
      e.detail.value.Images = _this.data.images.join(",")
    }
    e.detail.value.City = e.detail.value.City[1]
    if (e.detail.value.Title == '' || e.detail.value.Content==''){
      wx.showToast({
        title: '请输入完整信息',
      })
    } else if (e.detail.value.Images =="dsdas"){
      wx.showToast({
        title: '请上传图片',
      })
    }
      else{
      wx.request({
        url: 'https://jznj.nbxuanma.com/api/Community/CreateStrategy',
        method: 'post',
        header: {
          Authorization: wx.getStorageSync('Token')
        },
        data: JSON.stringify(e.detail.value) ,
        success(res) {
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
    }
  },
  uploadImg() {
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
            'type': '3'
          },
          header: {
            'Authorization': wx.getStorageSync('Token'),
            'Content-Type': "multipart/form-data"
          },
          success: function (res) {
            _this.setData({
              images: _this.data.images.concat(JSON.parse(res.data).Result)
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
     title: '发布攻略',
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