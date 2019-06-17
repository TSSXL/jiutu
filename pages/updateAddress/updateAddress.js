// pages/updateAddress/updateAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    regionT: [],
    list:{},
    name:'',
    phone:'',
    address:''
  },
  update(){
    let _this=this
   let form={
     AddressID:_this.data.list.ID,
     name:_this.data.name,
     phone:_this.data.phone,
     provice:_this.data.regionT[0],
     city:_this.data.regionT[1],
     region:_this.data.regionT[2],
     address:_this.data.address,
     isDefault:0
   }
   wx.request({
     url: 'https://jznj.nbxuanma.com/api/Address/Edit',
     method:'post',
     header:{
       Authorization:wx.getStorageSync('Token')
     },
     data:JSON.stringify(form),
     success(res){
       wx.showToast({
         title: res.data.Result,
       })
       if(res.data.Status===1){
         wx.navigateTo({
           url: '../../pages/address/address',
         })
       }
     }
   })
  },
  getName(e) {
    this.setData({
      name:e.detail.value
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
  bindRegionChange(e){
    this.setData({
      regionT: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  wx.setNavigationBarTitle({
    title: '编辑地址',
  })
  let arr=[]
    arr.push(JSON.parse(options.item).Province)
    arr.push(JSON.parse(options.item).City)
    arr.push(JSON.parse(options.item).Region)
  this.setData({
    list: JSON.parse(options.item),
    regionT:arr,
    name: JSON.parse(options.item).Name,
    phone: JSON.parse(options.item).Phone,
    address: JSON.parse(options.item).Address
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