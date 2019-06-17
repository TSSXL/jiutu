// pages/home/home.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    pageIndex:1,
    pageSize:10000,
    buinessRecommend:[],
    productList:[]
  },
  goTop(){
 wx.pageScrollTo({
   scrollTop: 0,
 })
  },
  gotoMessage(){
wx.navigateTo({
  url: '../../pages/msg/msg',
})
  },
  goCommunity(){
  wx.navigateTo({
    url: '../../pages/commu/commu',
  })
  },
  gotoSearch(){
  wx.navigateTo({
    url: '../../pages/Search/Search',
  })
  },
  gotoInfo(e) {
    wx.navigateTo({
      url: '../../pages/goodInfo/goodInfo?id=' + e.currentTarget.dataset.id,
    })
  },
  gotoMore(){
  wx.switchTab({
    url: '../../pages/recommend/recommend',
  })
  },
  gotoShop(e){
    wx.navigateTo({
      url: '../../pages/shop/shop?id=' + e.target.dataset.id + '&name=' + e.target.dataset.name,
    })
  },
getHomeData(index,size){
  var _this=this
wx.request({
  url: 'https://jznj.nbxuanma.com/api/Home/Data',
  method:'get',
  data:{
    PageIndex:index,
    PageSize:size
  },
  success(res){
 _this.setData({
   imgUrls: res.data.Result.Banner,
   productList: res.data.Result.ProductsRecommend,
   buinessRecommend:res.data.Result.BuinessRecommend.slice(0,4)
 })
    // if (res.data.Result.ProductsRecommend.length===0){
    //   wx.showModal({
    //     title: '提示',
    //     content: '已经加载全部。是否返回第一页？',
    //     success(res){
    //       if(res.confirm){
    //         _this.gethome()
    //       }else{
    //         console.log("已经加载全部，但用户不用返回第一页的数据")
    //       }
    //     }
    //   })

    // }
  }
})
},
  getShopCarNum() {
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Home/ShoppingCart',
      header: {
        Authorization: wx.getStorageSync('Token')
      },
      success(res) {
        if(res.data.Status===1){
          if (res.data.Result.Number!=0){
            wx.setTabBarBadge({
              index: 2,
              text: res.data.Result.Number + ''
            })
          }else{
            wx.removeTabBarBadge({
              index: 2,
            })
          }
        }
      }
    })
  },
  // gethome() {
  //   var _this = this
  //   wx.request({
  //     url: 'https://jznj.nbxuanma.com/api/Home/Data',
  //     method: 'get',
  //     data: {
  //       PageIndex: 1,
  //       PageSize: 10
  //     },
  //     success(res) {
  //       _this.setData({
  //         imgUrls: res.data.Result.Banner,
  //         productList: res.data.Result.ProductsRecommend,
  //         buinessRecommend: res.data.Result.BuinessRecommend.slice(0, 4)
  //       })
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
   this.getHomeData(this.data.pageIndex,this.data.pageSize)
   this.getShopCarNum()
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
    this.getShopCarNum()
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
    wx.showToast({
      title: '已经到底拉',
    })
    // this.getHomeData(this.data.pageIndex++, this.data.pageSize)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})