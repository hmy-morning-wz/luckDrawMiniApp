import {
  request
} from '../util/service'
import minxins from '../util/mixins'

// 接口请求地址
// const path = '/prefer/icon/getByParam'
export default {
  // 获取icon 地址
  getIconList: async (params = {}) => {
    const originData = await request(`/api/marketing?cityCode=${params.cityCode}`, params, {
      on: false,
      data: {}
    }, 'get', {
        urlType: 'cardManageDomain'
      })
    // 数据处理
    // console.log('获取icon返回数据：', JSON.parse(originData.data.homePage));
    if (!originData.API_ERROR && originData.msg === 'SUCCESS' && originData.data) {
      return {
        success: true,
        data: originData.data
      }
    }
    my.hideLoading()
    minxins.showModal('showToast', {
      type: 'fail',
      title: '温馨提示',
      content: originData.errorMsg ? originData.errorMsg : '接口请求错误!'
    })
    return {
      success: false
    }
  },
  //获取
  getUserId: async (params = {}) => {
    let userId = '';
    var getJSON = function() {
      var promise = new Promise(function(resolve, reject) {
        my.getAuthCode({
          success: async (res) => {
            var auth = res.authCode
            // console.log(auth)
            const originData = await request(`/benefit-center/appUser/getAliUserByCityAuthCode/620100/home/${auth}`, {}, {
              on: false,
              data: {}
            }, 'get', {
                urlType: 'devDomain',
                headers: {
                  'content-type': 'application/json; charset=UTF-8'
                }, // headers 定制传输
                authType: false // 授权类型auth_base/auth_user
              })
            // 数据处理
            if (!originData.API_ERROR && originData.msg === 'Success' && originData.data) {
              resolve(originData.data)
              return {
                success: true
              }
            }
            my.hideLoading()
            minxins.showModal('showToast', {
              type: 'fail',
              title: '温馨提示',
              content: originData.errorMsg ? originData.errorMsg : '接口请求错误9!'
            })
            return {
              success: false
            }
          },
        })
      });
      return promise;
    };
    await getJSON().then(function(res) {
      userId = res
    }, function(error) {
      console.error('出错了', error);
    });
    return userId
  },
  //是否搜藏券接口
  getIsCollection: async (params = {}, userId) => {
    const obj = {
      "orderType": "20",
      "userId": userId,
      "userType": "2"
    }
    const originData = await request(`/voucher/voucher/judgeUserCollarVoucher`, obj, {
      on: false,
      data: {}
    }, 'post', {
        urlType: 'devDomain',
        headers: {
          'content-type': 'application/json; charset=UTF-8'
        }, // headers 定制传输
        authType: false // 授权类型auth_base/auth_user
      })
    // 数据处理
    if (!originData.API_ERROR && originData.msg === 'Success' && originData.data) {
      return {
        success: true,
        data: originData.data
      }
    }
    my.hideLoading()
    minxins.showModal('showToast', {
      type: 'fail',
      title: '温馨提示',
      content: originData.errorMsg ? originData.errorMsg : '接口请求错误4!'
    })
    return {
      success: false
    }
  },
  //发券接口
  sendCoupon: async (params = {}, userId) => {
    const obj = {
      "activityId": "20",
      "userId": userId,
    }
    const originData = await request(`/operation-activity/activityVoucher/send`, obj, {
      on: false,
      data: {}
    }, 'post', {
        urlType: 'devDomain',
        headers: {
          'content-type': 'application/json; charset=UTF-8'
        }, // headers 定制传输
        authType: false // 授权类型auth_base/auth_user
      })
    // 数据处理
    if (originData.msg === 'Success') {
      if (originData.code == 40004) {
        my.showToast({
          type: 'fail',
          content: originData.msg,
          duration: 500,
        });
      } else {
        my.showToast({
          type: 'success',
          content: '领取成功',
          duration: 500,
        });
      }
      return {
        success: true,
        // data: originData.data
      }
    }
    my.hideLoading()
    minxins.showModal('showToast', {
      type: 'fail',
      title: '温馨提示',
      content: originData.errorMsg ? originData.errorMsg : '接口请求错误!'
    })
    return {
      success: false
    }
  },
  //埋点接口
  saveDataTrack: async (params = {}, userId) => {
    const obj = {
      "bussType": 2,
      "channelId": 10,
      "channelPageId": 25,
      "operationType": 1,
      "pageId": 1,
      "userId": userId,
      "zoneId": 0
    }
    const originData = await request(`/data-track/dataTrack/saveZoneDataTrack`, obj, {
      on: false,
      data: {}
    }, 'post', {
        urlType: 'devDomain',
        headers: {
          'content-type': 'application/json; charset=UTF-8'
        }, // headers 定制传输
        authType: false // 授权类型auth_base/auth_user
      })
    // 数据处理
    if (originData.msg === 'Success') {
      return {
        success: true,
        // data: originData.data
      }
    }
    my.hideLoading()
    minxins.showModal('showToast', {
      type: 'fail',
      title: '温馨提示',
      content: originData.errorMsg ? originData.errorMsg : '接口请求错误4!'
    })
    return {
      success: false
    }
  },
}
