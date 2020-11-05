import store from './store'
import CONFIG from '../../util/config'

const createPage = function (options) {
  return Page(store.register(options))
};
const app = getApp();
createPage({
  onShareAppMessage(e) {
    console.log('from' + e.target)
    return {
      title: '',
      desc: '',
      path: 'pages/index/index'
    };
  },
  data: {
    page: 0,
    pageNum: '',
    pageList: [],
    resultList: [],
    isBottom: false,
    notBottom: false,
    activity_id: '',
    sponsor_name: '',
    entrance_channel: '',
    showModal:false,
  },
  async onPullDownRefresh() {
    await this.dispatch('getLotteryList')
    // await this.pagingList()
    // this.setData({
    //   page: 0,
    //   resultList: this.data.pageList[0],      
    //   isBottom: false,
    //   notBottom: false
    // })
    my.stopPullDownRefresh()
  },
  onReachBottom() {
    // console.log('触发onReachBottom上拉加载')
    // 下拉触底，先判断是否有请求正在进行中
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    // if ((!this.data.isLoading) && this.data.page < this.data.pageNum - 1) {
    //   this.setData({
    //     notBottom: true
    //   })
    //   setTimeout(() => {
    //     console.log('上拉了,ok')
    //     const array = this.data.resultList
    //     const arr = array.concat(this.data.pageList[this.data.page + 1])
    //     this.setData({
    //       page: this.data.page + 1,
    //       resultList: arr,
    //       notBottom: false
    //     })        
    //   }, 1000);      
    //   // debugger
    //   console.log(this.data.resultList)
    //   // debugger
    // } else if (this.data.page == this.data.pageNum - 1) {
    //   this.setData({
    //     isBottom: true
    //   })
    //   console.log('到底了')
    // }
  },
  async onLoad(query) {
    app.Tracker.Page.init()
    // await this.dispatch('$global:updateSystemInfo')
    // await this.dispatch('getLotteryList') // 获取首页抽奖列表
    // console.log(app.channel)
    // this.setData({
    //   entrance_channel: app.channel
    // })
    // await this.pagingList()
    // this.setData({
    //   resultList: this.data.pageList[0]
    // })
    // console.log(this.data.resultList)

  },
  async onShow() {
    this.setData({
      showModal: false
    })
    // console.log('channel:'+app.channel)
    await this.dispatch('getLotteryList') // 获取首页抽奖列表
    var myVar = setInterval(() => { 
      if(app.alipayId) {
        this.dispatch('getPopAd',app.alipayId) // 获取首页弹框广告
        clearInterval(myVar);
      }
    }, 200);
    this.setData({
      entrance_channel: app.channel
    })
    my.reportAnalytics('enterIndex', {
      entrance_channel: app.channel
    });
  },
  onReady() {
  },
  tobeCooperation() {
    my.navigateTo({
      url: `../cooperation/index`
    })
  },
  // 将数据分页
  pagingList() {
    my.showLoading();
    const pageNum = Math.ceil(this.data.lotteryList.length /8)
    let result = [];
    for (var i = 0, len = this.data.lotteryList.length; i < len; i += 8) {
      result.push(this.data.lotteryList.slice(i, i + 8));
    }
    console.log(result)
    console.log(pageNum)
    this.setData({
      pageNum: pageNum,
      pageList: result
    })
    // debugger
    my.hideLoading();
  },
  // 监听
  async handleClick(e) {
    // my.getAuthCode({
    //   success: async (res) => {
    //     console.log(res.authCode)
    //   }
    // })
    this.setData({
      activity_id: e.currentTarget.dataset.obj.activity_id,
      sponsor_name: e.currentTarget.dataset.obj.sponsor_name
    })
    const trackerData = {
      activity_id: e.currentTarget.dataset.obj.activity_id,
      sponsor_name: e.currentTarget.dataset.obj.sponsor_name
    }
    app.Tracker.click('首页活动点击',trackerData)
    // my.navigateToMiniProgram({
    //   appId: '2019021563231625',
    //   path: '',
    //   extraData: {
    //     channel: 'hangzhouya'
    //   }
    // })
    my.getAuthCode({
      scopes: 'auth_user',
      success: (res) => {
        my.getAuthUserInfo({
          success: ({ nickName, avatar }) => {
            my.navigateTo({
              url: `../lotteryDetail/index?activityId=${e.currentTarget.dataset.obj.activity_id}`
            })
          }
        });
      },
      fail: () => {
        // 根据自己的业务场景来进行错误处理
        my.showToast({
          type: 'none',
          content: '未授权',
          duration: 3000,
          success: () => {
          },
        });
      },
    });

  },
  
  upper(e) {
    console.log(e);
  },
  // 上拉分页
  lower(e) {
    console.log('触发scroll-view上拉加载');
    // 下拉触底，先判断是否有请求正在进行中
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    if ((!this.data.isLoading) && this.data.page < this.data.pageNum - 1) {
      this.setData({
        notBottom: true
      })
      setTimeout(() => {
        console.log('上拉了,ok')
        const array = this.data.resultList
        const arr = array.concat(this.data.pageList[this.data.page + 1])
        this.setData({
          page: this.data.page + 1,
          resultList: arr,
          notBottom: false
        })        
      }, 1000);      
      // debugger
      console.log(this.data.resultList)
      // debugger
    } else if (this.data.page == this.data.pageNum - 1) {
      this.setData({
        isBottom: true
      })
      console.log('到底了')
    }
    console.log('拉了')
  },
  toShowModal(e) {
    this.setData({
      showModal: true
    })
  },
  hideModal(){
    this.setData({
      showModal: false
    });
  },
  toJoinLuck(){    
    const trackerData = {
      activity_id: this.data.popAd.activity_id,
      title: this.data.popAd.title
    }
    app.Tracker.click('首页弹框活动点击',trackerData)
    my.getAuthCode({
      scopes: 'auth_user',
      success: (res) => {
        my.getAuthUserInfo({
          success: ({ nickName, avatar }) => {
            my.navigateTo({
              url: `../lotteryDetail/index?activityId=${this.data.popAd.activity_id}`
            })
          }
        });
      },
      fail: () => {
        // 根据自己的业务场景来进行错误处理
        my.showToast({
          type: 'none',
          content: '未授权',
          duration: 3000,
          success: () => {
          },
        });
      },
    });
  },
  handleMove() {
    
  }
});
