import Store from 'herculex'
import CONFIG from '../../services/config'
import USER from '../../services/user'
import LUCKDRAW from '../../services/luckDraw'
import BASE , { alipayAppId } from '../../util/config'
export default new Store({
  connectGlobal: true, // 是否关联global
  state: {
    userId: '',
    activityId: '',
    user_list: [],
    totalNum: '',
    has_next_page: true,
    type: '0'
  },
  mutations: {
    USER_ID: (state, config) => {
      state.userId = config
      // state.userId = '6e198fd71f94407480814fcf4c2911b9'
    },
    ACTIVITY_ID:  (state, config) => {
      state.activityId = config.activityId
      state.type = config.type
    },
    // 清空用户列表
    RESET_USER_LIST: (state) => {
      state.user_list = []
      state.totalNum = 0
      state.has_next_page = false
    },
    // 获取用户列表
    SET_USER_LIST: (state, config) => {
      state.user_list = state.user_list.concat(config.list)
      // debugger
      state.totalNum = config.total
      state.has_next_page = config.has_next_page
    },
  },
  actions: {
    async getUserId ({ commit }) {
      const data = await USER.getUserId()
      commit('USER_ID', data)
    },
    async getUserInfo ({ commit }) {
      const data = await USER.getUserInfo()
      commit('USER_ID', data.sesid)
    },
    async getUserList ({ commit, state }) {
      const params = {
        userId: state.userId,
        activityId: state.activityId,
        page: state.page,
        size: '90',
        type: state.type,
        award_id: state.award_id
      }
      const { success, data } = await LUCKDRAW.getUserList(params)
      if (success) {
        // 抽奖详情信息
        commit('SET_USER_LIST', data)
      }
    },
  }
})
