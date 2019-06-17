var QRCode = require('../../utils/qrcode.js');
var qrcode;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  info:{},
  image:''
  },
  // shareTo(){
  //  let _this=this
  //   wx.canvasToTempFilePath({
  //     x: 100,
  //     y: 100,
  //     width: 200,
  //     height: 200,
  //     destWidth:400,
  //     destHeight: 400,
  //     canvasId: 'canvasT',
  //     success(res) {
  //       _this.setData({
  //         image: res.tempFilePath,
  //         modalHidden:false
  //       })
  //     }
  //   })
  // },
  // close(){
  //  this.setData({
  //    modalHidden:true
  //  })
  // },
  // modalChange(){
  //   let _this=this
  // wx.showModal({
  //   title: '分享',
  //   content: '是否保存到相册',
  //   success(res){
  //     if(res.confirm){
  //       wx.getSetting({
  //         success(res) {
  //           if (!res.authSetting['scope.writePhotosAlbum']) {
  //             wx.openSetting({
  //               success(res) {
  //               console.log("重新授权")
  //               }
  //             })
  //           } else {
  //             wx.saveImageToPhotosAlbum({
  //               filePath: _this.data.image,
  //               success(res) {

  //               }
  //             })
  //             _this.setData({
  //               modalHidden: true
  //             })
  //           }
  //         }
  //       })
  //     }
  //   }
  // })
  // },
  getCy(){
let _this=this
wx.request({
  url: 'https://jznj.nbxuanma.com/api/User/QRCode',
  header:{
    Authorization:wx.getStorageSync('Token')
  },
  success(res){
   _this.setData({
     info:res.data.Result
   })
    qrcode.makeCode(res.data.Result.QRCodeStr);
    
  }
})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this
    wx.setNavigationBarTitle({
      title: "创业码"
    })
    wx.getSystemInfo({
      success(res) {
        _this.setData({
          canvasWidth: res.windowWidth
        })
      }
    })
    wx.authorize({
      scope: 'scope.writePhotosAlbum',
      complete() {
      }
    })
    qrcode = new QRCode('canvasT', {
      width: 300,
      height:300,
      correctLevel: QRCode.CorrectLevel.H,
    });
  _this.getCy()
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