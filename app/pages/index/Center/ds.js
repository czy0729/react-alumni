const caseSuper = (user_type) => user_type == Const.user_type.super;
const caseAdmins = (user_type) => user_type == Const.user_type.super || user_type == Const.user_type.admin;
const caseAll = (user_type) => 1;

export default {
	menuDS: [{
		label  : '基本信息',
		icon   : 'info-circle-o',
		href   : 'admin/info/',
		filter : caseAdmins,
	}, {
		label  : '管理员',
		icon   : 'user',
		href   : 'admin/list/',
		filter : caseSuper,
	}, {
		label  : '认证管理',
		icon   : 'check',
		href   : 'admin/auth_manage/',
		filter : caseAdmins,
	}, {
		label  : '身份管理',
		icon   : 'solution',
		href   : 'admin/identity/',
		filter : caseAdmins,
	}, {
		label  : '通知',
		icon   : 'notification',
		href   : 'notice_list/',
		filter : caseAll,
	}, {
		label  : '邀请校友',
		icon   : 'share-alt',
		href   : '',
		filter : caseAll,
	}, {
		label  : '校友相册',
		icon   : 'picture',
		href   : '',
		filter : caseAll,
	}],
};