import { request } from '../util/service';
import { lotteryList } from './mock/lotteryList.mock';
import { lotteryDetail } from './mock/lotteryDetail.mock';
import minxins from '../util/mixins';

export default {
  // 获取首页抽奖列表
  getLotteryList: async (auth_code) => {
    // 接口请求地址
    const path = '/api/activity/draw';
    const originData = await request(path, {auth_code},
      { on: false, data: lotteryList }, 'get',
      {
        urlType: 'cardManageDomain',
        headers: {
          'sesid': ''
        },
      });
    // 数据处理
    // 如果接口错误，直接把错误返回，如果接口正常，则把数据中的data返回
    // console.log('----- service getLotteryList originData -----', originData);
    if (!originData.API_ERROR && originData.code === '0' && originData.data) {
      return {
        success: true,
        data: originData.data
      };
    }
    my.hideLoading();
    minxins.showModal('showToast', { type: 'fail', title: '温馨提示', content: originData.message ? originData.message : '接口请求出错!' });
    return { success: false };
  },

  // 获取抽奖详情信息
  getLotteryDetail: async (params) => {
    // 接口请求地址
    const activity_id = params.activityId
    const path = `/api/activity/draw/detail/${activity_id}`;
    const originData = await request(path, {},
      { on: false, data: lotteryDetail }, 'get',
      {
        urlType: 'cardManageDomain',
        headers: {
          'sesid': `${params.userId}`
        },
      });
    // 数据处理
    // 如果接口错误，直接把错误返回，如果接口正常，则把数据中的data返回
    // console.log('----- service getLotteryDetail originData -----', originData);
    if (!originData.API_ERROR && originData.code === '0' && originData.data) {
      return {
        success: true,
        data: originData.data
      };
    }
    my.hideLoading();
    minxins.showModal('showToast', { type: 'fail', title: '温馨提示', content: originData.message ? originData.message : '接口请求出错!' });
    return { success: false };
  },

  // 助力奖池
  increasePond: async (params) => {
    // 接口请求地址
    const activity_id = params.activityId
    const path = `/api/ponduser/add`;
    const originData = await request(path, {activity_id},
      { on: false, data: lotteryDetail }, 'get',
      {
        urlType: 'cardManageDomain',
        headers: {
          'sesid': `${params.userId}`
        },
      });
    // 数据处理
    // 如果接口错误，直接把错误返回，如果接口正常，则把数据中的data返回
    // debugger
    // console.log('----- service increasePond originData -----', originData);
    if (!originData.API_ERROR && originData.code === '0' && originData.data) {
      return {
        success: true,
        data: originData.data
      };
    }
    my.hideLoading();
    minxins.showModal('showToast', { type: 'fail', title: '温馨提示', content: originData.message ? originData.message : '接口请求出错!' });
    return { success: false };
  },

  // 参与抽奖
  toDrawLuck: async (params) => {
    // 接口请求地址
    const activity_id = params.activityId
    const form_id = params.myFormId
    const path = `/api/activityuser/join`;
    const originData = await request(path, {activity_id,form_id},
      { on: false, data: lotteryDetail }, 'get',
      {
        urlType: 'cardManageDomain',
        headers: {
          'sesid': `${params.userId}`
        },
      });
    // 数据处理
    // 如果接口错误，直接把错误返回，如果接口正常，则把数据中的data返回
    // console.log('----- service toDrawLuck originData -----', originData);
    if (!originData.API_ERROR && originData.code === '0' && originData.data) {
      return {
        success: true,
        data: originData.data
      };
    }
    my.hideLoading();
    minxins.showModal('showToast', { type: 'fail', title: '温馨提示', content: originData.message ? originData.message : '接口请求出错!' });
    return { success: false };
  },

  // 活动分享成功增加概率
  shareSucc: async (params) => {
    // 接口请求地址
    const activity_id = params.activityId
    const path = `/api/share/add`;
    const originData = await request(path, {activity_id},
      { on: false, data: lotteryDetail }, 'get',
      {
        urlType: 'cardManageDomain',
        headers: {
          'sesid': `${params.userId}`
        },
      });
    // 数据处理
    // 如果接口错误，直接把错误返回，如果接口正常，则把数据中的data返回
    // console.log('----- service shareSucc originData -----', originData);
    if (!originData.API_ERROR && originData.code === '0') {
      return {
        success: true,
        data: originData.message
      };
    }
    my.hideLoading();
    minxins.showModal('showToast', { type: 'fail', title: '温馨提示', content: originData.message ? originData.message : '接口请求出错!' });
    return { success: false };
  },

  // 获取特定的用户列表
  getUserList: async (params) => {
    // 接口请求地址
    const activity_id = params.activityId
    const type = params.type
    const page = params.page
    const size = params.size
    const award_id = params.award_id
    const ts = Date.parse(new Date())
    const path = `/api/activityuser/joinlist`;
    const originData = await request(path, {activity_id,type,award_id,page,size},
      { on: false, data: lotteryDetail }, 'get',
      {
        urlType: 'cardManageDomain',
        headers: {
          'sesid': `${params.userId}`
        },
      });
    // 数据处理
    // 如果接口错误，直接把错误返回，如果接口正常，则把数据中的data返回
    // console.log('----- service getUserList originData -----', originData);
    if (!originData.API_ERROR && originData.code === '0' && originData.data) {
      return {
        success: true,
        data: originData.data
      };
    }
    my.hideLoading();
    minxins.showModal('showToast', { type: 'fail', title: '温馨提示', content: originData.message ? originData.message : '接口请求出错!' });
    return { success: false };
  },

  // 获取用户地址
  getAddress: async (userId) => {
    // 接口请求地址
    const path = `/api/address/newest`;
    const originData = await request(path, {},
      { on: false, data: lotteryDetail }, 'get',
      {
        urlType: 'cardManageDomain',
        headers: {
          'sesid': `${userId}`
        },
      });
    // 数据处理
    // 如果接口错误，直接把错误返回，如果接口正常，则把数据中的data返回
    // console.log('----- service getAddress originData -----', originData);
    if (!originData.API_ERROR && originData.code === '0') {
      return {
        success: true,
        data: originData.data
      };
    }
    my.hideLoading();
    minxins.showModal('showToast', { type: 'fail', title: '温馨提示', content: originData.message ? originData.message : '接口请求出错!' });
    return { success: false };
  },

  // 新增用户地址
  addAddress: async (params) => {
    // 接口请求地址
    const path = `/api/address/add`;
    const userId = params.userId
    delete params.userId
    const originData = await request(path, params,
      { on: false, data: lotteryDetail }, 'post',
      {
        urlType: 'cardManageDomain',
        headers: {
          'content-type': 'application/json; charset=UTF-8',
          'sesid': `${userId}`
        },
      });
    // 数据处理
    // 如果接口错误，直接把错误返回，如果接口正常，则把数据中的data返回
    // console.log('----- service addAddress originData -----', originData);
    if (!originData.API_ERROR && originData.code === '0') {
      return {
        success: true,
        data: originData.data
      };
    }
    my.hideLoading();
    minxins.showModal('showToast', { type: 'fail', title: '温馨提示', content: originData.message ? originData.message : '接口请求出错!' });
    return { success: false };
  },

  // 点击卡券领取入口
  receiveCoupon: async (params) => {
    // 接口请求地址
    const path = `/api/lottery/receive/${params.lottery_id}`;
    const userId = params.userId
    const originData = await request(path, {},
      { on: false, data: lotteryDetail }, 'post',
      {
        urlType: 'cardManageDomain',
        headers: {
          'content-type': 'application/json; charset=UTF-8',
          'sesid': `${userId}`
        },
      });
    // 数据处理
    // 如果接口错误，直接把错误返回，如果接口正常，则把数据中的data返回
    // console.log('----- service addAddress originData -----', originData);
    if (!originData.API_ERROR && originData.code === '0') {
      return {
        success: true,
        data: originData.data
      };
    }
    my.hideLoading();
    minxins.showModal('showToast', { type: 'fail', title: '温馨提示', content: originData.message ? originData.message : '接口请求出错!' });
    return { success: false };
  },
  
  // 领取奖品乘车券
  receiveBusCoupon: async (params) => {
    // 接口请求地址
    const activity_id = params.activityId
    const path = `/api/coupons/prize_exchange/${activity_id}`;
    const originData = await request(path, {},
      { on: false, data: lotteryDetail }, 'get',
      {
        urlType: 'cardManageDomain',
        headers: {
          'sesid': `${params.userId}`
        },
      });
    // 数据处理
    // 如果接口错误，直接把错误返回，如果接口正常，则把数据中的data返回
    // debugger
    // console.log('----- service increasePond originData -----', originData);
    if (!originData.API_ERROR && originData.code === '0' && originData.data) {
      return {
        success: true,
        data: originData.data
      };
    }
    my.hideLoading();
    minxins.showModal('showToast', { type: 'fail', title: '温馨提示', content: originData.message ? originData.message : '接口请求出错!' });
    return { success: false };
  },

  // 获取首页弹框广告
  getPopAd: async (alipayId) => {
    // 接口请求地址
    const path = '/api/activity/popup';
    const originData = await request(path, {alipayId},
      { on: false, data: lotteryList }, 'get',
      {
        urlType: 'cardManageDomain',
        headers: {
          'sesid': ''
        },
      });
    // 数据处理
    // 如果接口错误，直接把错误返回，如果接口正常，则把数据中的data返回
    // console.log('----- service getLotteryList originData -----', originData);
    if (!originData.API_ERROR && originData.code === '0' && originData.data) {
      return {
        success: true,
        data: originData.data
      };
    }
    my.hideLoading();
    if(originData.code == '401') {
      minxins.showModal('showToast', { content:  '登录中' });
    } else {
      minxins.showModal('showToast', { type: 'fail', title: '温馨提示', content: originData.message ? originData.message : '接口请求出错!' });
    }
    return { success: false };
  },
  
  // 获取详情页底部广告
  getBotAd: async () => {
    // 接口请求地址
    const path = '/api/activity/bottom';
    const originData = await request(path, {},
      { on: false, data: lotteryList }, 'get',
      {
        urlType: 'cardManageDomain',
        headers: {
          'sesid': ''
        },
      });
    // 数据处理
    // 如果接口错误，直接把错误返回，如果接口正常，则把数据中的data返回
    // console.log('----- service getLotteryList originData -----', originData);
    if (!originData.API_ERROR && originData.code === '0') {
      return {
        success: true,
        data: originData.data
      };
    }
    my.hideLoading();
    minxins.showModal('showToast', { type: 'fail', title: '温馨提示', content: originData.message ? originData.message : '接口请求出错!' });
    return { success: false };
  },
    
  // 参与抽奖后的引导广告
  getLeadAd: async (params) => {
    // 接口请求地址
    const activity_id = params.activityId
    const path = '/api/activity/lead';
    const originData = await request(path, {activity_id},
      { on: false, data: lotteryList }, 'get',
      {
        urlType: 'cardManageDomain',
        headers: {
          'sesid': `${params.userId}`
        },
      });
    // 数据处理
    // 如果接口错误，直接把错误返回，如果接口正常，则把数据中的data返回
    // console.log('----- service getLotteryList originData -----', originData);
    if (!originData.API_ERROR && originData.code === '0') {
      return {
        success: true,
        data: originData.data
      };
    }
    my.hideLoading();
    minxins.showModal('showToast', { type: 'fail', title: '温馨提示', content: originData.message ? originData.message : '接口请求出错!' });
    return { success: false };
  },
}
