let serve_id = 'a87ff679a2f3e71d9181a67b7542122c';
let app_name = 'emoji';
let localhost = 'http://xsm.saas.com';
let alpha_host = 'https://saas.wowyou.cc';
let cdn_host = 'https://cdn.wowyou.cc';
let base_url = `${localhost}/${app_name}/v1`;
let auth_url = `${localhost}/api/v1`;
const accountInfo = wx.getAccountInfoSync();
if (accountInfo.miniProgram.envVersion != "develop") {
  base_url = `${alpha_host}/${app_name}/v1`;
  auth_url = `${alpha_host}/api/v1`;
}
console.log(base_url,accountInfo)
let config = {
  saas: {
    serve_id,
    app_name,
  },
  api: {
    cdn_host,
    base_url,
    auth_url,
    hot: `/club/hot`,
    list: `/club/list`,
    detail: `/club/detail`,
    config: `/club/config`,
  }
};
module.exports = config