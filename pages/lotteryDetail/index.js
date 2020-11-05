import store from './store'
import CONFIG from '../../util/config'

const createPage = function(options) {
  return Page(store.register(options))
};
const app = getApp();
let windowH = my.getSystemInfoSync().windowHeight; // 阻塞式获取系统信息
let elHeight = '';
let elTop = '';
let elbottom = '';
var wxParse = require('../wxParse/wxParse.js');
createPage({
  onShareAppMessage(e) {
    const trackerData = {
      activity_id: this.data.activityId,
      sponsor_name: this.data.lotteryDetail.sponsor_name,
    }
    app.Tracker.click('点击分享',trackerData)
    // console.log(e.target)
    return {
      title: '抽奖啦',
      path: this.data.lotteryDetail.is_show ? `pages/lotteryDetail/index?activityId=${this.data.activityId}` : `pages/index/index`,
      content: '吱口令吱口令',
      success: () => {
        if(e.target.id == 'shareBtn') {
          this.dispatch('shareSucc')
        }
      }
    };
  },
  data: {
    progress: '0%',
    left: '0',
    leftTri: '0',
    myFormId: '',
    tabs: [
      { title: '开奖结果' },
      { title: '奖品详情' },
    ],
    activeTab: 0,
    uid: '',
    lottery_id: '',
    sponsor_name: '',
    drawFlag: true,
    assistanceFlag: false,
    entrance_channel: '',
    receiveFlag: true,
    readyFlag: false,
    click: false, //是否显示弹窗内容
    option: false, //显示弹窗或关闭弹窗的操作动画
    showModal: false
  },
  /**
   * 监听用户滑动页面事件--返回页面在垂直方向已滚动的距离（单位px）
   */
  onPageScroll(e){    
    if(this.data.readyFlag&&(this.data.lotteryDetail.is_open_award=='0')) {
      const throttleExample  = this.throttle(this.scrolling, 300);
      throttleExample()
    }
  },
  async onLoad(query) {
    app.Tracker.Page.init()
    my.showLoading();
    // console.log(query)
    const activityId = app.activityIid || ''
    if(query.activityId) {
      this.commit('ACTIVITY_ID', query)
    } else {
      this.commit('ACTIVITY_ID', {activityId})
    }
    
    // await this.dispatch('$global:updateSystemInfo')
    let res = my.getStorageSync({ key: 'sesid' }).data;
    if(!res) {
      await this.dispatch('getUserInfo')
      app.userId = this.data.userId
      my.setStorageSync({
        key: 'sesid', // 缓存数据的key
        data: this.data.userId, // 要缓存的数据
      });
    } else {
      const userId = res
      this.commit('USER_ID', userId)
    }
    await this.dispatch('getLotteryDetail') // 获取抽奖详情
    if(this.data.lotteryDetail.award.pond_info) {
      const progre = (this.data.lotteryDetail.award.pond_info.curr_amt-this.data.lotteryDetail.award.pond_info.pond_amt)/(this.data.lotteryDetail.award.pond_info.pond_amt_limt-this.data.lotteryDetail.award.pond_info.pond_amt)
      this.setData({
        progress: `${progre*100}%`,
        left: this.handleLeftPadding(progre),
        leftTri: `${progre*574-8}rpx`
      })
    }
    this.setData({
      uid: this.data.userId,
      lottery_id: query.activityId || activityId,
      sponsor_name: this.data.lotteryDetail.sponsor_name,
      entrance_channel: app.channel
    })
    my.reportAnalytics('lottery_detail', {
      lottery_id: query.activityId || activityId,
      sponsor_name: this.data.lotteryDetail.sponsor_name,
      entrance_channel: app.channel
    });

    /**
    * wxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */
    wxParse.wxParse('article', 'html', this.data.lotteryDetail.note, this, 5);
    if((this.data.lotteryDetail.is_open_award=='0')) {
      my.createSelectorQuery()
        .select('.drawLuck').boundingClientRect().exec((ret) => {
          elHeight = ret[0].height
          elTop = ret[0].top          
          elbottom = ret[0].bottom
          let _that = this;
        if( elTop < (windowH) && elTop+elHeight>0 ){
          // console.log(elHeight)
          _that.setData({
            click: true,
            option: true
          })
        } else if( elTop > (windowH-80) ){
          _that.setData({
            click: false,
            option: false
          })
        }
      });
    }
    this.dispatch('getBotAd')
    this.dispatch('getLeadAd')
  },
  async onShow() {
    this.setData({
      showModal: false
    })
    let res = my.getStorageSync({ key: 'hasAddress' }).data;
    if(res) {
      this.commit('HAS_ADDRESS', {})
      my.removeStorageSync({
        key: 'hasAddress',
      });
    }
  },
  async onReady() {
    this.setData({
      readyFlag: true
    })
  },
  async toAssistance(e) {
    if(this.data.assistanceFlag) {
      return
    }
    this.setData({
      assistanceFlag: true
    })
    const trackerData = {
      activity_id: this.data.activityId,
      sponsor_name: this.data.lotteryDetail.sponsor_name,
    }
    app.Tracker.click('点击助力',trackerData)
    await this.dispatch('increasePond')
    const progre = (this.data.lotteryDetail.award.pond_info.curr_amt-this.data.lotteryDetail.award.pond_info.pond_amt)/(this.data.lotteryDetail.award.pond_info.pond_amt_limt-this.data.lotteryDetail.award.pond_info.pond_amt)
    this.setData({
      progress: `${progre*100}%`,
      left: this.handleLeftPadding(progre),
      leftTri: `${progre*574-8}rpx`
    })
  },
  handleLeftPadding(progre) {
    // debugger
    if(progre > 0.1) {
      const left = progre>0.9 ? `${(progre*574-100)*(1.9-progre)}rpx` : `${progre*574-100}rpx`
      return left
    } else {
      const left2 = `-55rpx`
      return left2
    }
  },
  async toDrawLuck(e) {
    if(this.data.drawFlag) {
      const trackerData = {
        activity_id: this.data.activityId,
        sponsor_name: this.data.lotteryDetail.sponsor_name,
      }
      app.Tracker.click('点击抽奖',trackerData)
      this.setData({
        drawFlag: false,
        myFormId: e.detail.formId
      })
      // console.log(e.detail.formId)
      await this.dispatch('toDrawLuck')
      if(this.data.is_full == 1){
        my.showLoading();
        await this.dispatch('getLotteryDetail') // 获取抽奖详情
        if(this.data.lotteryDetail.award.pond_info) {
          const progre = (this.data.lotteryDetail.award.pond_info.curr_amt-this.data.lotteryDetail.award.pond_info.pond_amt)/(this.data.lotteryDetail.award.pond_info.pond_amt_limt-this.data.lotteryDetail.award.pond_info.pond_amt)
          this.setData({
            progress: `${progre*100}%`,
            left: this.handleLeftPadding(progre),
            leftTri: `${progre*574-8}rpx`
          })
        }
        // wxParse.wxParse('article', 'html', this.data.lotteryDetail.note, that, 5);
      }
    }
  },
  async toCoupon(e) {
    // console.log(e.currentTarget.dataset.item)
    const item = e.currentTarget.dataset.item
    const urlType = item.url_type
    const app_Id = item.app_id
    const sponsorUrl = item.url
    let extraData = ''
    if(item.skip_extra_data) extraData = JSON.parse(item.skip_extra_data)
    await this.commit('COUPON_ID',item)
    await this.dispatch('receiveCoupon')
    this.handleNavigate({urlType,app_Id,sponsorUrl,extraData})
  },
  handleNavigate(options) {
    switch (options.urlType) {
      case 2: case 3: case 4:
        my.navigateTo({
          url: `../webview/webview?url=${options.sponsorUrl}`
        })
        break
      case 1:
        my.navigateToMiniProgram({
          appId: options.app_Id,
          path: options.sponsorUrl,
          extraData: options.extraData || {}
        })
        break
      case 5:
        my.ap.navigateToAlipayPage({
          path: options.sponsorUrl,
          fail: (err) => {
            my.alert({
              content: JSON.stringify(err)
            })
          }
        })
        break
      case 6:
        let kbUrl = JSON.parse(options.sponsorUrl)
        my.call('startApp', {
            appId: options.app_Id || '20001039',
            param: kbUrl
        })
        break
      case 0: case '':
        break
      default: break
    }
  },
  gotoSponsor(e) {
    const trackerName = e.currentTarget.id == 'toSponsorTopBtn' ? '顶部赞助商入口点击' : '底部赞助商入口点击'
    const trackerData = {
      activity_id: this.data.activityId,
      sponsor_name: this.data.lotteryDetail.sponsor_name,
    }
    app.Tracker.click(trackerName,trackerData)
    const urlType = this.data.lotteryDetail.url_type
    const app_Id = this.data.lotteryDetail.app_id
    const sponsorUrl = this.data.lotteryDetail.sponsor_url    
    let extraData = ''
    if(this.data.lotteryDetail.skip_extra_data) extraData = JSON.parse(this.data.lotteryDetail.skip_extra_data)
    this.handleNavigate({urlType,app_Id,sponsorUrl,extraData})
  },
  // 函数防抖
  debouce (fun,delay,time){
    let previous = null; //记录上一次运行的时间
    let timer = null;
    return () => {
      let now = +new Date();
      let context = this
      if(!previous) previous = now;
      //当上一次执行的时间与当前的时间差大于设置的执行间隔时长的话，就主动执行一次
      if(now - previous > time){
        clearTimeout(timer);
        fun.call(context);
        previous = now;// 执行函数后，马上记录当前时间
      }else{
        clearTimeout(timer);
        timer = setTimeout(() => {
            fun.call(context);
        },delay);
      }
    }
  },
  // 函数节流
  throttle(fun,delay){
    let last = null;
    return () => {
      let context = this
      let now = + new Date();
      if (now - last > delay) {
          fun.call(context);
          last = now;
      }
    }
  },
  scrolling() {
    my.createSelectorQuery()
      .select('.drawLuck').boundingClientRect().exec((ret) => {
        elHeight = ret[0].height
        elTop = ret[0].top          
        elbottom = ret[0].bottom
        let _that = this;
      if( elTop < (windowH) && elTop+elHeight>0 ){
        // console.log(elHeight)
        _that.setData({
          click: true,
          option: true
        })
      } else if( elTop > (windowH-80) ){
        _that.setData({
          click: false,
          option: false
        })
      }
    });
  },
  toTapTap(e) {
    this.setData({
      activeTab: e.currentTarget.dataset.index,
    });
  },
  seeMoreZero() {
    console.log(0)
    my.navigateTo({
      url: `../totalUsers/index?activityId=${this.data.activityId}&type=0`
    })
  },
  seeMoreOne(e) {
    const award_id = e.currentTarget.dataset.item.award_id || ''
    console.log(award_id)
    my.navigateTo({
      url: `../totalUsers/index?activityId=${this.data.activityId}&type=1&award_id=${award_id}`
    })
  },
  seeMoreTwo() {
    console.log(2)
    my.navigateTo({
      url: `../totalUsers/index?activityId=${this.data.activityId}&type=2`
    })
  },
  editAddress() {
    if(this.data.lotteryDetail.curr_user_award.is_time_out=='0'){
      my.showToast({
        type: 'fail',
        content: '超时不能填写了，下次中奖再来',
        duration: 3000,
        success: () => {
        },
      });
      return
    }    
    my.navigateTo({
      url: `../myAddress/index?activityId=${this.data.activityId}`
    })
  },
  toCouponDetail(e) {
    my.navigateTo({
      url: `../couponDetail/index?start_time=${e.currentTarget.dataset.obj.bus_coupon_start}&end_time=${e.currentTarget.dataset.obj.bus_coupon_end}&id=${e.currentTarget.dataset.obj.bus_coupon_template_id}`
    })
  },
  async toRecieveCoupon(e) {
    if(this.data.lotteryDetail.curr_user_award.is_time_out=='0'){
      my.showToast({
        type: 'fail',
        content: '超时不能领取了，下次中奖再来',
        duration: 2000,
        success: () => {
        },
      });
      return
    }  
    if(this.data.receiveFlag) {
      this.setData({
        receiveFlag: false
      })
      await this.dispatch('receiveBusCoupon')
    }
  },
  hideModal(){
    this.setData({
      showModal: false
    });
  },
  toSeeAd(){
    const trackerData = {
      activity_id: this.data.activityId,
      sponsor_name: this.data.lotteryDetail.sponsor_name,
    }
    app.Tracker.click('抽奖引导广告点击',trackerData)
    const urlType = this.data.lead_ad.url_type
    const app_Id = this.data.lead_ad.app_id
    const sponsorUrl = this.data.lead_ad.url    
    let extraData = ''
    if(this.data.lead_ad.skip_extra_data) extraData = JSON.parse(this.data.lead_ad.skip_extra_data)
    this.handleNavigate({urlType,app_Id,sponsorUrl,extraData})
  },
  toSeeBotAd(){
    const trackerData = {
      activity_id: this.data.activityId,
      sponsor_name: this.data.lotteryDetail.sponsor_name,
    }
    app.Tracker.click('底部广告点击',trackerData)
    const urlType = this.data.bot_ad.url_type
    const app_Id = this.data.bot_ad.app_id
    const sponsorUrl = this.data.bot_ad.url    
    let extraData = ''
    if(this.data.bot_ad.skip_extra_data) extraData = JSON.parse(this.data.bot_ad.skip_extra_data)
    this.handleNavigate({urlType,app_Id,sponsorUrl,extraData})
  },
  toIndex() {
    my.switchTab({
      url: '../index/index'
    })
  }
});
