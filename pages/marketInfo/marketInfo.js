// pages/marketInfo/marketInfo.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    date: '2019-06-01',
    showCa:false,
    Year:2019,
    Month:6,
    info:{},
      list:[]
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
    let arr=this.data.date.split("-")
    this.setData({
      Year:arr[0],
      Month:arr[1],
      showCa:false
    })
   this.getProjectInfo(this.data.id)
  },
ch(){
this.setData({
  showCa:!this.data.showCa
})
},
getProjectInfo(id){
let _this=this
wx.request({
  url: 'https://jznj.nbxuanma.com/api/User/ProjectStatisticInfo',
  header:{
    Authorization:wx.getStorageSync('Token')
  },
 data:{
   ID:id,
   Year:_this.data.Year,
   Month:_this.data.Month
 },
 success(res){
   if(res.data.Status===1){
     _this.setData({
      info:res.data.Result
     })
   }else{
     wx.showModal({
       title: '提示',
       content: res.data.Result,
     })
   }
 }
})
},
getOrderBack(){
  let _this = this
  wx.request({
    url: 'https://jznj.nbxuanma.com/api/User/Profit',
    data: {
      PageIndex: 1,
      PageSize: 1000,
      Type: 2
    },
    header: {
      Authorization: wx.getStorageSync('Token')
    },
    success(res) {
      _this.setData({
        list: res.data.Result.Data
      })
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.setNavigationBarTitle({
      title: "项目管理"
    })
    this.setData({
      id:options.id
    })
    this.getProjectInfo(options.id)
    this.getOrderBack()
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