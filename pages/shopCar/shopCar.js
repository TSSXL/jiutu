// pages/shopCar/shopCar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aStyle:'block',
    bStyle:'none',
     proList:[],
    allPrice:'',
    choseNum:false,
    itemShow:true,
    select:'',
  },
  js(){
   wx.navigateTo({
     url: '../../pages/createOrder/createOrder',
   })
  },
  upInfo(){
   this.setData({
     choseNum:!this.data.choseNum
   })
  },
  deleteOne(){
    let _this = this
    let arr = []
    _this.data.proList.map((item) => {
      arr = item.Products.map((j) => {
        return j.ID
      })
    })
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Home/RemoveFromShoppingCart',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('Token')
      },
      data: JSON.stringify({
        IDList: arr
      }),
      success(res) {
        if (res.data.Status === 1) {
          wx.showToast({
            title: '删除成功',
          })
          _this.getShopCar()
        }
      }
    })
  },
  choseAll(){
    let _this=this
    _this.setData({
      itemShow:!_this.data.itemShow
    })
    let arr = []
    arr = _this.data.proList.map((item) => {
      return item.Products.map((j)=>{
      return j.ID
      })
    })
    if(_this.data.itemShow===false){
      wx.request({
        url: 'https://jznj.nbxuanma.com/api/Home/ShoppingCartItemsSelect',
        method: 'post',
        header: {
          Authorization: wx.getStorageSync('Token')
        },
        data:JSON.stringify(
          { IDList: arr.join(",").split(",")}
        ) ,
        success(res) {
          if (res.data.Status === 1) {
            wx.showToast({
              title: '全选',
            })
            _this.getShopCar()
          }
        }
      })
    }else{
      wx.request({
        url: 'https://jznj.nbxuanma.com/api/Home/ShoppingCartItemsUnSelect',
        method: 'post',
        header: {
          Authorization: wx.getStorageSync('Token')
        },
        data:
          {IDList: arr.join(",").split(",")}
        ,
        success(res) {
          if (res.data.Status === 1) {
            wx.showToast({
              title: '不选',
            })
            _this.getShopCar()
          }
        }
      })
    }
  
  },
  changeOne(e){
    let _this=this
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Home/ShoppingCartItemSelect',
      header:{
        Authorization:wx.getStorageSync('Token')
      },
      data:{
        ID: e.target.dataset.id
      },
      success(res){
       if(res.data.Status===1)
       {
         _this.getShopCar()
       }
      }
    })
  },

  changeNo(e){
    let _this=this
   _this.setData({
     aStyle:'none',
     bStyle:'block',
     select: e.target.dataset.index
   })
   let arr=[]
arr=_this.data.proList[e.target.dataset.index].Products.map((item)=>{
return item.ID
})
  wx.request({
    url: 'https://jznj.nbxuanma.com/api/Home/ShoppingCartItemsUnSelect',
    method: 'post',
    header: {
      Authorization: wx.getStorageSync('Token')
    },
    data: JSON.stringify({
      IDList: arr
    }),
    success(res) {
      if (res.data.Status === 1) {
        wx.showToast({
          title: '不选',
        })
        _this.getShopCar()
      }
    }
  })
  },
  changeAll(e){
    let _this = this
    _this.setData({
      aStyle: 'block',
      bStyle: 'none',
      select: e.target.dataset.index
    })
    let arr = []
    arr = _this.data.proList[e.target.dataset.index].Products.map((item) => {
      return item.ID
    })
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Home/ShoppingCartItemsSelect',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('Token')
      },
      data: JSON.stringify({
        IDList: arr
      }),
      success(res) {
        if (res.data.Status === 1) {
          wx.showToast({
            title: '全选成功',
          })
          _this.getShopCar()
        }
      }
    })
  },
  cutNum(e){
    this.updateGoodsNum(e.target.dataset.id,-1)
  },
  addNum(e){
    this.updateGoodsNum(e.target.dataset.id, 1)
  },
  updateGoodsNum(ID,val){
    let _this=this
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Home/UpdateShoppingCart',
      header:{
        Authorization:wx.getStorageSync('Token')
      },
      data:{
       ID:ID,
        Operate:val
      },
      success(res){
      if(res.data.Status===1){
        wx.showToast({
          title: '修改成功',
        })
        _this.getShopCar()
      }
      }
    })
  },
  gotoInfo(e) {
    wx.navigateTo({
      url: '/pages/goodInfo/goodInfo?id=' + e.target.dataset.id,
    })
  },
 getShopCar(){
  let _this=this
  wx.request({
    url: 'https://jznj.nbxuanma.com/api/Home/ShoppingCart',
    header:{
      Authorization: wx.getStorageSync('Token')
    },
    success(res){
      if(res.data.Status===40001){
        wx.showToast({
          title: '登录失效',
        })
        wx.navigateTo({
          url: '../../pages/index/index',
        })
      }
      _this.setData({
        allPrice: res.data.Result.Total,
        proList:res.data.Result.Data
      })
      if (res.data.Result.Number != 0) {
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
  })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "购物车"
    })
    this.getShopCar()
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
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