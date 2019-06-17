// pages/jl/jl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    images: [],
    startCity: ['浙江省', '宁波市', '鄞州区'],
    endCity: ['浙江省', '温州市', '瓯海区'],
    startTime: '2019-05-15',
    endTime: '2019-08-15'
  }, 
  showNum(e){
    this.setData({
      num: e.detail.value.length
    })
  },
  uploadImg(){
    let _this=this
    wx.chooseImage({
      count:1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://jznj.nbxuanma.com/api/C_Tool/FileUploader',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
           'type':'3'
          },
        header:{
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
  formSubmit(e) {
    let _this=this
    let phone = /^1(3|4|5|7|8)\d{9}$/
    e.detail.value.City = e.detail.value.City[1]
    e.detail.value.DestinationCity = e.detail.value.DestinationCity[1]
    if (e.detail.value.Fee == "" || e.detail.value.ParticipantNum == "" || e.detail.value.PublisherPhone == "" || e.detail.value.TripPlan=="" ){
      wx.showToast({
        title: '请将信息填写完整',
      })
    } else if ( !phone.test(e.detail.value.PublisherPhone)){
   wx.showToast({
     title: '手机号错误',
   })
    }else if(_this.data.images.length==0){
   wx.showToast({
     title: '请上传图片',
   })
    } else{
      wx.navigateTo({
        url: '../../pages/fbJ/fbJ?form=' + JSON.stringify(e.detail.value) + '&images=' + JSON.stringify(_this.data.images)
      })
    }
  },
  formReset() {
    console.log('form发生了reset事件')
  },
  choseStartCity(e){
  this.setData({
    startCity:e.detail.value  
  })
  },
  choseEndCity(e) {
    this.setData({
      endCity: e.detail.value
    })
  },
  choseStartTime(e){
    this.setData({
      startTime: e.detail.value
    })
  },
  choseEndTime(e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   wx.setNavigationBarTitle({
     title: '发布集结令',
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