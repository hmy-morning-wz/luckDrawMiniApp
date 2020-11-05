import Store from 'herculex'
import CONFIG from '../../services/config'
import USER from '../../services/user'
import MYINFO from '../../services/myInfo'
import DETAIL from './couponDetail'
import BASE, { alipayAppId } from '../../util/config'
export default new Store({
  connectGlobal: true, // 是否关联global
  state: {
    userId: '',
    detail: [],//DETAIL.detail,
    id: ''
  },
  mutations: {
    SET_COUPON_ID: (state, config) => {
      state.id = config.id
    },
    SET_DETAIL: (state, config) => {
      state.detail = config
    },
  },
  actions: {
    async getDetail({ commit, state }) {
      const { success, data } = await MYINFO.getCouponDetail(state)
      if (success && data) {
        commit('SET_DETAIL', data)
      }
    },
  }
})
