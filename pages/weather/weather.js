// const amapFile = require('../../libs/amap-wx.js');
const bmap = require('../../libs/bmap-wx.min.js');
const config = require('../../libs/config.js');
Page({
    data: {
        city: '',
        humidity: '',
        liveData: {},
        temperature: '',
        weather: '',
        winddirection: '',
        windpower: '',
        weatherData: {},
        liveData: {},
        weatherData: '' 
    },
    onLoad() {
        wx.setNavigationBarTitle({
            title: '天气查询'
        })
        let that = this;
        let key = config.Config.key;
        const BMap = new bmap.BMapWX({ak: key});
        BMap.weather({
            success(data) {
                console.log(data)
            }
        })
        // myAmapFun.getWeather({
        //     success(data) {
        //         console.log(data)
        //         let weatherData = data;
        //         let liveData = weatherData.liveData;
        //         delete weatherData.liveData;
        //         that.setData({
        //             weatherData,
        //             liveData
        //         })
        //     }
        // })
    }
})