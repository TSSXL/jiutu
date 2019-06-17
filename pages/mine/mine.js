// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    info:{},
    fiveList:[
      {imgPath:"../../image/waiting_payment@3x.png",name:"待付款"},
      { imgPath: "../../image/waiting_delivery@3x.png", name: "待发货" },
      { imgPath: "../../image/waiting_goods@3x.png", name: "待收货" },
      { imgPath: "../../image/waiting_evaluation@3x.png", name: "待评价" },
      { imgPath: "../../image/refund@3x.png", name: "退款售后" }
    ],
    fourList:[
      { imgPath: "../../image/entrepreneurship_qr_code@3x.png", name: "创业码" },
      { imgPath: "../../image/my_wallet@3x.png", name: "我的钱包" },
      { imgPath: "../../image/market_management@3x.png", name: "项目管理" },
      { imgPath: "../../image/project_management@3x.png", name: "市场管理"}
    ],
    eightList:[
      { imgPath: "../../image/account_management@3x.png", name: "账号管理" },
      { imgPath: "../../image/my_collection@3x.png", name: "我的收藏" },
      { imgPath: "../../image/address_management@3x.png", name: "收货地址管理" },
      { imgPath: "../../image/about_us@3x.png", name: "关于我们" },
      { imgPath: "../../image/clear_cache@3x.png", name: "清空缓存" },
      // { imgPath: "../../image/my_customer_service@3x.png", name: "平台客服" },
      { imgPath: "../../image/complaints_suggestions@3x.png", name: "投诉建议" },
      { imgPath: "../../image/construction@3x.png", name: "建设中" }
    ]
  },
  getCollect() {
    let _this = this
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Home/Collections',
      header: {
        Authorization: wx.getStorageSync('Token')
      },
      data: {
        PageIndex: 1,
        PageSize: 10000
      },
      success(res) {
        _this.setData({
          list: res.data.Result
        })
      }
    })
  },
  gotoZh(){
   wx.navigateTo({
     url: '../../pages/zh/zh'
   })
  },
  goOrder(e){
    if ((e.target.dataset.index+1)===5)
    {
      wx.navigateTo({
        url: '../../pages/tk/tk',
      })
    }else{
      wx.navigateTo({
        url: '../../pages/myAllOrder/myAllOrder?select=' + e.target.dataset.index,
      })
    }
  },
  gotoMyOrder(){
 wx.navigateTo({
   url: '../../pages/myAllOrder/myAllOrder',
 })
  },
  handleFour(e){
    if (e.currentTarget.dataset.index === 0) {
      wx.navigateTo({
        url: '../../pages/cy/cy',
      })
    } else if (e.currentTarget.dataset.index === 1)
    {
      wx.navigateTo({
        url: '../../pages/wallet/wallet',
      })
    }else if(e.currentTarget.dataset.index===2){
      wx.request({
        url: 'https://jznj.nbxuanma.com/api/User/Projects',
        header: {
          Authorization: wx.getStorageSync('Token')
        },
        data: {
          PageIndex: 1,
          PageSize: 10000
        },
        success(res) {
          if (res.data.Status === -1) {
            wx.showModal({
              title: '提示',
              content: res.data.Result,
            })
          } else {
              wx.navigateTo({
        url: '../../pages/market/market',
      })
          }
        }
      })
     }
     else{
      wx.navigateTo({
        url: '../../pages/sc/sc',
      })
    }
  },
  goPage(e){
    if (e.currentTarget.dataset.index===0){
       wx.navigateTo({
         url: '../../pages/zh/zh',
       })
    } else if (e.currentTarget.dataset.index===1){
      wx.navigateTo({
        url: '../../pages/collect/collect',
      })
    } else if (e.currentTarget.dataset.index===2){
    wx.navigateTo({
      url: '../../pages/address/address',
    })
    } else if (e.currentTarget.dataset.index===3){
      wx.navigateTo({
        url: '../../pages/us/us',
      })
    } else if (e.currentTarget.dataset.index === 4){
      // wx.removeStorageSync('Token')
      wx.removeStorageSync('keyWord')
      wx.removeStorageSync('logs')
      wx.showToast({
        title: '清理成功',
      })
      // wx.navigateTo({
      //   url: '../../pages/index/index',
      // })
    } else if (e.currentTarget.dataset.index === 5)
    {
      wx.navigateTo({
        url: '../../pages/advice/advice',
      })
    } else {
      wx.showToast({
        title: '正在建设中',
      })
    }
  },
  getInfo(){
    let _this=this
   wx.request({
     url: 'https://jznj.nbxuanma.com/api/User/Info',
     header:{
       Authorization:wx.getStorageSync('Token')
     },
     success(res){
       if(res.data.Status==40001){
         wx.navigateTo({
           url: '../../pages/index/index',
         })
       }
       _this.setData({
         info: res.data.Result
       })
     }
   })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "个人"
    })
    this.getInfo()
    this.getCollect()
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