import store from './store'

const createPage = function (options) {
  return Page(store.register(options))
};
const app = getApp();
createPage({
  onShareAppMessage() {
    return {
      title: '',
      desc: '',
      path: 'pages/index/index',
      success: () => {
      }
    };
  },
  data: {    
  },
  async onLoad(query) {

  },
  async onShow() {
  },
  onReady() {
  },
  toIndex() {
    my.navigateBack({
      delta: 2
    })
  }
});
