// pages/help/help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    info: {},
    ID: '',
    PageIndex: 1,
    PageSize: 10,
    comment: ''
  },
  gotoBj() {
    let data = this.data.info.Detail
    wx.navigateTo({
      url: '../../pages/qzBj/qzBj?CityName=' + data.CityName + '&Title=' + data.Title + '&Content=' + data.Content + '&ID=' + data.ID + '&images=' + JSON.stringify(data.Images)
    })
  },
  deleteQz(e) {
    let _this = this
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Community/DeleteHelp',
      header: {
        Authorization: wx.getStorageSync('Token')
      },
      data: {
        ID: e.currentTarget.dataset.id
      },
      success(res) {
        if (res.data.Status === 1) {
          wx.showToast({
            title: '删除成功',
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
  write(e) {
    let _this = this
    _this.setData({
      comment: e.detail.value
    })
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Community/CommentHelp',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('Token')
      },
      data: JSON.stringify({ ID: _this.data.info.Detail.ID, Content: _this.data.comment }),
      success(res) {
        if (res.data.Status === 1) {
          wx.showToast({
            title: '评论成功',
          })
          _this.getCom()
        }
      }
    })
  },
  getCom() {
    let _this = this
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Community/HelpDetailAndComments',
      data: {
        ID: _this.data.ID,
        PageIndex: _this.data.PageIndex,
        PageSize: _this.data.PageSize
      },
      success(res) {
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
     title: '求助详情',
   })
   if(options.type===undefined){
     options.type=1
   }
    this.setData({
      type:options.type,
      ID: options.id
    })
    this.getCom()
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