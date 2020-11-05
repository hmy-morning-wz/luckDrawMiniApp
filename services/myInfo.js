import { request } from '../util/service';
import { lotteryList } from './mock/lotteryList.mock';
import minxins from '../util/mixins';

export default {
  // 获取用户地址
  getMyInfo: async (userId) => {
    // 接口请求地址
    const path = `/api/user/info`;
    const originData = await request(path, {},
      { on: false, data: lotteryList }, 'get',
      {
        urlType: 'cardManageDomain',
        headers: {
          'sesid': `${userId}`
        },
      });
    // 数据处理
    // 如果接口错误，直接把错误返回，如果接口正常，则把数据中的data返回
    // console.log('----- service getMyInfo originData -----', originData);
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

  // 获取用户全部抽奖（待开奖）
  allDraw: async (userId,type) => {
    // 接口请求地址
    const path = `/api/user/draw`;
    const originData = await request(path, {type},
      { on: false, data: lotteryList }, 'get',
      {
        urlType: 'cardManageDomain',
        headers: {
          'sesid': `${userId}`
        },
      });
    // 数据处理
    // 如果接口错误，直接把错误返回，如果接口正常，则把数据中的data返回
    // console.log('----- service allDraw originData -----', originData);
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

  // 获取用户中奖记录
  luckRecord: async (userId) => {
    // 接口请求地址
    const path = `/api/user/lucky`;
    const originData = await request(path, {},
      { on: false, data: lotteryList }, 'get',
      {
        urlType: 'cardManageDomain',
        headers: {
          'sesid': `${userId}`
        },
      });
    // 数据处理
    // 如果接口错误，直接把错误返回，如果接口正常，则把数据中的data返回
    // console.log('----- service luckRecord originData -----', originData);
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

  // 获取可兑换的乘车券
  couponList: async (userId) => {
    // 接口请求地址
    const path = `/api/coupons/list`;
    const originData = await request(path, {},
      { on: false, data: lotteryList }, 'get',
      {
        urlType: 'cardManageDomain',
        headers: {
          'sesid': `${userId}`
        },
      });
    // 数据处理
    // 如果接口错误，直接把错误返回，如果接口正常，则把数据中的data返回
    // console.log('----- service couponList originData -----', originData);
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

  // 获取我的乘车券
  myCoupons: async (config) => {
    // 接口请求地址
    const path = `/api/coupons/user/lucky`;
    const originData = await request(path, {},
      { on: false, data: lotteryList }, 'post',
      {
        urlType: 'cardManageDomain',
        headers: {
          'content-type': 'application/json; charset=UTF-8',
          'sesid': `${config.userId}`
        },
      });
    // 数据处理
    // 如果接口错误，直接把错误返回，如果接口正常，则把数据中的data返回
    // console.log('----- service myCoupons originData -----', originData);
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

  // 获取乘车券详情
  getCouponDetail: async (config) => {
    // 接口请求地址
    const path = `/api/coupons/detail/${config.id}`;
    const originData = await request(path, {},
      { on: false, data: lotteryList }, 'get',
      {
        urlType: 'cardManageDomain',
        headers: {
          'sesid': `${config.userId}`
        },
      });
    // 数据处理
    // 如果接口错误，直接把错误返回，如果接口正常，则把数据中的data返回
    // console.log('----- service getCouponDetail originData -----', originData);
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

  // 兑换乘车券
  couponConvert: async (config) => {
    const userId = config.userId
    delete config.userId
    // 接口请求地址
    const path = `/api/coupons/exchange`;
    const originData = await request(path, config,
      { on: false, data: lotteryList }, 'post',
      {
        urlType: 'cardManageDomain',
        headers: {
          'content-type': 'application/json; charset=UTF-8',
          'sesid': `${userId}`
        },
      });
    // 数据处理
    // 如果接口错误，直接把错误返回，如果接口正常，则把数据中的data返回
    // console.log('----- service couponConvert originData -----', originData);
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

  // 提交商户申请
  addCooperation: async (params) => {
    // 接口请求地址
    const path = `/api/cooperation/add`;
    const userId = params.userId
    delete params.userId
    const originData = await request(path, params,
      { on: false, data: lotteryList }, 'post',
      {
        urlType: 'cardManageDomain',
        headers: {
          'content-type': 'application/json; charset=UTF-8',
          'sesid': `${userId}`
        },
      });
    // 数据处理
    // 如果接口错误，直接把错误返回，如果接口正常，则把数据中的data返回
    // console.log('----- service addCooperation originData -----', originData);
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
