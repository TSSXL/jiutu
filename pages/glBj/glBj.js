// pages/glBj/glBj.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:true,
    startCity:["浙江省","温州市","鄞州区"],
Title:'',
images:[],
imagesTwo:[],
ID:''
  },
  formSubmit(e){
    let _this=this
    if (_this.data.imagesTwo.length===0) {
     wx.showModal({
       title: '提示',
       content: '这是您之前的图片，请重新上传',
     })
    }else{
      e.detail.value.Images = _this.data.imagesTwo.join(",")
      e.detail.value.City = _this.data.startCity[1]
      e.detail.value.ImgVideo = "string"
      e.detail.value.Video = "string"
      wx.request({
        url: 'https://jznj.nbxuanma.com/api/Community/UpdateStrategy?ID=' + _this.data.ID,
        method: 'post',
        header: {
          Authorization: wx.getStorageSync('Token')
        },
        data: JSON.stringify(e.detail.value)
        ,
        success(res) {
          if (res.data.Status === 1) {
            wx.showModal({
              title: '提示',
              content: '修改成功，即将跳转到集结令首页',
            })
            setTimeout(function () {
              wx.navigateTo({
                url: '../../pages/commu/commu',
              })
            }, 1500)
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
              isShow:false,
              imagesTwo: _this.data.imagesTwo.concat(JSON.parse(res.data).Result)
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
    title: '修改攻略',
  })
    let startCity = "startCity[1]"
  
  this.setData({
   [startCity]:options.CityName,
    Title: options.Title,
    Content:options.Content,
    images:JSON.parse(options.images),
    ID: options.ID
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