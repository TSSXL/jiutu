// pages/addAddress/addAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['浙江省', '宁波市', '鄞州区'],
    customItem: '全部',
    name:'',
    phone:'',
   address:''
  },
  getName(e){
    this.setData({
      name: e.detail.value
    })
  },
  getPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getAddress(e) {
    this.setData({
      address: e.detail.value
    })
  },
  bc(){
    let _this=this
   let form={
     name:_this.data.name,
     phone:_this.data.phone,
     provice:_this.data.region[0],
     city:_this.data.region[1],
     region:_this.data.region[2],
     address:_this.data.address,
     isDefault:0
   }
   wx.request({
     url: 'https://jznj.nbxuanma.com/api/Address/Add',
     method:'post',
     header:{
       Authorization:wx.getStorageSync('Token')
     },
     data:JSON.stringify(form),
     success(res){
       wx.showModal({
         title: '提示',
         content: res.data.Result,
       })
       if(res.data.Status===1){
         setTimeout(function(){
           wx.switchTab({
             url: '../../pages/mine/mine',
           })
         },1500)
      
       }
     }
   })
  },
  bindRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  wx.setNavigationBarTitle({
    title: '新增地址',
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