const caseSuper = (user_type) => user_type == Const.user_type.super;
const caseAdmins = (user_type) => user_type == Const.user_type.super || user_type == Const.user_type.admin;
const caseAll = (user_type) => 1;

export default {
    menuDS: [{
        label  : '基本信息',
        icon   : require('common/svg/edit.svg'),
        href   : Const.router.admin_info,
        filter : caseAdmins,
    }, {
        label  : '管理员',
        icon   : require('common/svg/me.svg'),
        href   : Const.router.admin_list,
        filter : caseSuper,
    }, {
        label  : '认证管理',
        icon   : require('common/svg/check.svg'),
        href   : Const.router.admin_auth_manage,
        filter : caseAdmins,
    }, {
        label  : '身份管理',
        icon   : require('common/svg/config.svg'),
        href   : Const.router.admin_identity,
        filter : caseAdmins,
    }, {
        label  : '通知',
        icon   : require('common/svg/notification.svg'),
        href   : Const.router.notice_list,
        filter : caseAll,
    }, {
        label  : '邀请校友',
        icon   : require('common/svg/share.svg'),
        href   : Const.router.share,
        filter : caseAll,
    }, {
        label  : '校友相册',
        icon   : require('common/svg/album.svg'),
        href   : Const.router.album,
        filter : caseAll,
    }],
};