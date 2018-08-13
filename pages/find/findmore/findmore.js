// pages/find/findmore/findmore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoplist: [],
    shopkind: [],
    kindId: 0,
    toView: 'red',
    scrollTop: 100,
    offset: 0,
    str: '',
    latitude: 30.5702,
    longitude: 104.06476,
    sortlist: [],
    maskShow: false
  },
shows () {
  this.setData({
    maskShow: true
  })
},
hide() {
  this.setData({
    maskShow: false
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    });
    // 初始商店数据
    this.init()
    // 获得分类数据
    this.getkind();
    // 获取位置
    this.getlocaltion();
    // this.sort();
  },
  // 排序方式
  sort() {
    wx.request({
      url: `https://h5.ele.me/restapi/shopping/v1/restaurants/outside_filter/attributes?longitude=${this.data.longitude}&latitude=${this.data.latitude}&terminal=h5`,
      success: (res) => {
        console.log(res)
      }
    })
  },
  // 初始值
  init () {
    wx.request({
      url: `https://h5.ele.me/restapi/shopping/v3/restaurants?longitude=${this.data.longitude}&latitude=${this.data.latitude}&keyword=&offset=0&limit=8&extras[]=activities&extras[]=tags&terminal=h5&rank_id=d15fa0e0e6344ab4ab52b649c101db75&brand_ids[]=&restaurant_category_ids[]=209&restaurant_category_ids[]=212&restaurant_category_ids[]=213&restaurant_category_ids[]=214&restaurant_category_ids[]=215&restaurant_category_ids[]=216&restaurant_category_ids[]=217&restaurant_category_ids[]=219&restaurant_category_ids[]=265&restaurant_category_ids[]=266&restaurant_category_ids[]=267&restaurant_category_ids[]=268&restaurant_category_ids[]=269&restaurant_category_ids[]=221&restaurant_category_ids[]=222&restaurant_category_ids[]=223&restaurant_category_ids[]=224&restaurant_category_ids[]=225&restaurant_category_ids[]=226&restaurant_category_ids[]=227&restaurant_category_ids[]=228&restaurant_category_ids[]=231&restaurant_category_ids[]=232&restaurant_category_ids[]=263&restaurant_category_ids[]=218&restaurant_category_ids[]=234&restaurant_category_ids[]=235&restaurant_category_ids[]=236&restaurant_category_ids[]=237&restaurant_category_ids[]=238&restaurant_category_ids[]=211&restaurant_category_ids[]=229&restaurant_category_ids[]=230&restaurant_category_ids[]=264`,
      success: (res) => {
        res.data.items.map((item, index) => {
          if (item.restaurant.image_path.substr(32) == 'png') {
            item.restaurant.image_path = `https://fuss10.elemecdn.com/${item.restaurant.image_path.substr(0, 1)}/${item.restaurant.image_path.substr(1, 2)}/${item.restaurant.image_path.substr(3)}.png?imageMogr/format/webp/`
          } else {
            item.restaurant.image_path = `https://fuss10.elemecdn.com/${item.restaurant.image_path.substr(0, 1)}/${item.restaurant.image_path.substr(1, 2)}/${item.restaurant.image_path.substr(3)}.jpeg?imageMogr/format/webp/`
          }
          item.isShow = false;
        })
        this.setData({
          shoplist: res.data.items
        })
        console.log(this.data.shoplist)
        wx.hideLoading()
      }
    })
  },
  // 获取分类 
  getkind() {
    wx.request({
      url: `https://h5.ele.me/restapi/shopping/v2/foods_page/sift_factors?entry_id=20004689&longitude=${this.data.longitude}&latitude=${this.data.latitude}&terminal=h5`,
      success: (res) => {
        this.setData({
          shopkind: res.data
        })
      }
    })
  },
  // 获取地址 
  getlocaltion() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log(res)
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
  },
  // 分类选择
  kind(e) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      kindId: e.target.dataset.index
    })
    var ids = e.target.dataset.item.restaurant_category_ids
    var str = this.data.str;
    ids.map((item, i) => {
      str += `&restaurant_category_ids[]=${item}`
    })
    this.setData({
      str: str
    })
    let url = `https://h5.ele.me/restapi/shopping/v3/restaurants?longitude=${this.data.longitude}&latitude=${this.data.latitude}&keyword=&offset=0&limit=8&extras[]=activities&extras[]=tags&terminal=h5&rank_id=${this.data.str}`;
    wx.request({
      url: url,
      success: (res) => {
        res.data.items.map((item, index) => {
          if (item.restaurant.image_path.substr(32) == 'png') {
            item.restaurant.image_path = `https://fuss10.elemecdn.com/${item.restaurant.image_path.substr(0, 1)}/${item.restaurant.image_path.substr(1, 2)}/${item.restaurant.image_path.substr(3)}.png?imageMogr/format/webp/`
          } else {
            item.restaurant.image_path = `https://fuss10.elemecdn.com/${item.restaurant.image_path.substr(0, 1)}/${item.restaurant.image_path.substr(1, 2)}/${item.restaurant.image_path.substr(3)}.jpeg?imageMogr/format/webp/`
          }
          item.isShow = false;
        })
        this.setData({
          shoplist: res.data.items
        })
        wx.hideLoading()
      }
    })
  },
  // 滚动到底部
  lower() {
    wx.showLoading({
      title: '加载中',
    })
    let offset = this.data.offset + 1;
    this.setData({
      offset: offset
    })
    let url = `https://h5.ele.me/restapi/shopping/v3/restaurants?longitude=${this.data.longitude}&latitude=${this.data.latitude}&keyword=&offset=${offset}&limit=8&extras[]=activities&extras[]=tags&terminal=h5&rank_id=${this.data.str}`;
    wx.request({
      url: url,
      success: (res) => {
        res.data.items.map((item, index) => {
          if (item.restaurant.image_path.substr(32) == 'png') {
            item.restaurant.image_path = `https://fuss10.elemecdn.com/${item.restaurant.image_path.substr(0, 1)}/${item.restaurant.image_path.substr(1, 2)}/${item.restaurant.image_path.substr(3)}.png?imageMogr/format/webp/`
          } else {
            item.restaurant.image_path = `https://fuss10.elemecdn.com/${item.restaurant.image_path.substr(0, 1)}/${item.restaurant.image_path.substr(1, 2)}/${item.restaurant.image_path.substr(3)}.jpeg?imageMogr/format/webp/`
          }
          item.isShow = false;
        })
        let arr = this.data.shoplist;
        arr = arr.concat(res.data.items);
        this.setData({
          shoplist: arr
        })
        setTimeout(() => {
          wx.hideLoading()
        }, 2000)
      }
    })
  },
  show(e) {
    let i = e.target.dataset.index;
    let arr = this.data.shoplist;
    arr[i].isShow = !arr[i].isShow;
    this.setData({
      shoplist: arr
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})