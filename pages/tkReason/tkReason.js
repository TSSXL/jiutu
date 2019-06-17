// pages/tkReason/tkReason.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chose:'请选择',
    name:'',
    productid:'',
    image:'',
    size:'',
    images: [],
    array: ['拍错/多拍/不想要', '缺货', '未按约定时间发货', '协商一致退款','其他'],
    index:0
  },
  formSubmit(e){
    let _this = this
    console.log(_this.data.productid)
    if (_this.data.images.length === 0) {
      wx.showModal({
        title: '提示',
        content: '请上传凭证',
      })
    } else if (e.detail.value.Money === ''){
    wx.showToast({
      title: '请填写金额',
    })
    } else {
      e.detail.value.ExplainImage = _this.data.images.join(",")
      e.detail.value.ID=_this.data.productid
      wx.request({
        url: 'https://jznj.nbxuanma.com/api/Home/ApplyForRefund',
        method: 'post',
        header: {
          Authorization: wx.getStorageSync('Token')
        },
        data: JSON.stringify(e.detail.value),
        success(res) {
          wx.showToast({
            title: res.data.Result,
          })
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
            'type': '5'
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
  bindPickerChange(e) {
    this.setData({
      chose:'',
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  wx.setNavigationBarTitle({
    title: '退款原因',
  })
  this.setData({
    image:options.image,
    size:options.size,
    name:options.name,
    productid: options.ProductID
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