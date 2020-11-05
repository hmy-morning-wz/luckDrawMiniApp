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
    USER_ID: (state, config) => {
      state.userId = config
    },
    SET_COUPON_ID: (state, config) => {
      state.id = config.id
    },
    SET_DETAIL: (state, config) => {
      state.detail = config
    },
  },
  actions: {
    async getUserInfo({ commit }) {
      const data = await USER.getUserInfo()
      commit('USER_ID', data.sesid)
    },
    async getDetail({ commit, state }) {
      const { success, data } = await MYINFO.getCouponDetail(state)
      if (success && data) {
        commit('SET_DETAIL', data)
      }
    },
    async couponConvert({ commit, state }) {
      const obj ={
        id: state.id,
        num: state.num,
        userId: state.userId
      }
      const { success, data } = await MYINFO.couponConvert(obj)
      if (success) {
        my.redirectTo({
          url: `../convertSucc/index`
        })
      }
    },
  }
})
