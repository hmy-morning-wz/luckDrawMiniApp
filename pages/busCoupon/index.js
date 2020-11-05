import store from './store'
import CONFIG from '../../util/config'
import mixins from '../../util/mixins';

const createPage = function (options) {
  return Page(store.register(options))
};
const order = ['blue', 'red', 'green', 'yellow'];
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
    tabs: [
      { title: '兑换乘车券' },
      { title: '我的乘车券' },
    ],
    activeTab: 0,
    giftCash: '',
    toView: 'red',
    scrollTop: 100,
  },
  async onLoad(query) {
    my.showLoading();
    this.setData({
      giftCash: query.giftCash
    })

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
    await this.dispatch('couponList')
    await this.dispatch('myCoupons')

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
      url: `../couponDetail/index?start_time=${e.currentTarget.dataset.obj.start_time}&end_time=${e.currentTarget.dataset.obj.end_time}&id=${e.currentTarget.dataset.obj.id}`
    })
  },
  toConvert(e) {
    my.navigateTo({
      url: `../couponConvert/index?id=${e.currentTarget.dataset.obj.id}&giftCash=${this.data.giftCash}`
    })
  },
  upper(e) {
    console.log(e);
  },
  lower(e) {
    console.log(e);
  },
  scroll(e) {
    // console.log(e.detail.scrollTop);
  },
  scrollToTop(e) {
    console.log(e);
    this.setData({
      scrollTop: 0,
    });
  },
});
