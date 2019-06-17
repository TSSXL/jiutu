// pages/xcXq/xcXq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"",
    info:{},
    ID:''
  },
  update(e){
    let _this=this
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Community/UpdateMyTrip',
      method:'post',
      header:{
        Authorization:wx.getStorageSync('Token')
      },
      data:JSON.stringify({
        ID: e.currentTarget.dataset.id,
        TripPlan: _this.data.content,
        Images:""
      }),
      success(res){
        if(res.data.Status===1){
          wx.showToast({
            title: '修改成功',
          })
          _this.changeParentData()
        }else{
          wx.showToast({
            title: '行程已经开始',
          })
        }
      }
    })
  },
  changeCon(e){
    this.setData({
      content:e.detail.value
    })
  },
  showPeople(e){
 wx.navigateTo({
   url: '../../pages/showPeople/showPeople?id=' + e.currentTarget.dataset.id,
 })
  },
  addJoin(e){
  wx.request({
    url: 'https://jznj.nbxuanma.com/api/Community/JoinTrip',
    header:{
      Authorization:wx.getStorageSync('Token')
    },
    data:{
      ID: e.currentTarget.dataset.id
    },
    success(res){
      if(res.data.Status===1){
        wx.showToast({
          title: '加入成功',
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
  cancel(e){
    let _this=this
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Community/CancelMyTrip',
      header:{
        Authorization:wx.getStorageSync('Token')
      },
      data:{
        ID:e.currentTarget.dataset.id
      },
      success(res){
        if(res.data.Status===1){
          wx.showToast({
            title: '取消成功',
          })
          _this.changeParentData()
        }
        
      }
    })
  },
  changeParentData: function () {
    var pages = getCurrentPages();//当前页面栈
    if (pages.length > 1) {
      var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
      beforePage.changeData();//触发父页面中的方法
    }
  },
 getInfo(){
   let _this=this
  wx.request({
    url: 'https://jznj.nbxuanma.com/api/Community/TripDetailForApp',
    header:{
      Authorization:wx.getStorageSync('Token')
    },
    data:{
      ID:_this.data.ID
    },
    success(res){
      _this.setData({
        info:res.data.Result,
        content:res.data.Result.TripPlan
      })
    }
  })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  wx.setNavigationBarTitle({
    title: '行程详情',
  })
  this.setData({
    ID:options.id
  })
  this.getInfo()
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