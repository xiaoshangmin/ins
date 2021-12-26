let app_name = 'emoji';
let serve_id = 'a87ff679a2f3e71d9181a67b7542122c';
let aplha_serve_id = 'a87ff679a2f3e71d9181a67b7542122c';
let localhost = 'http://xsm.saas.com';
let alpha_host = 'https://saas.wowyou.cc';
let stable_host = 'https://saas.wowyou.cc';
let cdn_host = 'https://cdn.wowyou.cc';
let base_url = `${stable_host}/${app_name}/v1`;
let auth_url = `${stable_host}/api/v1`;
const accountInfo = wx.getAccountInfoSync();
console.log(accountInfo)
if (accountInfo.miniProgram.envVersion == "develop") {
  base_url = `${localhost}/${app_name}/v1`;
  auth_url = `${localhost}/api/v1`;
}
if (accountInfo.miniProgram.envVersion == "release" 
|| accountInfo.miniProgram.envVersion == "trial") {
  base_url = `${stable_host}/${app_name}/v1`;
  auth_url = `${stable_host}/api/v1`;
}
console.log(base_url)
let config = {
  saas: {
    serve_id,
    app_name,
  },
  api: {
    cdn_host,
    base_url,
    auth_url,
    homeList: `/club/hot`,
    list: `/club/list`,
    detail: `/club/detail`,
    config: `/club/config`,
    category: `/club/category`,
  }
};
module.exports = config