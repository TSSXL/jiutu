// pages/Search/Search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   list:[],
   PageIndex:1,
   PageSize:10,
   OrderType:0,
   isShow:true,
   isShowImg:true
  },
  cle(){
    let _this=this
  wx.request({
    url: 'https://jznj.nbxuanma.com/api/Home/DeleteSearchHistory',
    header:{
      Authorization:wx.getStorageSync('Token')
    },
    success(res){
      if(res.data.Status===1){
        wx.showToast({
          title: '已清空历史',
        })
        _this.getHistory()
      }
    }
  })
  },
  re(){
   this.setData({
     isShow:true,

   })
  },
  showInfo(e){
    wx.setStorageSync('keyWord', e.target.dataset.word)
    this.changeStatus()
  },
  gotoInfo(e) {
    wx.navigateTo({
      url: '/pages/goodInfo/goodInfo?id=' + e.currentTarget.dataset.id,
    })
  },
  changeAll(){
   this.data.OrderType=0
  this.changeStatus()
  },
  changeNum(){
    this.data.OrderType = 1
    this.changeStatus()
  },
  changePriceUp(){
    this.setData({
      isShowImg: false
    })
    this.data.OrderType = 3
    this.changeStatus()
  },
  changePriceDown() {
    this.setData({
      isShowImg:true
    })
    this.data.OrderType = 2
    this.changeStatus()
  },
  changeFs(){
    this.data.OrderType = 4
    this.changeStatus()
  },
  changeStatus(){
  let _this=this
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Home/ProductsOfKeyword',
      header: {
        Authorization: wx.getStorageSync('Token')
      },
      data: {
        PageIndex: _this.data.PageIndex,
        PageSize: _this.data.PageSize,
        OrderType: _this.data.OrderType,
        Keyword: wx.getStorageSync('keyWord'),
        IsNeedSave: true
      },
      success(res) {
        if (res.data.Status === 1) {
          _this.setData({
            isShow: false,
            list: res.data.Result
          })
        }
      }
    })
  },
  gotoSearch(e){
    let _this = this
    if (e.detail.value!=''){
      wx.request({
        url: 'https://jznj.nbxuanma.com/api/Home/ProductsOfKeyword',
        header: {
          Authorization: wx.getStorageSync('Token')
        },
        data: {
          PageIndex: _this.data.PageIndex,
          PageSize: _this.data.PageSize,
          OrderType: _this.data.OrderType,
          Keyword: e.detail.value,
          IsNeedSave: true
        },
        success(res) {
          if (res.data.Status === 1) {
            _this.setData({
              isShow: false,
              list: res.data.Result
            })
          }
          wx.setStorageSync('keyWord', e.detail.value)
          _this.getHistory()
        }
      })
    }else{
     _this.setData({
        isShow:false
      })
    }
  },
  getHistory(){
    let _this=this
  wx.request({
    url: 'https://jznj.nbxuanma.com/api/Home/SearchHistory',
  header:{
    Authorization: wx.getStorageSync('Token')
  },
    success(res){
  if(res.data.Status===1)
  {
   _this.setData({
     keyHis:res.data.Result
   })
  }else if(res.data.Status===40001){
    wx.navigateTo({
      url: '../../pages/index/index',
    })
  }
    }
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHistory()
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