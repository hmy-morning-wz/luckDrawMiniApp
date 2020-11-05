import Store from 'herculex'
import CONFIG from '../../services/config'
import USER from '../../services/user'
import LUCKDRAW from '../../services/luckDraw'
import DETAIL from './lotteryDetail'
import BASE , { alipayAppId } from '../../util/config'
export default new Store({
  connectGlobal: true, // 是否关联global
  state: {
    alipayAppId,
    userId: '',
    lotteryDetail: {},
    // lotteryDetail: DETAIL.lotteryDetail,
    activityId: '',
    coupon_id: '',
    is_full: 0,
    bot_ad: '',
    lead_ad: '',
    description: ''
  },
  mutations: {
    USER_ID: (state, config) => {
      state.userId = config
      // state.userId = '6e198fd71f94407480814fcf4c2911b9'
    },
    ACTIVITY_ID:  (state, config) => {
      state.activityId = config.activityId
    },
    SET_LOTTERY_DETAIL: (state, config) => {
      state.lotteryDetail = config
      if(config.curr_user_award && config.curr_user_award.win_code_info){
        state.description = config.curr_user_award.win_code_info.instruction.split('；')
      }
    },
    //助力奖金池
    SET_ASSISTANCE: (state, config) => {
      state.lotteryDetail.pond_btn_flag = '2'
      state.lotteryDetail.award.pond_info.curr_amt = config
    },
    // 参与抽奖
    SET_DRAW_LUCK: (state, config) => {
      // debugger
      state.lotteryDetail.draw_btn_flag = '2'
      state.lotteryDetail.user_list = config.user_icon_list
      state.lotteryDetail.user_list_num = config.join_count
      state.is_full = config.is_full
      if(state.lead_ad) {
        state.showModal = true
      }
    },
    // 分享成功增加概率
    SET_SHARE: (state, config) => {
      // debugger
      state.lotteryDetail.draw_btn_flag = '3'
    },
    // 填写地址后
    HAS_ADDRESS: (state, config) => {
      state.lotteryDetail.curr_user_award.is_address='0'
    },
    // 填写地址后
    COUPON_ID: (state, config) => {
      state.coupon_id = config.lottery_id
    },
    //领取乘车券
    SET_COUPON_RECIEVE: (state, config) => {
      state.lotteryDetail.curr_user_award.is_get_bus_coupon = 1
      state.lotteryDetail.curr_user_award.bus_coupon_info[0].bus_coupon_start = config.bus_coupon_start
      state.lotteryDetail.curr_user_award.bus_coupon_info[0].bus_coupon_end = config.bus_coupon_end
      state.lotteryDetail.curr_user_award.bus_coupon_info[0].bus_coupon_template_id = config.bus_coupon_template_id
    },
    // 底部广告
    SET_BOT_AD: (state, config) => {
      state.bot_ad = config
    },
    // 抽奖后引导广告
    SET_LEAD_AD: (state, config) => {
      state.lead_ad = config
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
    async getLotteryDetail ({ commit, state }) {
      const params = {
        userId: state.userId,
        activityId: state.activityId
      }
      const { success, data } = await LUCKDRAW.getLotteryDetail(params)
      if (success) {
        // 抽奖详情信息
        commit('SET_LOTTERY_DETAIL', data)
      }
    },
    async increasePond ({ commit, state }) {
      const params = {
        userId: state.userId,
        activityId: state.activityId
      }
      const { success, data } = await LUCKDRAW.increasePond(params)
      if (success) {
        // 助力奖金池
        my.showToast({
          type: 'success',
          content: '助力成功',
          duration: 2000,
          success: () => {
          },
        });
        commit('SET_ASSISTANCE', data)
      }
    },
    async toDrawLuck ({ commit, state }) {
      const params = {
        userId: state.userId,
        activityId: state.activityId,
        myFormId: state.myFormId
      }
      const { success, data } = await LUCKDRAW.toDrawLuck(params)
      if (success) {
        // 参与抽奖
        if(!state.lead_ad) {
          my.showToast({
            type: 'success',
            content: '参与成功',
            duration: 2000,
            success: () => {
            },
          });
        }        
        commit('SET_DRAW_LUCK', data)
      }
    },
    async shareSucc ({ commit, state }) {
      const params = {
        userId: state.userId,
        activityId: state.activityId
      }
      const { success, data } = await LUCKDRAW.shareSucc(params)
      if (success) {
        // 分享增加概率
        commit('SET_SHARE', data)
      }
    },
    async receiveCoupon ({ commit, state }) {
      console.log(state.coupon_id)
      const params = {
        userId: state.userId,
        lottery_id: state.coupon_id
      }
      const { success, data } = await LUCKDRAW.receiveCoupon(params)
      if (success) {
      }
    },
    async receiveBusCoupon ({ commit, state }) {
      const params = {
        userId: state.userId,
        activityId: state.activityId
      }
      const { success, data } = await LUCKDRAW.receiveBusCoupon(params)
      if (success) {
        my.showToast({
          type: 'success',
          content: '领取成功',
          duration: 1000,
          success: () => {
          },
        });
        commit('SET_COUPON_RECIEVE', data)
      }
    },
    // 详情页底部广告
    async getBotAd ({ commit, state }) {
      const { success, data } = await LUCKDRAW.getBotAd()
      if (success && data) {
        // 抽奖详情信息
        commit('SET_BOT_AD', data)
      }
    },
    // 抽奖后引导广告
    async getLeadAd ({ commit, state }) {
      const params = {
        userId: state.userId,
        activityId: state.activityId
      }
      const { success, data } = await LUCKDRAW.getLeadAd(params)
      if (success && data) {
        // 抽奖详情信息
        commit('SET_LEAD_AD', data)
      }
    },
  }
})
