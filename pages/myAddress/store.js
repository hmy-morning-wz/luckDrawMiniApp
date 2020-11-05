import Store from 'herculex'
import CONFIG from '../../services/config'
import USER from '../../services/user'
import LUCKDRAW from '../../services/luckDraw'
import BASE, { alipayAppId } from '../../util/config'
export default new Store({
  connectGlobal: true, // 是否关联global
  state: {
    userId: '',
    activityId: '',
    user_list: [],
    totalNum: '',
    has_next_page: true,
    type: '0',
    address: {
      user_name: '',
      address: '',
      mobile: '',
      postcode: ''
    },
    saveSucc: false
  },
  mutations: {
    USER_ID: (state, config) => {
      state.userId = config
    },
    ACTIVITY_ID: (state, config) => {
      state.activityId = config.activityId
      state.type = config.type
    },
    // 设置用户地址
    SET_ADDRESS: (state, config) => {
      if(config != null) {
        state.address = config
      }
    },
    // 新增用户地址
    ADD_ADDRESS: (state, config) => {
      state.saveSucc = true
    },
  },
  actions: {
    async getUserId({ commit }) {
      const data = await USER.getUserId()
      commit('USER_ID', data.sesid)
    },
    async getUserInfo({ commit }) {
      const data = await USER.getUserInfo()
      commit('USER_ID', data.sesid)
    },
    async getAddress({ commit, state }) {
      const { success, data } = await LUCKDRAW.getAddress(state.userId)
      if (success && data) {
        commit('SET_ADDRESS', data)
      }
    },
    async addAddress({ commit, state }) {
      var params = {
        userId: state.userId,
        activity_id: state.activityId,
      }
      var obj = Object.assign(params,state.address)
      const { success, data } = await LUCKDRAW.addAddress(params)
      if (success) {
        my.showToast({
          type: 'success',
          content: '地址保存成功',
          duration: 1000,
          success: () => {
          },
        });
        my.setStorageSync({
          key: 'hasAddress', // 缓存数据的key
          data: true, // 要缓存的数据
        });
        setTimeout(() => {
          my.navigateBack({
            delta: 1
          })
        }, 100);          
      }
    },
  }
})
