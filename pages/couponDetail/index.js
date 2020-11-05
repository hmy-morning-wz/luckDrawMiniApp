import store from './store'
import CONFIG from '../../util/config'
import mixins from '../../util/mixins';

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
    start_time: '',
    end_time: '',
    description: []
  },
  async onLoad(query) {
    my.showLoading();
    await this.commit('SET_COUPON_ID', query)
    await this.dispatch('getDetail')
    // console.log(JSON.parse(this.data.detail.voucher_description))
    this.setData({
      start_time: query.start_time,
      end_time: query.end_time,
      description: JSON.parse(this.data.detail.voucher_description)
    })
    // await this.dispatch('myCoupons')

  },
  async onShow() {
  },
  onReady() {
  },
});
