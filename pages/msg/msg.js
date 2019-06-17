// pages/msg/msg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  serviceList:[],
  systemList:[],
  postList:[],
  payList:[],
  jyList:[],
  PageIndex:1,
  PageSize:100
  },
  showSystem(e){
    wx.navigateTo({
      url: '../../pages/systemInfo/systemInfo?id=' + e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  wx.setNavigationBarTitle({
    title: '消息',
  })
  let _this=this
  wx.request({
    url: 'https://jznj.nbxuanma.com/api/Home/Messages',
    header:{
      Authorization:wx.getStorageSync('Token')
    },
    data:{
      PageIndex:_this.data.PageIndex,
      PageSize:_this.data.PageSize
    },
    success(res){
      let result = res.data.Result
      let arr1=[]
      let arr2=[]
      let arr3=[]
      let arr4=[]
      let arr5=[]
   result.map((item) => {
        if(item.Type==0){
        arr1.push(item)
        _this.setData({
          systemList:arr1
        })
        }else if(item.Type==1){
          arr2.push(item)
          _this.setData({
            postList: arr2
          })
        }else if(item.Type==2){
          arr3.push(item)
          _this.setData({
            payList: arr3
          })
        }else if(item.Type==3){
          arr4.push(item)
          _this.setData({
            jyList:arr4
          })
        }else{
          arr5.push(item)
          _this.setData({
            serviceList: arr5
          })
        }
      })
    }
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