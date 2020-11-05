import store from './store'
import { getUserId, getToken } from '../../util/service'
const createPage = function (options) {
  return Page(store.register(options))
};
const app = getApp();
createPage({
  onShareAppMessage() {
    return {
      title: '',
      desc: '',
      path: 'pages/index/index'
    };
  },
  data: {
    url: '' // h5链接
  },
  async onLoad(query) {
    // console.log(query)
    // await app.loadUserId()
    var zhongUrl = query.url;
    var p;
    for(p in query){
      if( p != 'url'){
        if (query[p]){
          zhongUrl += '&'+p+'='+query[p];
        }
      }
    }
    if(zhongUrl.indexOf('{userId}')) {
      zhongUrl = zhongUrl.replace('{userId}',app.alipayId)
    }
    if (zhongUrl.indexOf('{formId}')) {
      zhongUrl = zhongUrl.replace('{formId}', app.formId)
    }
    this.setData({
      url: zhongUrl
    })
    console.log(this.data.url)
  },
  // 接收来自H5的消息
  async onMessage(e) {
    console.log(e); //{'sendToMiniProgram': '0'}
    let msg = e.detail
    let param = {}
    let ret
    if (msg && msg.method)
      switch (msg.method) {
        case 'openCardDetail':
          my.openCardDetail(msg.param)
          ret = true
          break;
        case 'openCardList':
          my.openCardList(msg.param)
          ret = true
          break;
        case 'openKBVoucherDetail':
          my.openKBVoucherDetail(msg.param)
          ret = true
          break;
        case 'openMerchantCardList':
          my.openMerchantCardList(msg.param)
          ret = true
          break;
        case 'openMerchantVoucherList':
          my.openMerchantVoucherList(msg.param)
          ret = true
          break;
        case 'openTicketDetail':
          my.openTicketDetail(msg.param)
          ret = true
          break;
        case 'openTicketList':
          my.openTicketList(msg.param)
          ret = true
          break;
        case 'openMerchantTicketList':
          my.openMerchantTicketList(msg.param)
          ret = true
          break;
        case 'openVoucherDetail':
          my.openVoucherDetail(msg.param)
          ret = true
          break;
        case 'openVoucherList':
          my.openVoucherList(msg.param)
          ret = true
          break;
        case 'jumpToBusCode':
          app.cardType && jumpToBusCode(app.cardType)
          ret = true
          break
        case 'reportAnalytics':
          msg.param && msg.param.seed && my.reportAnalytics(msg.param.seed, msg.param.data || {})
          ret = true
          break

        case 'jumpToPage':
          msg.param && app.handleNavigate(msg.param)
          ret = true
          break

        case 'makePhoneCall':
          msg.param && my.makePhoneCall({ number: '' + msg.param.number })
          ret = true
          break
        case 'getUserInfo':
          {
            let token = await getToken()
            param = {
              userId: app.alipayId,
              appId: app.appId,
              cityCode: app.cityInfo.cityCode,
              cityName: app.cityInfo.cityName,
              token: token,
              formId: app.formId
            }
            ret = true
          }
          break
        default:
          ret = false
          break

      }
    // 向H5发送消息

    this.webViewContext.postMessage({ 'success': ret, method: msg.method, data: param });
  },
  onShow() {
  },
  onReady() {
  }
});
