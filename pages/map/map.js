//获取应用实例
const app = getApp()
const amapFile = require('../../libs/amap-wx.js');
const config = require('../../libs/config.js');
let markersData = [];
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {},
    city: ''
  },
  onLoad (e) {
    wx.setNavigationBarTitle({
      title: '当前位置'
    })
    let that = this;
    let key = config.Config.key;
    const myAmapFun = new amapFile.AMapWX({key: key});
    let params = {
      iconPathSelected: '../../img/marker-selected.png',
      iconPath: '../../img/marker.png',
      success (data){
        console.log(data)
        markersData = data.markers;
        let poisData = data.poisData;
        let markers_new = [];
        markersData.forEach((item, index) => {
          markers_new.push({
            id: item.id,
            latitude: item.latitude,
            longitude: item.longitude,
            iconPath: item.iconPath,
            width: 16,
            height: 16
          })
        })
        if(markersData.length > 0) {
          that.setData({
            markers: markers_new
          });
          that.setData({
            latitude: markersData[0].latitude,
            longitude: markersData[0].longitude
          });
          that.showMarkerInfo(markersData,0);
        } else {
          wx.getLocation({
            type: 'gcj02',
            success(res) {
              that.setData({
                latitude: res.latitude
              });
              that.setData({
                longitude: res.longitude
              });
              that.setData({
                city: '北京市'
              });
            },
            fail: function(){
              that.setData({
                latitude: 39.909729
              });
              that.setData({
                longitude: 116.398419
              });
              that.setData({
                city: '北京市'
              });
            }
          })
          that.setData({
            textData: {
              name: '抱歉，未找到结果',
              desc: ''
            }
          });
        }
      },
      fail (info){
        wx.showModal({title:info.errMsg})
      }
    }
    if(e && e.keywords) {
      this.setData({
        city: e.keywords
      })
      params.querykeywords = e.keywords
    }
    myAmapFun.getPoiAround(params)
  },
  makertap(e) {
    // console.log(e)
    let id = e.markerId;
    this.showMarkerInfo(markersData, id);
    this.changeMarkerColor(markersData, id);
  },
  bindInput(e) {
    var that = this;
    var url = '../search/search';
    if(e.target.dataset.latitude && e.target.dataset.longitude && e.target.dataset.city){
      var dataset = e.target.dataset;
      url = url + '?lonlat=' + dataset.longitude + ',' + dataset.latitude + '&city=' + dataset.city;
    }
    wx.redirectTo({
      url: url
    })
  },
  showMarkerInfo(data, i){
    let that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },
  changeMarkerColor(data, i) {
    let that = this;
    let markers = [];
    for(let j = 0; j < data.length; j++){
      if(j==i){
        data[j].iconPath = "../../img/marker-selected.png";
      }else{
        data[j].iconPath = "../../img/marker.png";
      }
      data[j].width = 16;
      data[j].height = 16;
      markers.push(data[j]);
    }
    that.setData({
      markers: markers
    });
  }
})
