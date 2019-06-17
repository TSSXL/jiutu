// pages/commu/commu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    b:0,
    a:1,
    city:'',
    PageIndex:1,
    PageSize:100,
    info:{},
    imgUrls: [],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    showOne:false,
    showTwo:true,
    showFour:true,
    showFive:true,
    qzInfo:[],
    zbInfo:[],
    xcInfo:[]
  },
  gotoCitys(){
  wx.navigateTo({
    url: '../../pages/citys/citys',
  })
  },
  changeData(){
  this.getXc()
  },
  writeJ(){
   wx.navigateTo({
     url: '../../pages/jl/jl',
   })
  },
  writeG(){
wx.navigateTo({
  url: '../../pages/gl/gl',
})
  },
  writeQ(){
  wx.navigateTo({
    url: '../../pages/qz/qz',
  })
  },
  showGl(){
   this.setData({
     b:0
   })
  },
  showQz(){
    this.setData({
      b: 1
    })
  },
  gotoMyHelp(){
    wx.navigateTo({
      url: '../../pages/myHelp/myHelp',
    })
  },
  gotoMyStrate(){
  wx.navigateTo({
    url: '../../pages/myStrate/myStrate',
  })
  },
  gotoMyJoin(){
   wx.navigateTo({
     url: '../../pages/myJj/myJj?type=1',
   })
  },
  gotoMyJ(){
    wx.navigateTo({
      url: '../../pages/myJj/myJj?type=0',
    })
  },
  gotoXcXq(e){
    wx.navigateTo({
      url: '../../pages/xcXq/xcXq?id=' + e.currentTarget.dataset.id,
    })
  },
  gotoGl(e){
    wx.navigateTo({
      url: '../../pages/commuXq/commuXq?id=' + e.currentTarget.dataset.id,
    })
  },
  gotoQzXq(e){
wx.navigateTo({
  url: '../../pages/help/help?id=' + e.currentTarget.dataset.id,
})
  },
  gotoCommuXq(e){
    wx.navigateTo({
      url: '../../pages/commuXq/commuXq?id=' + e.currentTarget.dataset.id,
    })
  },
  one(){
    wx.setNavigationBarTitle({
      title: "攻略",
    })
  this.setData({
    showOne:false,
    showTwo:true,
    showFour: true,
    showFive: true,
    a:1
  })
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },
  two(){
    wx.setNavigationBarTitle({
      title: "周边",
    })
    this.setData({
      showTwo:false,
      showOne: true,
      showFour: true,
      showFive: true,
      a:2,
    })
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },
  three(){
    wx.setNavigationBarTitle({
      title: "发布",
    })
    this.setData({
      showOne: true,
      showTwo: true,
      showFour: true,
      showFive: true,
      a:3
    })
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },
  four(){
    wx.setNavigationBarTitle({
      title: "行程",
    })
    this.setData({
      showFour:false,
      showOne: true,
      showTwo: true,
      showFive: true,
      a:4
    })
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },
  five(){
    wx.setNavigationBarTitle({
      title: "我的",
    })
    this.setData({
      showFive: false,
      showOne: true,
      showTwo: true,
      showFour: true,
      a:5
    })
  },
  getXc() {
    let _this = this
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Community/Trip',
      data: {
        PageIndex: _this.data.PageIndex,
        PageSize: _this.data.PageSize
      },
      success(res) {
        if (res.data.Status === 1) {
          _this.setData({
            xcInfo: res.data.Result
          })
        }
      }
    })
  },
  getHelp(){
    let _this = this
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Community/Help',
      data: {
        PageIndex: _this.data.PageIndex,
        PageSize: _this.data.PageSize,
        CityName: _this.data.city
      },
      success(res) {
        if (res.data.Status === 1) {
          _this.setData({
            qzInfo: res.data.Result
          })
        }
      }
    })
  },
  getZb() {
    let _this = this
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Community/AroundStrategy',
      data: {
        PageIndex: _this.data.PageIndex,
        PageSize: _this.data.PageSize,
        CityName: _this.data.city
      },
      success(res) {
        if (res.data.Status === 1) {
          _this.setData({
            zbInfo: res.data.Result
          })
        }
      }
    })
  },
  getCon(){
  let _this=this
  wx.request({
    url: 'https://jznj.nbxuanma.com/api/Community/Strategy',
    data:{
      PageIndex:_this.data.PageIndex,
      PageSize: _this.data.PageSize,
      CityName:_this.data.city
    },
    success(res){
      if(res.data.Status===1){
        _this.setData({
          imgUrls: res.data.Result.Banners,
          info:res.data.Result
        })
      }
    }
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      city: wx.getStorageSync('city')
    })
    this.getCon()
    this.getHelp()
    this.getZb()
    this.getXc()
 
  wx.setNavigationBarTitle({
    title: '攻略',
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
  this.onLoad()
    wx.pageScrollTo({
      scrollTop: 0,
    })
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