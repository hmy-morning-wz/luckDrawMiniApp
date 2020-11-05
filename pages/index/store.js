import Store from 'herculex'
import CONFIG from '../../services/config'
import LUCKDRAW from '../../services/luckDraw'
import USER from '../../services/user'
import LIST from './lotteryList'
export default new Store({
  connectGlobal: true, // 是否关联global
  state: {
    lotteryList: '',
    isLoading: true,
    popAd: {
      flag: 0
    }
  },
  mutations: {
    SET_LOTTERY_LIST: (state, config) => {
      state.lotteryList = config
      // state.lotteryList = LIST.lotteryList
    },
    IS_LOADING: (state, config) => {
      state.isLoading = config
    },
    SET_POP_AD: (state,config) => {
      state.popAd = config
      state.showModal = state.popAd.flag==0 ? true : false
    }
  },
  actions: {
    async getLotteryList ({ commit, state }) {
      commit('IS_LOADING', true)
      my.showLoading();
      my.getAuthCode({
        success: async (res) => {
          var auth_code = res.authCode
          const { success, data } = await LUCKDRAW.getLotteryList(auth_code)
          if (success && data) {
            // 首页抽奖列表 配置
            commit('SET_LOTTERY_LIST', data)
            commit('IS_LOADING', false)
          }
        }
      })
    },
    async getPopAd ({ commit, state }, alipayId) {
      const { success, data } = await LUCKDRAW.getPopAd(alipayId)
      if (success && data) {
        // 首页弹框广告
        commit('SET_POP_AD', data)
      }
    },
  }
})
