if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


var AFAppX = self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;


function success() {
require('../../app');
require('../../node_modules/mini-antui/es/grid/index');
require('../../node_modules/mini-antui/es/tabs/index');
require('../../node_modules/mini-antui/es/tabs/tab-content/index');
require('../../pages/index/index');
require('../../pages/cooperation/index');
require('../../pages/convertSucc/index');
require('../../pages/myIndex/index');
require('../../pages/couponDetail/index');
require('../../pages/couponConvert/index');
require('../../pages/busCoupon/index');
require('../../pages/lotteryDetail/index');
require('../../pages/luckRecord/index');
require('../../pages/allDraw/index');
require('../../pages/myAddress/index');
require('../../pages/totalUsers/index');
require('../../pages/webview/webview');
require('../../pages/richText/richText');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}