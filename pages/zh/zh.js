import { hexMD5} from '../../utils/md5.js'

Page({
  data: {
    oneFocus: true,
    twoFocus: false,
    threeFocus: false,
    fourFocus: false,
    fiveFocus: false,
    sixFocus: false,
    yzm:'',
    one:'',
    two:'',
    three:'',
    four:'',
    five:'',
    six:'',
    psd:'',
    isShow:false,
   info:{},
    modalHidden:true,
    modalHiddenName:true,
    inviteCode:'',
    peopleName:''
  },
  uploadImg() {
    let _this = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://jznj.nbxuanma.com/api/User/UpdateForImage',
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'Authorization': wx.getStorageSync('Token'),
            'Content-Type': "multipart/form-data"
          },
          success: function (res) {
          wx.showModal({
            title: '提示',
            content: res.data.Result,
          })
          }
        })
      }
    })
  },
  closeName(){
    this.setData({
      modalHiddenName: true
    })
  },
  confirmName() {
    let _this = this
    if (_this.data.peopleName == '') {
      wx.showToast({
        title: '请输入昵称',
      })
    } else {
      wx.request({
        url: 'https://jznj.nbxuanma.com/api/User/UpdateForName',
        header: {
          Authorization: wx.getStorageSync('Token')
        },
        data: {
          name: _this.data.peopleName
        },
        success(res) {
          wx.showModal({
            title: '提示',
            content: res.data.Result,
          })
          _this.setData({
            modalHiddenName: true
          })
        }
      })

    }
  },
  closeNum(){
    this.setData({
      modalHidden: true
    })
  },
  confirmNum() {
    let _this=this
    if(_this.data.inviteCode==''){
      wx.showToast({
        title: '请输入推广码',
      })
    }else{
      wx.request({
        url: 'https://jznj.nbxuanma.com/api/User/BindPromoter',
        header:{
          Authorization:wx.getStorageSync('Token')
        },
        data:{
          InviteCode:_this.data.inviteCode
        },
        success(res){
          wx.showModal({
            title: '提示',
            content: res.data.Result,
          })
          _this.setData({
            modalHidden: true
          })
        }
      })
 
    }
  },
  showName() {
    this.setData({
      modalHiddenName: false,
      peopleName: ''
    })
  },
  showNum(){
  this.setData({
    modalHidden:false,
    inviteCode:''
  })
  },
  showDialog(){
   this.setData({
     oneFocus: false,
     twoFocus: false,
     threeFocus: false,
     fourFocus: false,
     fiveFocus: false,
     sixFocus: false,
     isShow:true,
     yzm: '',
     one: '',
     two: '',
     three: '',
     four: '',
     five: '',
     six: '',
     psd: '',
   })
  },
  close(){
  this.setData({
   isShow:false,
    yzm: '',
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    six: '',
    psd: '',
  })
  },
  getYzm(){
     wx.request({
       url: 'https://jznj.nbxuanma.com/api/User/SendCode',
       header:{
         Authorization:wx.getStorageSync('Token')
       },
       success(res){
       if(res.data.Status===1){
         wx.showToast({
           title: '发送成功',
         })
       }
       }
     })
  },
  getInvite(e) {
    this.setData({
      inviteCode: e.detail.value
    })
  },
  getName(e) {
    this.setData({
      peopleName: e.detail.value
    })
  },
  gety(e){
    this.setData({
      yzm: e.detail.value
    })
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
  confirm(){
  let _this=this
    _this.setData({
      psd:(_this.data.one+_this.data.two+_this.data.three+_this.data.four+_this.data.five+_this.data.six),
      isShow: true
    })
if(_this.data.psd.length==6)
    {
      _this.setData({
        psd: hexMD5(_this.data.one + _this.data.two + _this.data.three + _this.data.four + _this.data.five + _this.data.six)
      })
      if (_this.data.info.IsPayPasswordSeted===true){
          if(_this.data.yzm!==''){
           wx.request({
             url: 'https://jznj.nbxuanma.com/api/User/ChangePayPassword',
             header:{
               Authorization:wx.getStorageSync('Token')
             },
             data:{
               code:_this.data.yzm,
               payPassword: _this.data.psd
             },
             success(res){
               if(res.data.Status===1){
                 wx.showToast({
                   title: '修改密码成功',
                 })
                 _this.setData({
                   isShow: false
                 })
               }else{
                 wx.showToast({
                   title: '验证码错误',
                 })
               }
             }
           })
          }else{
            wx.showToast({
              title: '请输入验证码',
            })
          }
      }else{
        wx.request({
          url: 'https://jznj.nbxuanma.com/api/User/SetPayPassword',
          header: {
            Authorization: wx.getStorageSync('Token')
          },
          data: {
            payPassword: _this.data.psd
          },
          success(res) {
            if (res.data.Status === 1) {
              wx.showToast({
                title: '设置密码成功',
              })
              _this.setData({
                isShow: false
              })
              _this.getInfo()
            }
          }
        })
      }
    }else{
      wx.showToast({
        title: '信息不完整',
      })
    }
  },
  gotoReal(){
wx.navigateTo({
  url: '../../pages/real/real',
})
  },
  logout(){
  wx.request({
    url: 'https://jznj.nbxuanma.com/api/User/Logout',
    header:{
      Authorization:wx.getStorageSync('Token')
    },
    success(res){
  if(res.data.Status===1){
    wx.navigateTo({
      url: '../../pages/index/index',
    })
  }
    }
  })
  },
  getInfo() {
    let _this = this
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/User/Info',
      header: {
        Authorization: wx.getStorageSync('Token')
      },
      success(res) {
        _this.setData({
          info: res.data.Result
        })
        console.log(res.data.Result)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "账号管理"
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