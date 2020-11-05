import store from './store'
import CONFIG from '../../util/config'
import mixins from '../../util/mixins';

const createPage = function (options) {
  return Page(store.register(options))
};
const app = getApp();
var wxParse = require('../wxParse/wxParse.js');
createPage({
  onShareAppMessage() {
    return {
      title: '',
      desc: '',
      path: 'pages/index/index',
      success: () => {
      }
    };
  },
  data: {
    page: 1,
    errorTel: false
  },
  async onLoad(query) {
    my.showLoading();
    console.log(query)
    const actid = {
      activityId: '31',
      type: '0'
    }
    this.commit('ACTIVITY_ID', query)

    // await this.dispatch('$global:updateSystemInfo')
    let res = my.getStorageSync({ key: 'sesid' }).data;
    if (!res) {
      await this.dispatch('getUserInfo')
      app.userId = this.data.userId
      my.setStorageSync({
        key: 'sesid', // 缓存数据的key
        data: this.data.userId, // 要缓存的数据
      });
    } else {
      const userId = res
      this.commit('USER_ID', userId)
    }
    this.dispatch('getAddress')

  },
  async onShow() {
  },
  onReady() {
  },
  telFocus() {
    this.setData({
      errorTel: false
    })
  },
  formSubmit: function (e) {
    if (!mixins.verifyTel(e.detail.value.mobile)) {
      this.setData({
        errorTel: true
      })
      return
    }
    if (!(e.detail.value.user_name && e.detail.value.postcode && e.detail.value.address)) {
      my.showToast({
        type: 'fail',
        content: '有信息未填写',
        duration: 2000,
        success: () => {
        },
      });
      return
    }
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    this.setData({
      address: e.detail.value
    })
    my.confirm({
      title: '温馨提示',
      content: '您是否确认收货人信息，确认后此次中奖收货人信息将无法变更',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: async (result) => {
        if (result.confirm) {
          my.showLoading();
          await this.dispatch('addAddress')
        }
      },
    });
    // this.dispatch('getAddress')
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
});
