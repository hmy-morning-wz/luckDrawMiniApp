// const devDomain = 'http://sit-miniprogram.allcitygo.com'
// const cardManageDomain = 'http://sit-miniprogram.allcitygo.com' // https://sit-ech5.allcitygo.com
// const DefaultDomain = 'http://sit-miniprogram.allcitygo.com'
const devDomain = '/luckydraw'//'https://luckydraw.allcitygo.com:9007'
const cardManageDomain = '/luckydraw'//'https://luckydraw.allcitygo.com:9007' 
const DefaultDomain = '/luckydraw'//'https://luckydraw.allcitygo.com:9007'

export default function getDomain(urlType) {
  let domain = devDomain
  // const env = (process.env.NODE_ENV ? 'dev' : '') || window.env || 'prod'
  // switch (env) {
  //   case 'dev':
  //     if (urlType === 'default') {
  //       domain = devDomain
  //     } else if (urlType === 'cardManageDomain') {
  //       domain = cardManageDomain
  //     }
  //     break
  //   case 'prod':
  //   default:
      if (urlType === 'default') {
        domain = DefaultDomain
      } else if (urlType === 'cardManageDomain') {
        domain = cardManageDomain
      }
  //     break
  // }
  // my.alert({
  //   title: '',
  //   content: domain
  // })
  return domain
}
