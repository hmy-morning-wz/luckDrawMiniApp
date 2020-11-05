import Store from './store';
import Tracker from '@tklc/miniapp-tracker-sdk'
import common from '/util/common'
import { getUserId, config } from '/util/service'
config({ appId: '2019021563231625' })

App(
  Store({
    userId: '',
    channel: '',
    activityIid: '',
    alipayId: '',
    formId: '',
    onLaunch(options) {
      Tracker.App.init({
        appId:'2019021563231625',// 区别不同小程序，可用小程序自己的appId
        appName: '趣抽奖',
        server:['https://webtrack.allcitygo.com:8088/event/upload'],
        version:'1.4.1',
        lauchOpts:options,
        bizScenario:this.channel,
        // mtrDebug:true
      },this) 
      if(options.query && options.query.channel){
        this.channel = options.query.channel
      }else if(options.referrerInfo && options.referrerInfo.extraData && options.referrerInfo.extraData.channel){
        this.channel = options.referrerInfo.extraData.channel
      }
      Tracker.Mtr.bizScenario = this.channel  
      if(options.query && options.query.activityId) {
        this.activityIid = options.query.activityId
      }     
      my.removeStorageSync({
        key: 'sesid',
      });
      my.removeStorageSync({
        key: 'hasAddress',
      });
      this.checkUpdate()
      // my.getAuthCode({
      //   success: (auth) => {
      //     my.request({
      //       url: `https://ech5.allcitygo.com/miniapp_login.do`,
      //       method: 'GET',
      //       data: {
      //         auth_code: auth.authCode,
      //         appid: '2019021563231625'
      //       },
      //       success: res => {
      //         this.alipayId = res.data.data.userId
      //         Tracker.setUserId(res.data.data.userId)
      //       }
      //     })
      //   },
      // });
      // console.log(options)
    },
    onShow(options) {
      // this.channel = (options.referrerInfo && options.referrerInfo.extraData) || null
    },
    // 获取缓存
    async getStorage(key) {
      let res = await common.getStorageSync({ key: key })
      console.log('getStorageSync', res)
      if (!res.success) {
        return JSON.stringify(res.data)
      } else {
        return false
      }
    },
    // 设置缓存
    setStorage(key, data) {
      my.setStorage({
        key: key,
        data: data,
        success: (res) => {
          console.log(res, '写入成功')
        }
      })
    },
    setUserId(alipayId) {
      this.alipayId = alipayId
      this.setStorage('alipayId', alipayId)
      //Tracker.setUserId(alipayId)
    },
    async loadUserId() {
      if (this.alipayId) {
        return { success: true }
      } else {
        if (!this.alipayId) {
          const alipayId = await common.getStorageSync({ key: 'alipayId' })
          console.log("getStorageSync", alipayId)
          if (alipayId && alipayId.success && alipayId.data && alipayId.data.length) {
            this.alipayId = alipayId.data
            return { success: true }
          }
        }
        if (!this.alipayId) {
          let userId = await getUserId()
          return { success: userId || false }
        }

        return { success: false }
      }
    },
    checkUpdate() {
      try {
        if (my.canIUse('getUpdateManager')) {

          const updateManager = my.getUpdateManager()
          updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log(res.hasUpdate)
          })
          updateManager.onUpdateReady(function () {
            my.confirm({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })

          updateManager.onUpdateFailed(function () {
            // 新版本下载失败
          })
        }
      } catch (err) {
        console.error(err)
      }
    },
  })
);
