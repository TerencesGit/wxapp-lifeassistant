Page({
    onLoad() {
        wx.setNavigationBarTitle({
            title: '出行服务'
        })
        // wx.getSetting({
        //     success(res) {
        //         if (!res.authSetting['scope.werun']) {
        //             wx.authorize({
        //                 scope: 'scope.werun',
        //                 success() {
        //                     wx.getWeRunData({
        //                         success(res) {
        //                             console.log(res)
        //                             const encryptedData = res.encryptedData;
        //                             wx.showToast({title: res.encryptedData})
        //                         }

        //                     })
        //                 }
        //             })
        //         }
        //     }
        // })
    }
})