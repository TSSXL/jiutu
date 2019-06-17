// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:true,
   pageIndex:1,
   pageSize:10,
   list:[],
   ID:'',
   url:'',
   phone:''
  },
  getGoods(id,index,size){
    let _this=this
    wx.request({
      url:_this.data.url,
      data:{
        ID:id,
        PageIndex:index,
        PageSize:size
      },
      success(res){
        _this.setData({
          list: res.data.Result
        })
      }
    })
  },
  ChangegetGoods(id, index, size,type) {
    let _this = this
    wx.request({
      url: _this.data.url,
      header:{
        Authorization:wx.getStorageSync('Token')
      },
      data: {
        ID: id,
        PageIndex: index,
        PageSize: size,
        OrderType:type
      },
      success(res) {
        _this.setData({
          list: res.data.Result
        })
      }
    })
  },
  gotoInfo(e){
    wx.navigateTo({
      url: '/pages/goodInfo/goodInfo?id=' + e.currentTarget.dataset.id,
    })
  },
  changeAll(){
    this.ChangegetGoods(this.data.ID, this.data.pageIndex, this.data.pageSize,0)
  },
  changeNum() {
    this.ChangegetGoods(this.data.ID, this.data.pageIndex, this.data.pageSize, 1)
  },
  changePriceDown() {
    this.setData({
      isShow: true
    })
    this.ChangegetGoods(this.data.ID, this.data.pageIndex, this.data.pageSize, 2)
  },
  changePrice() {
    this.setData({
      isShow:false
    })
    this.ChangegetGoods(this.data.ID, this.data.pageIndex, this.data.pageSize, 3)
  },
  changeFs() {
    this.ChangegetGoods(this.data.ID, this.data.pageIndex, this.data.pageSize, 4)
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
    if(options.id!==undefined)
    {
      wx.setNavigationBarTitle({
        title: options.name,
      })
      this.setData({
        ID: options.id,
        url: 'https://jznj.nbxuanma.com/api/Home/ProductsOfBusiness'
      })
      this.getGoods(options.id, this.data.pageIndex, this.data.pageSize)
    }else{
      wx.setNavigationBarTitle({
        title: options.name,
      })
      this.setData({
        ID: options.shopID,
        url: 'https://jznj.nbxuanma.com/api/Home/ProductsOfBusinessActually',
        phone:options.phone
      })
      this.getGoods(options.shopID, this.data.pageIndex, this.data.pageSize)
    } 
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