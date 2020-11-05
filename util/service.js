import TinyAppHttp from './TinyAppHttp';

//const sessionIdName = 'tklc'
import getDomain from './env';
// import mixins from './mixins';
import {
  getAuthCode,
  silenceAuthCode
} from './auth';

var tinyAppHttp = new TinyAppHttp({
  //appId:''
  hostBaseUrl:'https://ztmanage.allcitygo.com:8192'//'https://sit-basic-ug.allcitygo.com'
})

export async function getUserId(){
   return tinyAppHttp.getUserId()
}

export async function getToken(){
    return tinyAppHttp.getToken()
}
/**
 *
 * @param {接口地址} url
 * @param {接口入参} data
 * @param {mock数据，on 开关， data，mock的数据} mock
 * @param {请求方式，默认get} method
 * @param {业务参数控制} businessConfig
 */
export async function request(
  url = '', // 请求地址
  data = {}, // 请求参数
  mock = {
    on: false, // 是否启用mock数据
    data: {} // mock 开启时返回该参数
  },
  method = 'get', // 请求方式
  businessConfig = {
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      'version': '1.3'
    }
  }
) {
  if (mock.on) {
    return new Promise(resolve => {
      resolve(mock.data);
    });
  }
  let res = null

  url = (businessConfig.urlType && getDomain(businessConfig.urlType) || "") + url;
  try {
    if (businessConfig.authType === 'auth_base') {
      const {
        authCode
      } = await silenceAuthCode();
      data = { ...data,
        authCode
      };
    }

    res = await tinyAppHttp[method]({
      url,
      data,
      businessConfig
    })
    
    return {
      API_ERROR: false,
      ...res
    }
  } catch (e) {
  }
   

  return res || {
    API_ERROR: true
  };
}

export function config(config){
  tinyAppHttp.config(config)
}