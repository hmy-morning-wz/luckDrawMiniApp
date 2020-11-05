import store from './store'

const createPage = function (options) {
  return Page(store.register(options))
};
const app = getApp();
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
    cooperation_info: ''
  },
  async onLoad(query) {
    let res = my.getStorageSync({ key: 'sesid' }).data;
    if (!res) {
      await this.dispatch('getUserId')
    } else {
      const userId = res
      this.commit('USER_ID', userId)
    }
  },
  async onShow() {
  },
  onReady() {
  },
  formSubmit(e) {
    if(!e.detail.value.cooperation_info){
      my.showToast({
        type: 'fail',
        content: '信息不能为空',
        duration: 1000,
        success: () => {
        },
      });
      return
    }
    this.setData({
      cooperation_info: e.detail.value.cooperation_info
    })
    // console.log(e.detail.value.cooperation_info)
    my.showLoading();
    this.dispatch('addCooperation')
  }
});
