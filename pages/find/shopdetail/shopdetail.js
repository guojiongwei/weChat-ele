// pages/find/shopdetail/shopdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodlist: [],
    active: 0,
    detail: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options)
  wx.request({
    url: `https://www.ele.me/restapi/shopping/v2/menu?restaurant_id=159228632&terminal=web`,
    success: (res) => {
      console.log(res)
      this.setData({
        foodlist: res.data
      })
    }
  })
  wx.request({
    url: `https://h5.ele.me/restapi/shopping/restaurant/159228632?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&ubt_ssid=9xsaziar8mjl4bhik72lyoo65wrrrtf6_2018-07-17& _utrace=154c7ebd6763090be05259f003174635_2018-07-18&track_id=1531894046|67cd4c386fcbae967e90cb1210a5fe6da20e9cc265c9cfc7a8|1ed6e774efc40ae873247687735bb09c&USERID=595925450&SID=0pYongkPVEWyFyzieTa01U13GGEUXcWnzEUA&terminal=h5`,
    success: (res) => {
      console.log(res.data.image_path.substr(32))
      res.data.image_path = `https://fuss10.elemecdn.com/${res.data.image_path.substr(0, 1)}/${res.data.image_path.substr(1, 2)}/${res.data.image_path.substr(3)}.${res.data.image_path.substr(32)}?imageMogr/format/webp/thumbnail/!40p/blur/50x40/`
      this.setData({
        detail: res.data
      })
      console.log(this.data.detail)
    }
  })
  },
  // tab切换
  change (e) {
    this.setData({
      active: e.target.dataset.active
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