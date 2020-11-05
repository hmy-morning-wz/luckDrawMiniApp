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
    drawList: [],// DRAWLIST.drawList,
    luckRecord: [],// DRAWLIST.luckRecord
  },
  mutations: {
    USER_ID: (state, config) => {
      state.userId = config
      // state.userId = '6e198fd71f94407480814fcf4c2911b9'
    },
    SET_DRAW_LIST: (state, config) => {
      state.drawList = config
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
    async allDraw({ commit, state }) {
      const { success, data } = await MYINFO.allDraw(state.userId,1)
      if (success && data) {
        commit('SET_DRAW_LIST', data)
      }
    },
    async luckRecord({ commit, state }) {
      const { success, data } = await MYINFO.allDraw(state.userId,2)
      if (success && data) {
        commit('SET_LUCK_RECORD', data)
      }
    },
  }
})
