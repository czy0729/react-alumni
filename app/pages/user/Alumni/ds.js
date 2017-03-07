export default {
	section: [{
	    title: '我创建的',
	    filter: (item) => item.type == Const.alumni_list_type.my,
	}, {
	    title: '我加入的',
	    filter: (item) => item.type == Const.alumni_list_type.join,
	}, {
	    title: '等待认证',
	    filter: (item) => item.type == Const.alumni_list_type.not_auth,
	}],
};