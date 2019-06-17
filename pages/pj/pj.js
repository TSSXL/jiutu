// pages/pj/pj.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    a:[],
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../image/star@3x.png',
    selectedSrc: '../../image/star_selected@3x.png',
    scores: [],
    score:0,
    list:[],
    Data:{
    Data:[
      {
   
      }
    ]
  }
  },
  starTap: function (e) {
    let  score = e.currentTarget.dataset.score
    let Star = "Data.Data[" + e.currentTarget.dataset.idx + "].Star"
    this.data.scores[e.currentTarget.dataset.idx] = score,
      this.setData({
        scores: this.data.scores,
        score: score,
      [Star]: score + 1
      })
  },
  confirm(){
    let _this=this
    console.log(_this.data.Data)
    console.log(JSON.stringify(_this.data.Data))
    if (JSON.stringify(_this.data.Data.Data[0]) == "{}") {
      wx.showModal({
        title: '提示',
        content: '请动动手评价一个呗',
      })
    }else{
      wx.request({
        url: 'https://jznj.nbxuanma.com/api/Home/CommentOrder',
        method: 'post',
        header: {
          Authorization: wx.getStorageSync('Token')
        },
        data: JSON.stringify(_this.data.Data),
        success(res) {
          wx.showToast({
            title: res.data.Result,
          })
          if(res.data.Status===1){
            wx.reLaunch({
              url: '../../pages/mine/mine',
            })
          }
        }
      })
    }
  },
  getCon(e){
    let ID = "Data.Data[" + e.target.dataset.index + "].ID"
    let Content = "Data.Data[" + e.target.dataset.index + "].Content"
    let Url = "Data.Data[" + e.target.dataset.index + "].Url"
    this.setData({
    [Content]:e.detail.value,
      [ID]: e.target.dataset.id,
      [Url]:"asdas"
  })
  },
  uploadImg(e) {
    let _this = this
    let images = "a[" + e.target.dataset.idx + "].images"
     let Url = "Data.Data[" + e.target.dataset.idx + "].Url"

    wx.chooseImage({
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://jznj.nbxuanma.com/api/C_Tool/FileUploader',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'type':'4'
          },
          header: {
            'Authorization': wx.getStorageSync('Token'),
            'Content-Type': "multipart/form-data"
          },
          success: function (res) {
            _this.setData({
              [images]: _this.data.a[e.target.dataset.idx].images.concat(JSON.parse(res.data).Result),
              [Url]: _this.data.a[e.target.dataset.idx].images.concat(JSON.parse(res.data).Result).join(",")
            })
            console.log(_this.data.a[e.target.dataset.idx].images.join(","))
            console.log("url"+_this.data.Data.Data[e.target.dataset.idx].Url)
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this
   wx.setNavigationBarTitle({
     title: '评价',
   })
   wx.request({
     url: 'https://jznj.nbxuanma.com/api/Home/OrderDetail',
     header:{
       Authorization:wx.getStorageSync('Token')
     },
     data:{
       OrderID: options.OrderID
     },
     success(res){
       let arr = new Array(res.data.Result.Products.length)
       for (let i = 0; i < arr.length; i++) {
         arr[i] = { images: [] };
       }
       _this.setData({
         list:res.data.Result.Products,
         a:arr
       })
     }
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