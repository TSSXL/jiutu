import { hexMD5 } from '../../utils/md5.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oneFocus: true,
    twoFocus: false,
    threeFocus: false,
    fourFocus: false,
    fiveFocus: false,
    sixFocus: false,
    OrderID:'',
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    six: '',
    psd: '',
    modalHidden:true,
    hidden:true,
    status:-1,
    PageIndex:1,
    PageSize:100,
    orderInfo:{},
    select:0,
   type:false,
   textList:[
   "全部",
   "待付款",
   "待发货",
   "待收货",
   "待评价"
   ]
  },
  getOne(e) {
    if (e.detail.value == '') {
      this.setData({
        oneFocus: true
      })
    } else {
      this.setData({
        one: e.detail.value,
        twoFocus: true
      })
    }
  },
  getTwo(e) {
    if (e.detail.value == '') {
      this.setData({
        twoFocus: true
      })
    } else {
      this.setData({
        two: e.detail.value,
        threeFocus: true
      })
    }
  },
  getThree(e) {
    if (e.detail.value == '') {
      this.setData({
        threeFocus: true
      })
    } else {
      this.setData({
        three: e.detail.value,
        fourFocus: true
      })
    }
  },
  getFour(e) {
    if (e.detail.value == '') {
      this.setData({
        fourFocus: true
      })
    } else {
      this.setData({
        four: e.detail.value,
        fiveFocus: true
      })
    }
  },
  getFive(e) {
    if (e.detail.value == '') {
      this.setData({
        fiveFocus: true
      })
    } else {
      this.setData({
        five: e.detail.value,
        sixFocus: true
      })
    }
  },
  getSix(e) {
    this.setData({
      six: e.detail.value
    })
  },
  giveMoney(e){
  this.setData({
    modalHidden:false,
    OrderID: e.currentTarget.dataset.id,
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    six: '',
    psd: '',
    oneFocus: true,
    twoFocus: false,
    threeFocus: false,
    fourFocus: false,
    fiveFocus: false,
    sixFocus: false
  })
  },
  close() {
    this.setData({
      modalHidden: true
    })
  },
  modalChange(){
    let _this = this
    _this.setData({
      psd: (_this.data.one + _this.data.two + _this.data.three + _this.data.four + _this.data.five + _this.data.six)
    })
    if(_this.data.psd.length<6){
      wx.showToast({
        title: '密码须6位',
      })
    }else{
      wx.request({
        url: 'https://jznj.nbxuanma.com/api/Home/PayOrderUseBalance',
        header: {
          Authorization: wx.getStorageSync('Token')
        },
        data: {
          OrderID: _this.data.OrderID,
          PayPassword: hexMD5(_this.data.psd)
        },
        success(res) {
          _this.setData({
            modalHidden: true
          })
          if (res.data.Result =="您的余额不足") {
            wx.showModal({
              title: '提示',
              content: '您余额不足，是否使用第三方支付',
              success(res) {
                if (res.confirm) {
                  wx.request({
                    url: 'https://jznj.nbxuanma.com/api/Home/PayOrder',
                    header: {
                      Authorization: wx.getStorageSync('Token')
                    },
                    data: {
                      OrderID: _this.data.OrderID,
                      UseBalance: true,
                      ThirdPayType: 2,
                    },
                    success(res) {
                      if (res.data.Status === 1) {
                        res.data.Result=JSON.parse(res.data.Result)
                        wx.requestPayment({
                          timeStamp: res.data.Result.timeStamp,
                          nonceStr: res.data.Result.nonceStr,
                          package: res.data.Result.package,
                          signType: 'MD5',
                          paySign: res.data.Result.paySign,
                          success(res) {
                            _this.getList()
                          console.log("调用支付接口成功")
                          },
                          fail(res){
                            console.log(res)
                          }
                        })
                      }
                    }
                  })
                } else {
               console.log("取消")
                }
              }
            })
          }else if(res.data.Result=="支付密码错误"){
            wx.showToast({
              title: '支付密码错误',
            })
          }else{
            _this.getList()
            wx.showToast({
              title: '支付成功'
            })
          }
        }
      })
    }
  },
  confirm(){
 this.setData({
   hidden:false
 })
  },
  cancel(){
   this.setData({
     hidden:true
   })
  },
  confirmOrder(e){
  let _this=this
  wx.request({
    url: 'https://jznj.nbxuanma.com/api/Home/ConfirmOrderArrived',
    header:{
      Authorization:wx.getStorageSync('Token')
    },
    data:{
      OrderID: e.currentTarget.dataset.orderid
    },
    success(res){
      wx.showToast({
        title:res.data.Result,
      })
      _this.setData({
        hidden:true
      })
    }
  })
  },
  gotoPj(e){
    wx.navigateTo({
      url: '../../pages/pj/pj?OrderID=' + e.currentTarget.dataset.orderid,
    })
  },
  gotoWl(e){
    wx.navigateTo({
      url: '../../pages/wl/wl?OrderID=' + e.currentTarget.dataset.orderid,
    })
  },
  remindOrder(e){
    let _this = this
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Home/RemindDeliver',
      header: {
        Authorization: wx.getStorageSync('Token')
      },
      data: {
        OrderID: e.currentTarget.dataset.id
      },
      success(res) {
          wx.showToast({
            title: res.data.Result,
          })
      }
    })
  },
  cancelOrder(e){
    let _this=this
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Home/CancelOrder',
      header:{
        Authorization:wx.getStorageSync('Token')
      },
      data:{
        OrderID: e.currentTarget.dataset.id
      },
      success(res){
        if(res.data.Status===1){
          wx.showToast({
            title: '已取消',
          })
          _this.getList()
        }
      }
    })
  },
  gotoOrderInfo(e){
  wx.navigateTo({
    url: '../../pages/orderInfo/orderInfo?id='+e.currentTarget.dataset.id,
  })
  },
change(e){
  let _this=this
 _this.setData({
   select:e.target.dataset.index
 })
 if(_this.data.select===0){
   _this.setData({
     status:-1
   })
   _this.getList()
 } else if (_this.data.select === 1){
   _this.setData({
     status: 0
   })
   _this.getList()
 } else if (_this.data.select === 2){
   _this.setData({
     status: 1
   })
   _this.getList()
 } else if (_this.data.select === 3){
   _this.setData({
     status: 2
   })
   _this.getList()
 }else{
   _this.setData({
     status: 3
   })
   _this.getList()
 }
},
getList(){
  let _this=this
  wx.request({
    url: 'https://jznj.nbxuanma.com/api/Home/Orders',
    header:{
      Authorization:wx.getStorageSync('Token')
    },
    data:{
      PageIndex: _this.data.PageIndex,
      PageSize: _this.data.PageSize,
      Type:_this.data.status
    },
    success(res){
      if(res.data.Status===1){
        _this.setData({
          orderInfo:res.data.Result
        })
      }
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this
  wx.setNavigationBarTitle({
    title: '我的订单',
  })
    if (options.select!==undefined){
      _this.setData({
        select: parseInt(options.select) + 1,
        status: options.select 
      })
    }
  _this.getList()
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
    this.getList()
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