const caseSuper = (user_type) => user_type == Const.user_type.super;
const caseAdmins = (user_type) => user_type == Const.user_type.super || user_type == Const.user_type.admin;
const caseAll = (user_type) => 1;

export default {
    menuDS: [{
        label  : '基本信息',
        icon   : require('svg/file.svg'),
        href   : Const.router.admin_info,
        filter : caseAdmins,
    }, {
        label  : '管理员',
        icon   : require('svg/admin.svg'),
        href   : Const.router.admin_list,
        filter : caseSuper,
    }, {
        label  : '认证管理',
        icon   : require('svg/check.svg'),
        href   : Const.router.admin_auth_manage,
        filter : caseAdmins,
    }, {
        label  : '身份管理',
        icon   : require('svg/config.svg'),
        href   : Const.router.admin_identity,
        filter : caseAdmins,
    }, {
        label  : '通知',
        icon   : require('svg/notice.svg'),
        href   : Const.router.notice_list,
        filter : caseAll,
    }, {
        label  : '邀请校友',
        icon   : require('svg/search_people.svg'),
        href   : Const.router.share,
        filter : caseAll,
    }, {
        label  : '校友相册',
        icon   : require('svg/heart.svg'),
        href   : Const.router.album,
        filter : caseAll,
    }],
};