//index.js
var util = require('../../utils/util.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    home_rank: [],
    index: '',
    starProcess: []
  },
  onLoad: function () {
    this.getInfo()
  },
  //事件处理函数
  // 展开更多活动
  showMore:function (event) {
    let curIndex = event.currentTarget.dataset.index;
    let arr = this.data.home_rank;
    arr[curIndex].isShow = !arr[curIndex].isShow;
    this.setData({
      home_rank: arr
    })
  },
  // 获取页面显示初始值
  getInfo:function () {
    wx.request({
      url: 'https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=30.548963&longitude=104.045507&offset=0&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=&terminal=h5',
      success: (res) => {
        res.data.items.map((item, index) => {
          if (item.restaurant.image_path.substr(32) == 'png') {
            item.restaurant.image_path = `https://fuss10.elemecdn.com/${item.restaurant.image_path.substr(0, 1)}/${item.restaurant.image_path.substr(1, 2)}/${item.restaurant.image_path.substr(3)}.png?imageMogr/format/webp/`
          } else {
            item.restaurant.image_path = `https://fuss10.elemecdn.com/${item.restaurant.image_path.substr(0, 1)}/${item.restaurant.image_path.substr(1, 2)}/${item.restaurant.image_path.substr(3)}.jpeg?imageMogr/format/webp/`
          }
          item.isShow = false;
          item.rating = item.restaurant.rating*100/5
        })
        this.setData({
          home_rank: res.data.items
        })
        let ratingarr = []
        for (var i = 0; i < this.data.home_rank.length;i++) {
          ratingarr.push(this.data.home_rank[i].restaurant.rating)
          for (var j=0;j<ratingarr.length;j++) {
            if (i==j) {
              this.setData({
                starProcess: this.data.home_rank[i].restaurant.rating * 100 / 5
              })
            }
          }                                                                                                                                                     
        }
      }
    })
  },
  // 综合排序
  foodsSort: function () {
    wx.showModal({
      title: '测试'
    })
  }
})
