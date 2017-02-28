/**
 * Ajax
 * @version 170201 1.0
 */
'use strict';

import { Toast, Modal } from 'antd-mobile';
import Utils from './utils';

const P = (api, query = {}, config = {}) => {
	const { show = true } = config;

	return new Promise((resolve, reject) => {
		show && Toast.loading('请求中...', 0);

		fetch(`${Const.web}${api}`, {
			method: 'POST',
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: Utils.getQueryStr({
				access_token,
				...query,
			}),
		})
			.then(response => response.json())
			.then(res => {
				show && Toast.hide();

				if (res.code == 0) {
					resolve(res.data);
				} else {
					//Modal.alert('请求失败', res.err);
					reject(res);
				}
			})
			.catch(ex => {
				show && Toast.hide();
                
                //Modal.alert('请求失败', '服务器出错');
				console.log('parsing failed', ex);
			});
	});
};	

const map = {
	/*================== 0 ==================*/
	/**
     * 0.0 用户基本信息
     * @version 170201 1.0
     */
    get_user_info             : '/user/getUserInfo',

    /**
     * 0.0.7图片上传
     * @version 170206 1.0
     * @param {String} *data 图片base64
     */
    upload_file               : '/common/upload/appUpload',

	/*================== 1 ==================*/
    /**
     * 1.2.1 邀请好友进入 获取校友录认证字段
     * @version 170219 1.0
     * @param {Int} *alumni_id 校友录id
     */
    get_alumni_auth_fields    : '/user/getAlumniAuthentiField',

	/*================== 2 校友录 ==================*/
    /**
     * 2.1.0 我的校友录列表
     * @version 170224 1.0
     */
    get_alumni_list: '/alumni/index',

	/**
     * 2.1.1 获取校友录基本信息
     * @version 170203 1.0
     * @param {Int}	*alumni_id 校友录id
     */
    get_alumni_info           : '/alumni/getAlumniById',

    /**
     * 2.1.2 修改校友录基本信息
     * @version 170207 1.0
     * @param {Int}    *alumni_id  校友录id
     * @param {String} logo 	   校友录头像
     * @param {String} name 	   校友录名称
     * @param {String} school_name 学校名称
     * @param {String} description 描述
     */
    update_alumni_info        : '/alumni/updateAlumni',

    /**
     * 2.1.3 校友录用户列表
     * @version 170220 1.0
     * @param {Int} *alumni_id 校友录id
     */
    get_alumni_user_list      : '/alumni/getAlumniUserLists',

    /**
     * 2.1.4 校友录用户详情
     * @version 170222 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} *user_id   用户id
     */
    get_alumni_user_detail    : '/alumni/getAlumniUserDetail',

    /**
     * 2.1.5 校友录发出交换名片请求
     * @version 170224 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} *user_id   用户id
     */
    do_exchange_card          : '/alumni/exchangeCard',

    /**
     * 2.1.7 设置或取消管理员授权
     * @version 170211 1.0
     * @param {Int} *alumni_id 	校友录id
     * @param {Int} *user_id 	用户id
     * @param {Int} *is_manager 1设置为管理员,0取消管理员
     */
    update_admin_list         : '/alumni/setAlumniUser',

    /**
     * 2.1.8 删除校友录用户
     * @version 170224 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} *user_id   用户id
     */
    delete_alumni_user        : '/alumni/deleteAlumniUser',

    /**
     * 2.1.9 用户退出校友录
     * @version 170224 1.0
     * @param {Int} *alumni_id 校友录id
     */
    do_quit_alumni            : '/alumni/logoutAlumni',

    /**
     * 2.1.10 设置或取消加入黑名单
     * @version 170224 1.0
     * @param {Int} *user_id 某个用户id
     * @param {Int} *status  -1设置为设为黑名单,0取消黑名单
     */
    do_set_black              : '/user/setBlack',

    /**
     * 2.2.1 用户收到的通知列表
     * @version 170220 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} *category  1获取用户收到的通知列表，2获取获取待认证用户列表
     * @param {Int} page       分页
     */
    get_message_list          : '/notice/getNoticeList',

    /**
     * 2.2.2 同意或拒绝用户进入校友录
     * @version 170221 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} *user_id   加入的用户id
     * @param {Int} *notice_id 通知id
     * @param {Int} *status    同意状态1同意 -1拒绝
     */
    submit_alumni_auth        : '/alumni/allowOrDenyAlumni',

    /**
     * 2.2.3 设置用户备注名
     * @version 170224 1.0
     * @param {Int}    *alumni_id 校友录id
     * @param {Int}    *user_id   加入的用户id
     * @param {String} *back_name 用户备注名
     */
    update_back_name          : '/cards/updateNickName',

    /**
     * 2.3.0 管理员列表
     * @version 170208 1.0
     * @param {Int} *alumni_id 校友录id
     */
    get_admin_list            : '/alumni/getManagerList',

    /**
     * 2.4.0 身份列表
     * @version 170212 1.0
     * @param {Int} *alumni_id 校友录id
     */
    get_identity_list         : '/identity/index',

    /**
     * 2.4.1 添加身份
     * @version 170212 1.0
     * @param {Int}    *alumni_id 校友录id
     * @param {String} *name      名称
     */
    add_identity              : '/identity/createIdentity',

    /**
     * 2.4.2 修改身份
     * @version 170212 1.0
     * @param {Int}    *alumni_id        校友录id
     * @param {Int}    *identity_type_id 身份管理类型id
     * @param {String} *name             名称
     */
    update_identity           : '/identity/updateIdentity',

    /**
     * 2.4.3 删除身份
     * @version 170212 1.0
     * @param {Int} *alumni_id        校友录id
     * @param {Int} *identity_type_id 身份管理类型id
     */
    delete_identity           : '/identity/deleteIdentity',

    /**
     * 2.5.0 发布通知
     * @version 170213 1.0
     * @param {Int}    *alumni_id 校友录id
     * @param {String} *title     标题
     * @param {String} *content   内容
     */
    add_notice                : '/notice/createNotice',

    /**
     * 2.5.1 通知列表
     * @version 170213 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} page
     */
    get_notice_list           : '/notice/index',

    /**
     * 2.5.2 通知详细
     * @version 170213 1.0
     * @param {Int} *notice_id 文章id
     */
    get_notice                : '/notice/getNoticeDetail',

    /**
     * 2.5.3 修改通知
     * @version 170213 1.0
     * @param {Int}    *notice_id 文章id
     * @param {String} *title     标题
     * @param {String} *content   内容
     */
    update_notice             : '/notice/updateNotice',

    /**
     * 2.5.4 删除通知
     * @version 170213 1.0
     * @param {Int} *notice_id 文章id
     */
    delete_notice             : '/notice/deleteNotice',

    /**
     * 2.7.0 <认证管理> 获取已经认证和未认证数量
     * @version 170219 1.0
     * @param {Int} *alumni_id 校友录id
     */
    get_auth_count            : '/alumni/getAuthentiCount',

    /**
     * 2.7.1 获取待认证用户列表
     * 见：2.2.0 通知栏--用户收到的通知列表
     */

    /**
     * 2.7.2 获取校友录已有的认证信息
     * 见：1.2.1
     */

    /**
     * 2.7.3 修改认证需要填写的信息
     * @version 170219 1.0
     * @param {Int} *alumni_id        校友录id
     * @param {Int} ...is_need_mobile 如：上个接口的参数
     */
    update_alumni_auth_fields : '/alumni/updateAuthenti',

    /**
     * 2.7.4 获取认证后可见信息
     * @version 170220 1.0
     * @param {Int} *alumni_id        校友录id
     */
    get_alumni_show_fields    : '/alumni/getAuthentiShow',

    /**
     * 2.7.5 修改认证认证后可见信息
     * @version 170220 1.0
     * @param {Int} *alumni_id        校友录id
     * @param {Int} ...is_show_mobile 如：上个接口的参数
     */
    update_alumni_show_fields : '/alumni/updateAuthentiShow',
};

export default (api, ...arg) => P(map[api], ...arg);