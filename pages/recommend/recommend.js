// pages/recommend/recommend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgColor: '#f7f7f7',
    textColor:'#86C166',
   leftList:[],
   ID:'',
   pageIndex:1,
   pageSize:10,
   productList:[],
   isShow:false,
   brandsList:[],
    brandColor:'#86C166',
    num:'30px',
    jl:'20rpx',
    color:'white'
  },
  gotoMsg(){
wx.navigateTo({
  url: '../../pages/msg/msg',
})
  },
  gotoSearch() {
    wx.navigateTo({
      url: '../../pages/Search/Search',
    })
  },
  gotoInfo(e) {
    wx.navigateTo({
      url: '/pages/goodInfo/goodInfo?id=' + e.target.dataset.id,
    })
  },
  gotoShop(e) {
    wx.navigateTo({
      url: '../../pages/shop/shop?id=' + e.target.dataset.id + '&name=' + e.target.dataset.name,
    })
  },
  showBrand(){
    this.setData({
      isShow: false,
      brandColor: '#86C166',
      num: '30px',
      jl: '20rpx',
      color: 'white',
      bgColor:'white',
      textColor:'black'
    })
    this.getBrandProducts("00000000-0000-0000-0000-000000000000", this.data.pageIndex, this.data.pageSize)
  },
  show(e){
    this.setData({
      ID: e.target.dataset.id,
      isShow: true,
      brandColor:'',
      num:'',
      jl:'',
      color: '',
      bgColor: '#f7f7f7',
      textColor: '#86C166',
    })
      this.getProducts(this.data.ID, this.data.pageIndex, this.data.pageSize)
  },
  getProducts(id,index,size){
    var _this=this
  wx.request({
    url: 'https://jznj.nbxuanma.com/api/Home/Products',
    method:'get',
  data:{
ID:id,
PageIndex:index,
PageSize:size
  },
    success(res){
      wx.pageScrollTo({
        scrollTop: 0,
      })
      _this.setData({
        productList: res.data.Result
      })
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
        if (res.data.Status === 1) {
          if (res.data.Result.Number != 0) {
            wx.setTabBarBadge({
              index: 2,
              text: res.data.Result.Number + ''
            })
          } else {
            wx.removeTabBarBadge({
              index: 2,
            })
          }
        }
      }
    })
  },
  getBrandProducts(id, index, size) {
    var _this = this
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Home/Products',
      method: 'get',
      data: {
        ID: id,
        PageIndex: index,
        PageSize: size
      },
      success(res) {
        wx.pageScrollTo({
          scrollTop: 0,
        })
        _this.setData({
          productList: res.data.Result
        })
      }
    })
  },
 getCategory(){
   var _this=this
   wx.request({
     url: 'https://jznj.nbxuanma.com/api/Home/Categories',
     method:'get',
     success(res){
       res.data.Result.splice(0,1)
       _this.setData({
         leftList: res.data.Result
       })
     }
   })
 },
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
     this.getCategory()
    this.getBrandProducts("00000000-0000-0000-0000-000000000000", this.data.pageIndex, this.data.pageSize)
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
    wx.pageScrollTo({
      scrollTop: 0,
    })
    this.showBrand()
    this.getShopCarNum()
    // this.getCategory()
    // this.getBrandProducts("00000000-0000-0000-0000-000000000000", this.data.pageIndex, this.data.pageSize)
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