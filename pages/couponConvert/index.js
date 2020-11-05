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
    description: [],
    num: '0',
    giftCash: '',
    totalAmt: '0.0'
  },
  async onLoad(query) {
    my.showLoading();
    await this.commit('SET_COUPON_ID', query)
    await this.dispatch('getDetail')
    // console.log(JSON.parse(this.data.detail.voucher_description))
    this.setData({
      giftCash: query.giftCash,
      // totalAmt: this.data.detail.amt*this.data.num,
      description: JSON.parse(this.data.detail.voucher_description)
    })
    let res = my.getStorageSync({ key: 'sesid' }).data;
    if (!res) {
      await this.dispatch('getUserInfo')
      my.setStorageSync({
        key: 'sesid', // 缓存数据的key
        data: this.data.userId, // 要缓存的数据
      });
    } else {
      const userId = res
      this.commit('USER_ID', userId)
    }

  },
  async onShow() {
  },
  onReady() {
  },
  increaseNum() {
    if(Number(this.data.detail.amt*(this.data.num+1)) > Number(this.data.giftCash)){
      my.showToast({
        content: '礼金不足',
        duration: 1000,
      });
      return
    }
    this.setData({
      num: Number(this.data.num)+1,
      totalAmt: (this.data.detail.amt*Number(this.data.num+1)).toFixed(1)
    })
  },
  reduceNum() {
    if(this.data.num=='0'){
      my.showToast({
        content: '不可再减少',
        duration: 1000,
      });
      return
    }
    this.setData({
      num: this.data.num-1,
      totalAmt: (this.data.detail.amt*(this.data.num-1)).toFixed(1)
    })
  },
  toCovert() {
    if(this.data.num == '0'){
      return
    } else {
      my.confirm({
        content: '确认兑换？',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        success: async (result) => {
          if (result.confirm) {
            my.showLoading();
            this.dispatch('couponConvert')
          }
        },
      });
    }
  }
});
