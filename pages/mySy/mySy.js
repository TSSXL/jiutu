// pages/mySy/mySy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
    text:"市场管家",
    image:"../../image/icon_fan@3x.png",
    src:"../../image/s.png",
   list:{},
   data:[]
  },
sc(){
this.setData({
  image:"../../image/icon_fan@3x.png",
  text:"市场管家",
  src: "../../image/s.png",
  type:0
})
this.getList()
},
  xm() {
    this.setData({
      image: "../../image/icon_fan@3x.png",
      text: "项目管家",
      src:"../../image/earnings_bg_two.png",
      type: 1
    })
    this.getList()
  },
br(){
  this.setData({
    image: "../../image/tui@3x.png",
    text: "本人消费",
    src: "../../image/b.png",
    type:2
  })
  this.getList()
},
getList(){
let _this=this
wx.request({
  url: 'https://jznj.nbxuanma.com/api/User/Profit',
  data:{
    PageIndex:1,
    PageSize:1000,
    Type:_this.data.type
  },
  header:{
    Authorization:wx.getStorageSync('Token')
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
     title: '我的收益',
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