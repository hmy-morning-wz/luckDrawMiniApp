import store from './store'
import CONFIG from '../../util/config'
import mixins from '../../util/mixins';

const createPage = function (options) {
  return Page(store.register(options))
};
const app = getApp();
createPage({
  onShareAppMessage(e) {
    // console.log('from' + e.target)
    return {
      title: '',
      desc: '',
      path: 'pages/index/index',
      success: () => {
      }
    };
  },
  data: {    
    tabs: [
      { title: '待开奖' },
      { title: '已结束' },
    ],
    activeTab: 0
  },
  async onLoad(query) {
    my.showLoading();

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
    await this.dispatch('allDraw')
    await this.dispatch('luckRecord')

  },
  async onShow() {
  },
  onReady() {
  },
  toTapTap(e) {
    this.setData({
      activeTab: e.currentTarget.dataset.index,
    });
  },
  toDraw() {
    my.switchTab({
      url: `../index/index`
    })
  },
  handleClick(e) {
    my.navigateTo({
      url: `../lotteryDetail/index?activityId=${e.currentTarget.dataset.obj.activity_id}`
    })
  }
});
