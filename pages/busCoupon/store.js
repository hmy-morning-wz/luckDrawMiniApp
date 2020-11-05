import Store from 'herculex'
import CONFIG from '../../services/config'
import USER from '../../services/user'
import MYINFO from '../../services/myInfo'
import DRAWLIST from './drawList'
import BASE, { alipayAppId } from '../../util/config'
export default new Store({
  connectGlobal: true, // 是否关联global
  state: {
    userId: '',
    // busCouponList: DRAWLIST.busCouponList,
    // myCouponList: DRAWLIST.myCouponList,
    busCouponList: [],
    myCouponList: []
  },
  mutations: {
    USER_ID: (state, config) => {
      state.userId = config
      // state.userId = '6e198fd71f94407480814fcf4c2911b9'
    },
    SET_COUPON_LIST: (state, config) => {
      state.busCouponList = config
    },
    SET_MY_COUPON: (state, config) => {
      state.myCouponList = config
    },
  },
  actions: {
    async getUserId({ commit }) {
      const data = await USER.getUserId()
      commit('USER_ID', data)
    },
    async getUserInfo({ commit }) {
      const data = await USER.getUserInfo()
      commit('USER_ID', data.sesid)
    },
    async couponList({ commit, state }) {
      const { success, data } = await MYINFO.couponList(state.userId)
      if (success && data) {
        commit('SET_COUPON_LIST', data)
      }
    },
    async myCoupons({ commit, state }) {
      const obj = {
        // page: '1',
        // size: '6',
        userId: state.userId
      }
      const { success, data } = await MYINFO.myCoupons(obj)
      if (success && data) {
        commit('SET_MY_COUPON', data)
      }
    },
  }
})
