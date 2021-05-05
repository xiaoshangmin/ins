let alpha_host = "http://xsm.ins.com/";
let host = 'https://tc.nsbuluo.com/api';
let qiniu_host = 'http://cdn.nsbuluo.com';
const accountInfo = wx.getAccountInfoSync();
if (accountInfo.miniProgram.envVersion == "develop") {
  host = alpha_host;
}
console.log(host)
let config = {
  api: {
    host,
    qiniu_host,
    classification: `${host}/star/classification`,
    userList: `${host}/star/list`,
    modify: `${host}/content.feed/modify`,
    lists: `${host}/content.feed/lists`,
    nearby: `${host}/content.feed/nearby`,
    detail: `${host}/content.feed/detail`,
    mypost: `${host}/user/mypost`,
    getTopConfig: `${host}/misc.top/config`,
    homeInfo: `${host}/home/index`,
    columnList:`${host}/column/list`,
    columnMultList:`${host}/column/multList`,
    columnChildList:`${host}/column/child`,
    noticedetail:`${host}/notice/detail`,
    wxlogin: `${host}/wx/wxlogin`,
    decrypt: `${host}/user/decrypt`,
    phoneNumber:`${host}/user/phoneNumber`,
    addComment: `${host}/content.comment/submit`,
    commentListPrimary: `${host}/content.comment/listPrimary`,
    contentLike: `${host}/content.feed/like`,
    contentUnLike: `${host}/content.feed/unlike`,
    delete: `${host}/content.feed/del`,
    refresh: `${host}/content.feed/refresh`,
    top: `${host}/content.feed/top`,
    commonconfig:`${host}/common/config`,
    notifications:`${host}/content.comment/notifications`,

  }
};
module.exports = config