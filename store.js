import { GlobalStore } from 'herculex'
// import mixins from './util/mixins';
// import { getAuthUserInfo, silenceAuthCode } from './util/auth';
import { cardType } from './util/config'
import USER from './services/user'
import common from '/util/common'
export default new GlobalStore({
  state: {
    cardStatus: true,
    systemInfo: null,
    cardInfo: '',
    userId: ''
  },
  mutations: {
    UPDATE_SYSTEM: (state, sys) => {
      // console.log('设置系统信息', sys)
      state.systemInfo = sys
    },
    TEST: (state, sys) => {
      state.cardInfo = sys
    },
    USER_ID: (state, config) => {
      state.userId = config.userId
    },
  },
  actions: {
    // 获取系统信息
    async updateSystemInfo({ commit }) {
      console.log('updateSystemInfo->')
      let res = await common.getSystemInfoSync() // 阻塞式获取系统信息
      console.log('getSystemInfoSync', res)
      let version = res.version.replace('.', '').replace('.', '')
      if (parseInt(version) < 10132) {
        my.showToast({
          type: 'success',
          content: '您当前支付宝版本过低，须更新'
        })
        my.canIUse('ap.updateAlipayClient')
        my.ap.updateAlipayClient()
      } else {
        version = my.SDKVersion.replace('.', '').replace('.', '')
        if (parseInt(version) < 1110) {// 1.11.0
          my.showToast({
            type: 'success',
            content: '您当前支付宝基础库版本过低，须更新'
          })
          my.canIUse('ap.updateAlipayClient') && my.ap.updateAlipayClient()
        }
      }
      // console.log('成功获取系统信息', res)
      commit('UPDATE_SYSTEM', res)
    },
    /**
     * 本地mock演示
     */
    async updateCardStatus({ commit }, payload) {
      commit('UPDATE_CARD_STATUS', { cardStatus: payload });
    },
    /**
     * 将乘车权益数据放在全局
     */
    async setRightsDatas({ commit }, payload) {
      commit('SET_RIGHTS_DATAS', { rightsDatas: payload });
    },
    /**
     * 将城市资讯放在全局
     */
    async setNewsDatas({ commit }, payload) {
      commit('SET_NEWS_DATAS', { newsDatas: payload });
    },
    async getUserId ({ commit }) {
      // debugger
      const userId = await USER.getUserId()
      
      commit('USER_ID', {userId})
    },
  }
});
