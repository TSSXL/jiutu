// pages/sc/sc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:'2px solid #86C166',
  peo:'',
   yj:'',
   Type:0,
   PageIndex:1,
   PageSize:10,
  list:[]
  },
  change(e){
    let _this=this
    if (e.target.dataset.index==="0"){
     _this.setData({
       peo:'',
       yj:'',
       Type:0,
       time:'2px solid #86C166'
     })
     _this.getList()
    } else if (e.target.dataset.index === "1"){
      _this.setData({
        time:'',
        yj:'',
        Type:1,
        peo: '2px solid #86C166'
      })
      _this.getList()
    }else {
      _this.setData({
        time:'',
        peo:'',
        Type:2,
        yj: '2px solid #86C166'
      })
      _this.getList()
    }
  },
  getList(){
   let  _this=this
   wx.request({
     url: 'https://jznj.nbxuanma.com/api/User/MyUsers',
     header:{
       Authorization:wx.getStorageSync('Token')
     },
     data:{
       Type:_this.data.Type,
       PageIndex:_this.data.PageIndex,
       PageSize:_this.data.PageSize
     },
     success(res){
       _this.setData({
         list:res.data.Result
       })
     }
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "市场管理"
    })
    this.getList()
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