// pages/find/find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    discover: null,
    xianshi: [],
    foodkind: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 获取位置
  getlocaltion () {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
      }
    })
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.getlocaltion();
    wx.request({
      url: 'https://h5.ele.me/restapi/member/v1/discover?platform=1&block_index=0',
      success: (res) => {
        let arr = res.data[1]
        arr.map((item, index) => {
          item.main_pic_hash = `https://fuss10.elemecdn.com/${item.main_pic_hash.substr(0, 1)}/${item.main_pic_hash.substr(1, 2)}/${item.main_pic_hash.substr(3)}.jpeg?imageMogr/format/webp/`
        })
        this.setData({
          discover:arr
        })
      }
    })
    wx.request({
      url: 'https://h5.ele.me/restapi/member/gifts/suggest',
      success: (res) => {
        let arr = res.data
        arr.map((item, index) => {
          item.image_hash = `https://fuss10.elemecdn.com/${item.image_hash.substr(0, 1)}/${item.image_hash.substr(1, 2)}/${item.image_hash.substr(3)}.jpeg?imageMogr/format/webp/`
        })
        this.setData({
          xianshi: arr
        })
      }
    })
    wx.request({
      url: 'https://h5.ele.me/restapi/shopping/openapi/entries?latitude=34.715816&longitude=113.652418&templates[]=main_template&templates[]=favourable_template&templates[]=svip_template&terminal=h5',
      success: (res) => {
        var arr = []
        let one = res.data[0].entries.slice(0,8);
        let two = res.data[0].entries.splice(8);
        one.map((item, index) => {
          item.image_hash = `https://fuss10.elemecdn.com/${item.image_hash.substr(0, 1)}/${item.image_hash.substr(1, 2)}/${item.image_hash.substr(3)}.jpeg?imageMogr/format/webp/`
        })
        two.map((item, index) => {
          item.image_hash = `https://fuss10.elemecdn.com/${item.image_hash.substr(0, 1)}/${item.image_hash.substr(1, 2)}/${item.image_hash.substr(3)}.jpeg?imageMogr/format/webp/`
        })
        arr[0] = one;
        arr[1] = two
        this.setData({
          foodkind: arr
        })
        console.log(this.data.foodkind)
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onready')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onshow')
  },

  /**
   * 生命周期函数--监听页面隐藏 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    console.log('onhide')
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