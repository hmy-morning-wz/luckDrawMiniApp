import store from './store'

const createPage = function(options) {
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
    page: 1,
    award_id: ''
  },
  async onLoad(query) {
    my.showLoading();
    console.log(query)
    // const actid = {
    //   activityId: '31',
    //   type: '0'
    // }
    this.commit('ACTIVITY_ID', query)
    this.commit('RESET_USER_LIST')
    if(query.type=='0'){
      my.setNavigationBar({
        title: '参与抽奖用户',
      })
    }
    if(query.type=='1'){
      this.setData({
        award_id: query.award_id
      })
    }
    
    // await this.dispatch('$global:updateSystemInfo')
    let res = my.getStorageSync({ key: 'sesid' }).data;
    if(!res) {
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
    await this.dispatch('getUserList') // 获取用户列表
        
  },
  async onShow() {
  },
  onReady() {
  },
  seeMore() {
    this.setData({
      page: this.data.page+1,
    });
    my.showLoading();
    this.dispatch('getUserList')
  }
});
