const amapFile = require('../../libs/amap-wx.js');
const config = require('../../libs/config.js');
Page({
    data: {
        tips: {},
        city: ''
    },
    onLoad(e) {
      wx.setNavigationBarTitle({
        title: '搜索周边'
      })
      if(e && e.city) {
        this.setData({
          city: e.city
        })
      }
    },
    bindInput: function(e){
        let that = this;
        let keywords = e.detail.value; 
        let key = config.Config.key;
        const myAmapFun = new amapFile.AMapWX({key: key});
        myAmapFun.getInputtips({
          keywords: keywords,
          location: '',
          success: function(data){
            if(data && data.tips){
              that.setData({
                tips: data.tips
              });
            }
          }
        })
      },
      bindSearch: function(e){
        let keywords = e.target.dataset.keywords;
        wx.navigateTo({
          url: '../around/around?keywords=' + keywords
        })
      }
})