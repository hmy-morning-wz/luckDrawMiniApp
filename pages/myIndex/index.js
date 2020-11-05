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
  },
  async onPullDownRefresh(){
    await this.dispatch('getMyInfo')
    my.stopPullDownRefresh()
  },
  async onShow() {

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
    this.dispatch('getMyInfo')

  },
  async onLoad() {
    app.Tracker.Page.init()
  },
  onReady() {
  },
  toAllDraw() {
    my.navigateTo({
      url: `../allDraw/index?activityId=31&type=0`
    })
  },
  luckRecord() {
    my.navigateTo({
      url: `../luckRecord/index?activityId=31&type=0`
    })
  },
  toBusCoupon() {
    my.navigateTo({
      url: `../busCoupon/index?giftCash=${this.data.myInfo.user_amt/100}`
    })
  },
  toCoop() {
    my.navigateTo({
      url: `../cooperation/index`
    })
  },
  toFreeBus() {
    my.navigateToMiniProgram({
      appId: '2019022863420364',
      // path: '',
      // extraData: {}
    })
  }
});
