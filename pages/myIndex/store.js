import Store from 'herculex'
import CONFIG from '../../services/config'
import USER from '../../services/user'
import MYINFO from '../../services/myInfo'
import DETAIL from './myInfo'
import BASE, { alipayAppId } from '../../util/config'
export default new Store({
  connectGlobal: true, // 是否关联global
  state: {
    userId: '',
    myInfo: DETAIL.myInfo,
  },
  mutations: {
    USER_ID: (state, config) => {
      state.userId = config
      // state.userId = '6e198fd71f94407480814fcf4c2911b9'
    },
    SET_MY_INFO: (state, config) => {
      state.myInfo = config
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
    async getMyInfo({ commit, state }) {
      const { success, data } = await MYINFO.getMyInfo(state.userId)
      if (success && data) {
        commit('SET_MY_INFO', data)
      }
    },
  }
})
