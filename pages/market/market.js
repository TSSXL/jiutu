// pages/market/market.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PageIndex:1,
    PageSize:100,
    title:"项目管理",
    isShow:false,
  list:[
    { num: "1", content:"完成实名认证"},
    { num: "2", content: "使用电脑浏览器登录www.jznj.com" },
    { num: "3", content: "下载厂家入驻合同" },
    { num: "4", content: "与厂家签署入驻合同" },
    { num: "5", content: "收集厂家资料" },
    { num: "6", content: "进入官网主管登录页面" },
    { num: "7", content: "申请成为管家" },
    { num: "8", content: "根据流程操作等待审核" },
  ],
  infoList:[
  ]
  },
  gotoInfo(e){
    wx.navigateTo({
      url: '../../pages/marketInfo/marketInfo?id='+e.currentTarget.dataset.id,
    })
  },
  getProject() {
    let _this = this
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/User/Projects',
      header: {
        Authorization: wx.getStorageSync('Token')
      },
      data: {
        PageIndex: _this.data.PageIndex,
        PageSize: _this.data.PageSize
      },
      success(res) {
        if (res.data.Status === -1) {
          wx.showModal({
            title: '提示',
            content: res.data.Result,
          })
          _this.setData({
           isShow:true
          })
        }else{
          _this.setData({
            isShow: false,
            infoList:res.data.Result
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProject()
    wx.setNavigationBarTitle({
      title: this.data.title
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