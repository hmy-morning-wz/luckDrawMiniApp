import store from './store';

const createPage = function(options) {
  return Page(store.register(options));
};
createPage({
  // connectGlobal: true,
  data: {
  },
  onLoad() {
  },
  onShow() {
    this.dispatch('queryDetail');
  },
  onReady() {
  }
});
