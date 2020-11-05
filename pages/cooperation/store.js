import Store from 'herculex'
import USER from '../../services/user'
import MYINFO from '../../services/myInfo'
export default new Store({
  connectGlobal: true, // 是否关联global
  state: {
    userId: '',
  },
  mutations: {
    USER_ID: (state, config) => {
      state.userId = config
    },
  },
  actions: {
    async getUserId({ commit }) {
      const data = await USER.getUserId()
      commit('USER_ID', data.sesid)
    },
    async addCooperation({ commit, state }) {
      var params = {
        userId: state.userId,
        cooperation_info: state.cooperation_info,
      }
      const { success, data } = await MYINFO.addCooperation(params)
      if (success) {
        my.showToast({
          type: 'success',
          content: '提交成功',
          duration: 1000,
          success: () => {
          },
        });
        setTimeout(() => {
          my.navigateBack({
            delta: 1
          })
        }, 1000);        
      }
    },
  }
})
