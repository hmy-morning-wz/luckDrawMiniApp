import { request } from '../util/service';
import { lotteryList } from './mock/lotteryList.mock';
import minxins from '../util/mixins';

export default {
  //获取userId
  getUserId: async (params = {}) => {
    let userId = '';
    var getJSON = function () {
      var promise = new Promise(function (resolve, reject) {
        my.getAuthCode({
          success: async (res) => {
            var authcode = res.authCode
            // console.log(authcode)
            const originData = await request(`/api/user/auth`, {authcode}, {
              on: false,
              data: lotteryList
            }, 'post', {
                urlType: 'devDomain',
                headers: {
                  'content-type': 'application/json; charset=UTF-8'
                }, // headers 定制传输
                authType: false // 授权类型auth_base/auth_user
              })
              // debugger
            // 数据处理
            if (!originData.API_ERROR && originData.code === '0' && originData) {
              resolve(originData.data)
              return {
                success: true
              }
            }
            // my.hideLoading()
            minxins.showModal('showToast', {
              type: 'fail',
              title: '温馨提示',
              content: originData.message ? originData.message : '接口请求错误!'
            })
            return {
              success: false
            }
          },
        })
      });
      return promise;
    };
    await getJSON().then(function (res) {
      userId = res
    }, function (error) {
      console.error('出错了', error);
    });
    return userId
  },
  //获取userInfo
  getUserInfo: async (params = {}) => {
    let userInfo = '';
    var getJSON = function () {
      var promise = new Promise(function (resolve, reject) {
        my.getAuthCode({
          scopes: 'auth_user',
          success: async (res) => {
            var authcode = res.authCode
            // console.log(authcode)
            const originData = await request(`/api/user/auth`, {authcode}, {
              on: false,
              data: lotteryList
            }, 'post', {
                urlType: 'devDomain',
                headers: {
                  'content-type': 'application/json; charset=UTF-8'
                }, // headers 定制传输
                authType: false // 授权类型auth_base/auth_user
              })
              // debugger
            // 数据处理
            if (!originData.API_ERROR && originData.code === '0' && originData) {
              resolve(originData.data)
              return {
                success: true
              }
            }
            // my.hideLoading()
            minxins.showModal('showToast', {
              type: 'fail',
              title: '温馨提示',
              content: originData.message ? originData.message : '接口请求错误!'
            })
            return {
              success: false
            }
          },
          fail: (res) => {
            my.showToast({
              content: '未授权'
            });
          }
        })
      });
      return promise;
    };
    await getJSON().then(function (res) {
      userInfo = res
    }, function (error) {
      console.error('出错了', error);
    });
    return userInfo
  },
}
