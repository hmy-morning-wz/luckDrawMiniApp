const qs= {
  parse: function(str) {
    if (!str || str.length == 0) return {}
    let list = str.split('&')
    if (!list || list.length == 0) return {}
    let out = {}
    for (let index = 0; index < list.length; index++) {
      let set = list[index].split('=')
      set && set.length > 1 && (out[set[0]] = decodeURIComponent(set[1]))
    }
    return out
  },
  stringify: function(data) {
    if (!data) return ''
    let list = []
    for (let key in data) {
      if(data[key] instanceof Array  &&data[key].length ){
             data[key].forEach(t=>{
               list.push(key + '=' + encodeURIComponent(t))
             })
      }
      else {
        list.push(key + '=' + encodeURIComponent(data[key]))
      }
    }
    return list.join('&')
  }
}

function intValue(num)  
    {  
        var MAX_VALUE = 0x7fffffff;  
        var MIN_VALUE = 0x00;//-0x80000000;  
        if(num > MAX_VALUE || num < MIN_VALUE)  
        {  
            return num &= 0x7FFFFFFF;  
        }  
        return num;  
    }  
function isNull(str){
  return str===undefined || str ===null  || str === '' || str.length===0
}

export default {
  qs,
  /**
   * 弹框提示
   * @param moldalType
   * @param params
   * @param callback
   */
  showModal(moldalType = 'alert', params = {}, callback ) {
    const {
      title = '提示',
      content = '操作成功',
      buttonText = '确定',
      confirmButtonText = '确定',
      cancelButtonText = '取消',
      duration = 2000,
      type = 'success',
      delay = 0
    } = params;
    switch (moldalType) {
      case 'alert':
        my.alert({ title, content, buttonText, complete: callback });
        break;
      case 'showToast':
        my.showToast({ content, duration, type, complete: callback });
        break;
      case 'hideToast':
        my.hideToast();
        break;
      case 'showLoading':
        my.showLoading({ content, delay });
        break;
      case 'hideLoading':
        my.hideLoading();
        break;
      case 'confirm':
        return new Promise((resolve, reject) => {
          my.confirm({
            title,
            content,
            confirmButtonText,
            cancelButtonText,
            success: result => {
              resolve(result);
            },
            fail: err => {
              reject(err);
            }
          });
        });
      default:
        break;
    }
  },
  /**
   * 获取周几
   * @param data
   * @returns Obeject
   */
  getWeek(data) {
    let weeks = '';
    const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    if (new Date().getTime() - new Date(data).getTime() > 0) {
      weeks = '今天';
    } else if (new Date().getTime() + 86400000 - new Date(data).getTime() > 0) {
      weeks = '明天';
    } else if (
      new Date().getTime() + 86400000 * 2 - new Date(data).getTime() >
      0
    ) {
      weeks = '后天';
    } else {
      weeks = week[new Date(data).getDay()];
    }
    console.log(weeks, data);
    return weeks;
  },
  /**
   * 验证身份证合法
   * @param certId String
   * @returns Boolean
   */
  verifiyIdCard(certId) {
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/gim.test(certId.trim());
  },
  /**
   * 验证手机号码是否合法
   * @param number
   * @returns {boolean}
   */
  verifyTel(number) {
    return /^1[\d]{10}/gim.test(number.trim());
  },
  /**
   * 验证邮箱是否合法
   * @param email
   * @returns {boolean}
   */
  verifyEmail(email) {
    return /^([A-Za-z0-9_\-.])+@[A-Za-z0-9_\-.]+\.[A-Za-z]{2,4}$/gim.test(
      email.trim()
    );
  },
  /**
   * 验证新密码格式是否正确
   * 必须且只能包含大写字母，小写字母，数字，下划线中的两种或两种以上
   * @param pwd
   * @returns {boolean}
   */
  verifyPwd(pwd) {
    return /(?!^\d+$)(?!^[A-Z]+$)(?!^[a-z]+$)(?!^_+$)^\w{6,20}$/gm.test(pwd);
    // return /^[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/gim.test(pwd.trim());
  },
  getSystemInfoSync: () => {
   return new Promise((resolve, reject) => {
      my.getSystemInfo({
        success: (res) => {
           
          resolve(res)
        },
        fail:(err)=>{
          reject(err)
        }
      })
    })   
  },
  getStorageSync:({key}) =>{
    return new Promise((resolve, reject) => {
      my.getStorage({
         key:key,
        success: (res) => {
           
          resolve(res)
        },
        fail:(err)=>{
          reject(err)
        }
      })
    }) 
  },
  makeUrl:(url,data)=>{     
     let index = url && url.indexOf('?')      
     return index && index>-1?  url + "&"+qs.stringify(data): url + "?"+qs.stringify(data)
  },
   hashCode:(strKey)=>  
    {  
        var hash = 0;  
        if(!isNull(strKey))  
        {  
            for (var i = 0; i < strKey.length; i++)  
            {  
                hash = hash * 31 + strKey.charCodeAt(i);  
                hash = intValue(hash);  
            }  
        }  
        return hash.toString(16);  
    }  ,
  
  sleep:(time) => {
  
      return new Promise((resolve, reject) => {
          try {
              setTimeout(() => {
                
                  resolve()
              }, time || 1000)
          } catch (e) {
              reject(e);
          }
      });
  }
  
}