// pages/goodInfo/goodInfo.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:10,
    isShowVideo:false,
     indicatorDots:false,
    autoplay:true,
     interval: 5000,
    duration: 1000,
    select:'',
    num:0,
    a:'black',
    b:'black',
    c:'black',
    isShow:true,
    goodsInfo:{},
    dialog:0,
    size:'none',
    PageIndex:1,
    PageSize:10,
    comment:[],
    cProduct:{},
    videoSrc:''
  },
  showImg(){
 this.setData({
   isShowVideo:false
 })
  },
 showVideo(){
   let _this=this
  _this.data.goodsInfo.ProductImg.map((item)=>{
  if(item.Type==1){
    _this.setData({
      isShowVideo: true,
      videoSrc:item.Video
    })
  }
 })
 },
  choseProduct(e){
  let _this=this
    let id = e.currentTarget.dataset.id
    _this.setData({
      select: e.currentTarget.dataset.index
    })
  _this.data.goodsInfo.Specs.map((item)=>{
if(item.ID===id){
  _this.setData({
    cProduct:item
  })
}
    })
    console.log(_this.data.select)
  },
  changeColor(e){
    this.setData({
      num: e.currentTarget.dataset.idx
    })
  },
  gotoShop(){
   wx.navigateTo({
     url: '../../pages/shop/shop?shopID=' + this.data.goodsInfo.Business.ID + '&name=' + this.data.goodsInfo.Business.BuinessName + '&phone=' + this.data.goodsInfo.Business.Phone,
   })
  },
  gotoCar(){
   wx.switchTab({
     url: '../../pages/shopCar/shopCar',
   })
  },
  addCar(){
    let _this=this
     wx.request({
       url: 'https://jznj.nbxuanma.com/api/Home/AddToShoppingCart',
       header:{
         Authorization: wx.getStorageSync('Token')
       },
       data:{
         ID:_this.data.goodsInfo.ID,
       },
       success(res){
   if(res.data.Status===1){
        wx.showToast({
      title: '添加成功'
    })
     _this.getShopCarNum()
   }else if(res.data.Status==40001){
     wx.navigateTo({
       url: '../../pages/index/index',
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
  addCarT() {
    let _this = this
      wx.request({
        url: 'https://jznj.nbxuanma.com/api/Home/AddToShoppingCart',
        header: {
          Authorization: wx.getStorageSync('Token')
        },
        data: {
          ID: _this.data.cProduct.ID,
        },
        success(res) {
          if (res.data.Status === 1) {
            wx.showToast({
              title: '添加成功'
            })
            _this.getShopCarNum()
          }else if(res.data.Status==40001){
            wx.navigateTo({
              url: '../../pages/index/index',
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
  close(){
    this.setData({
      size: 'none'
    })
  },
  selectSize(){
    this.setData({
      size:'flex'
    })
  },
  handleScNo(){
    let _this = this
    _this.setData({
      isShow: true
    })
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Home/Collection',
      header: {
        Authorization: wx.getStorageSync('Token')
      },
      data: {
        ID: _this.data.goodsInfo.ID
      },
      success(res) {
        if (res.data.Status === 1) {
          wx.showToast({
            title: '取消收藏'
          })
        }else if(res.data.Status===40001){
       wx.navigateTo({
         url: '../../pages/index/index',
       })
        }else {
          wx.showToast({
            title: '出错啦'
          })
        }
      }
    })
  },
  handleSc(){
    let _this=this
  _this.setData({
    isShow:false
  })
  wx.request({
    url: 'https://jznj.nbxuanma.com/api/Home/Collection',
    header:{
      Authorization: wx.getStorageSync('Token')
    },
    data:{
      ID: _this.data.goodsInfo.ID
    },
    success(res){
    if(res.data.Status===1){
      wx.showToast({
        title: '收藏成功'
      })
    }else if(res.data.Status===40001){
      wx.navigateTo({
        url: '../../pages/index/index',
      })
    }else{
      wx.showToast({
        title: '出错啦'
      })
    }
    }
  })
  },
  showGoods(){
   this.setData({
     a:'red',
     b: 'black',
     c: 'black',
  dialog:0
   })
  },
  showPl(){
    let _this=this
    _this.setData({
      b: 'red',
      a: 'black',
      c: 'black',
      dialog: 1
    })
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Home/ProductComments',
      data:{
        ID:_this.data.goodsInfo.ID,
        PageIndex:_this.data.PageIndex,
        PageSize:_this.data.PageSize
      },
      success(res){
        _this.setData({
          comment:res.data.Result
        })
      }
    })
  },
  showShop(){
    this.setData({
      c: 'red',
      b: 'black',
      a: 'black',
      dialog: 2
    })
  },
  getGoodsInfo(ID) {
    let _this=this
   wx.request({
     url: 'https://jznj.nbxuanma.com/api/Home/Product',
     data:{
       ID:ID
     },
     success(res){
        _this.setData({
          goodsInfo:res.data.Result,
          cProduct:res.data.Result.Specs[0]
        })
       WxParse.wxParse('article', 'html', decodeURIComponent(res.data.Result.Detail), _this, 0);
       if(res.data.Status===-1){
         wx.showToast({
           title: res.data.Result,
         })
       }
     }
   })
  },
  getGoodsInfoToken(ID) {
    let _this = this
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Home/Product',
      header:{
        Authorization:wx.getStorageSync('Token')
      },
      data: {
        ID: ID
      },
      success(res) {
        _this.setData({
          goodsInfo: res.data.Result,
          cProduct: res.data.Result.Specs[0],
          isShow: !res.data.Result.IsCollected
        })
        WxParse.wxParse('article', 'html', decodeURIComponent(res.data.Result.Detail), _this, 0);
        if (res.data.Status === -1) {
          wx.showToast({
            title: res.data.Result,
          })
        }
      }
    })
  },
  getShopCarNum(){
    let _this = this
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Home/ShoppingCart',
      header: {
        Authorization: wx.getStorageSync('Token')
      },
      success(res) {
        _this.setData({
         num:res.data.Result.Number
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('Token') == ''){
      console.log("这是用户未登录")
      this.getGoodsInfo(options.id)
    }else{
      console.log("这是用户已经登录")
      this.getGoodsInfoToken(options.id)
    }
    wx.setNavigationBarTitle({
      title:"商品详情"
    })
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