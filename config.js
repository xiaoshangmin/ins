let local_host = "http://xsm.club.com/api/v1";
let alpha_host = "https://api.wowyou.cc/api/v1";
let host = 'https://api.wowyou.cc/api/v1';
let qiniu_host = 'http://cdn.wowyou.cc';
const accountInfo = wx.getAccountInfoSync();
if (accountInfo.miniProgram.envVersion == "develop") {
  host = alpha_host;
}
console.log(host)
let config = {
  api: {
    host,
    hot: `${host}/club/hot`,
    list: `${host}/club/list`,
    detail: `${host}/club/detail`,
  }
};
module.exports = config