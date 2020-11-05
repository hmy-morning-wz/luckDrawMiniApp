
require('./config$.js?appxworker=1');
require('./importScripts$.js?appxworker=1');
function success() {
require('../..//app.js?appxworker=1');
require('../../node_modules/mini-antui/es/grid/index.js?appxworker=1');
require('../../node_modules/mini-antui/es/tabs/index.js?appxworker=1');
require('../../node_modules/mini-antui/es/tabs/tab-content/index.js?appxworker=1');
require('../../pages/index/index.js?appxworker=1');
require('../../pages/cooperation/index.js?appxworker=1');
require('../../pages/convertSucc/index.js?appxworker=1');
require('../../pages/myIndex/index.js?appxworker=1');
require('../../pages/couponDetail/index.js?appxworker=1');
require('../../pages/couponConvert/index.js?appxworker=1');
require('../../pages/busCoupon/index.js?appxworker=1');
require('../../pages/lotteryDetail/index.js?appxworker=1');
require('../../pages/luckRecord/index.js?appxworker=1');
require('../../pages/allDraw/index.js?appxworker=1');
require('../../pages/myAddress/index.js?appxworker=1');
require('../../pages/totalUsers/index.js?appxworker=1');
require('../../pages/webview/webview.js?appxworker=1');
require('../../pages/richText/richText.js?appxworker=1');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
