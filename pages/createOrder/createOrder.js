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
    create:{
    BeiZhu: [
        {}
        ]
        },
    isUseYe:false,
    yzm:'',
    modalHiddenT:true,
    modalHidden:true,
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    six: '',
    psd: '',
    qy:"企业",
    gr:"个人",
    flagV:{},
    flag:{},
    flagT:{},
    flagNum:{},
   info:{},
   peopleInfo:{},
  },
  choseFp(e){
    let flag = "flag[" + e.currentTarget.dataset.index + "]"
    this.setData({
      [flag]: false
    })
  },
  choseFpNo(e){
    let flag = "flag[" + e.currentTarget.dataset.index + "]"
    let flagT = "flagT[" + e.currentTarget.dataset.index + "]"
    let flagV = "flagV[" + e.currentTarget.dataset.index + "]"
    let Type = "create.BeiZhu[" + e.currentTarget.dataset.index + "].Type"
    this.setData({
      [flag]: true,
      [flagT]:false,
      [flagV]:"",
      [Type]:2
    })
  },
  choseBalance(){
   this.setData({
     isUseYe: !this.data.isUseYe
   })
  },
  showFor(){
  this.setData({
    modalHidden:true,
    modalHiddenT:false
  })
  },
  getYzm() {
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/User/SendCode',
      header: {
        Authorization: wx.getStorageSync('Token')
      },
      success(res) {
        if (res.data.Status === 1) {
          wx.showToast({
            title: '发送成功',
          })
        }
      }
    })
  },
  gety(e) {
    this.setData({
      yzm: e.detail.value
    })
  },  
  modalChange(){
    let _this=this
  _this.setData({
    psd: (_this.data.one + _this.data.two + _this.data.three + _this.data.four + _this.data.five + _this.data.six)
  })
  if(_this.data.psd==''){
    wx.showModal({
      title: '提示',
      content: '请输入密码',
    })
  }else{
    if (_this.data.modalHidden === false && _this.data.isUseYe === true) {
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
          _this.onLoad()
          if (res.data.Result == "余额不足") {
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
                        res.data.Result = JSON.parse(res.data.Result)
                        wx.requestPayment({
                          timeStamp: res.data.Result.timeStamp,
                          nonceStr: res.data.Result.nonceStr,
                          package: res.data.Result.package,
                          signType: 'MD5',
                          paySign: res.data.Result.paySign,
                          success(res) {
                            console.log("调用支付接口成功")
                          },
                          fail(res) {
                            console.log(res)
                          }
                        })
                      }
                    }
                  })
                } else {
                  console.log("aa")
                }
              }
            })
          } else if (res.data.Result == "支付密码错误") {
            wx.showToast({
              title: '支付密码错误',
            })
          } else {
            wx.showModal({
              title: '成功',
              content: '支付成功，即将进入首页',
            })
            setTimeout(function () {
              wx.switchTab({
                url: '../../pages/home/home',
              })
            }, 1500)
          }
        }
      })
    } else if (_this.data.modalHidden === false && _this.data.isUseYe === false) {
      wx.request({
        url: 'https://jznj.nbxuanma.com/api/Home/PayOrder',
        header: {
          Authorization: wx.getStorageSync('Token')
        },
        data: {
          OrderID: _this.data.OrderID,
          UseBalance: false,
          ThirdPayType: 2,
        },
        success(res) {
          _this.onLoad()
          _this.setData({
            modalHidden: true
          })
          if (res.data.Status === 1) {
            res.data.Result = JSON.parse(res.data.Result)
            wx.requestPayment({
              timeStamp: res.data.Result.timeStamp,
              nonceStr: res.data.Result.nonceStr,
              package: res.data.Result.package,
              signType: 'MD5',
              paySign: res.data.Result.paySign,
              success(res) {
                console.log("调用支付接口成功")
              },
              fail(res) {
                console.log(res)
              }
            })
          }
        }
      })
    }
    else {
      if (_this.data.yzm !== '') {
        wx.request({
          url: 'https://jznj.nbxuanma.com/api/User/ChangePayPassword',
          header: {
            Authorization: wx.getStorageSync('Token')
          },
          data: {
            code: _this.data.yzm,
            payPassword: hexMD5(_this.data.psd)
          },
          success(res) {
            if (res.data.Status === 1) {
              wx.showToast({
                title: '修改密码成功',
              })
              _this.setData({
                modalHiddenT: true,
                modalHidden: false,
                one: '',
                two: '',
                three: '',
                four: '',
                five: '',
                six: '',
                oneFocus: true,
                twoFocus: false,
                threeFocus: false,
                fourFocus: false,
                fiveFocus: false,
                sixFocus: false,
              })
            } else {
              wx.showToast({
                title: '验证码错误',
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: '请输入验证码',
        })
      }
    }
  }
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
  closeT(){
  this.setData({
    modalHidden:true,
    modalHiddenT:true
  })
    this.onLoad()
  },
  close() {
    this.setData({
      modalHidden:true,
      yzm:'',
      one: '',
      two: '',
      three: '',
      four: '',
      five: '',
      six: '',
      psd: '',
    })
    this.onLoad()
  },
  writeBz(e){
    let Msg = "create.BeiZhu[" + e.currentTarget.dataset.index + "].Msg"
    let BuinessID = "create.BeiZhu[" + e.currentTarget.dataset.index + "].BuinessID"
    let Type = "create.BeiZhu[" + e.currentTarget.dataset.index + "].Type"
    this.setData({
      [Msg]: e.detail.value,
      [BuinessID]: e.target.dataset.id,
      [Type]: parseInt(e.target.dataset.type)  
    })
  },
  writeName(e){
    let Name = "create.BeiZhu[" + e.currentTarget.dataset.index + "].Name"
    this.setData({
      [Name]: e.detail.value
    })
  },
  writeNum(e){
    let TaxNumber = "create.BeiZhu[" + e.currentTarget.dataset.index + "].TaxNumber"
    this.setData({
      [TaxNumber]: e.detail.value
    })
  },
  createOrder(){
   let _this=this
    if (JSON.stringify(_this.data.create.BeiZhu[0])=="{}"){
     wx.showModal({
       title: '提示',
       content: '请填写您的备注',
     })
   }else{
     wx.request({
       url: 'https://jznj.nbxuanma.com/api/Home/CreateOrder?AddressID=' + _this.data.info.Consignee.AddressID,
       method: 'post',
       header: {
         Authorization: wx.getStorageSync('Token')
       },
       data:
         JSON.stringify(_this.data.create)
       ,
       success(res) {
         if (res.data.Status === 1) {
           _this.setData({
             modalHidden: false,
             OrderID: res.data.Result
           })
           wx.showToast({
             title: '订单已提交',
           })
         }else{
           wx.showModal({
             title: '提示',
             content: res.data.Result,
           })
         }
       }
     })
   }
  },
  choseQy(e){
    let flagT = "flagT[" + e.currentTarget.dataset.index + "]"
    let flagV = "flagV[" + e.currentTarget.dataset.index + "]"
    let flagNum = "flagNum[" + e.currentTarget.dataset.index + "]"
    let InvoiceType = "create.BeiZhu[" + e.currentTarget.dataset.index + "].InvoiceType"
    let Type = "create.BeiZhu[" + e.currentTarget.dataset.index + "].Type"
    this.setData({
    [flagT]: false,
    [flagV]:"企业",
    [InvoiceType]: 1,
    [Type]:e.target.dataset.type,
    [flagNum]:true
  })

  },
  choseGr(e){
    let flagT = "flagT[" + e.currentTarget.dataset.index + "]"
    let flagV = "flagV[" + e.currentTarget.dataset.index + "]"
    let flagNum = "flagNum[" + e.currentTarget.dataset.index + "]"
    let InvoiceType = "create.BeiZhu[" + e.currentTarget.dataset.index + "].InvoiceType"
    let Type = "create.BeiZhu[" + e.currentTarget.dataset.index + "].Type"
    this.setData({
      [flagT]:false,
      [flagV]:"个人",
      [InvoiceType]: 0,
      [Type]: e.target.dataset.type,
      [flagNum]: false
    })
  },
  chose(e){
    let flagT = "flagT[" + e.currentTarget.dataset.index + "]"
    this.setData({
      [flagT]: true,
    })
  },
  gotoAddress(){
    wx.navigateTo({
      url: '../../pages/address/address',
    })
  },
  getMsg(){
  let _this=this
    wx.request({
      url: 'https://jznj.nbxuanma.com/api/Address/GetListByPage',
      header: {
        Authorization: wx.getStorageSync('Token')
      },
      data: {
        pageIndex: 1
      },
      success(res) {
        let a = res.data.Result.Data
        a.map((item) => {
          if (item.IsDefault == true) {
            _this.setData({
              peopleInfo: item
            })
          }
        })
        wx.request({
          url: 'https://jznj.nbxuanma.com/api/Home/OrderPreview',
          header: {
            Authorization: wx.getStorageSync('Token')
          },
          data: {
            AddressID: _this.data.peopleInfo.ID
          },
          success(res) {
            if (res.data.Status === -1) {
              _this.setData({
                info: ""
              })
            } else if (res.data.Status == 1) {
              _this.setData({
                info: res.data.Result
              })
            } else {
              console.log("未知错误")
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '提交订单',
    })
  this.getMsg();
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