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
    luckRecord: []
  },
  mutations: {
    USER_ID: (state, config) => {
      state.userId = config
    },
    SET_LUCK_RECORD: (state, config) => {
      state.luckRecord = config
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
    async luckRecord({ commit, state }) {
      const { success, data } = await MYINFO.luckRecord(state.userId)
      if (success && data) {
        commit('SET_LUCK_RECORD', data)
      }
    },
  }
})
