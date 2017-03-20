/**
 * Ajax
 * @Date: 2017-02-01 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-21 07:50:00
 */
'use strict';

import { Toast, Modal } from 'antd-mobile';
import Utils from './utils';

const apis = {
    /*================== 0 ==================*/
    /**
     * [$user][s] 0.0 用户基本信息
     * @version 170201 1.0
     */
    get_user_info             : '/user/getUserInfo',

    /**
     * [s] 0.0.7图片上传
     * @version 170206 1.0
     * @param {String} *data 图片base64
     */
    do_upload_file               : '/common/upload/appUpload',

    /*================== 1 ==================*/
    /**
     * [$alumni][static] 1.0 添加校友录
     * @version 170305 1.0
     * @param {String} *name        校友录名称
     * @param {String} *school_name 学校名称
     * @param {String} *description 描述
     * @param {Base64} logo         校友录头像
     */
    add_alumni: '/alumni/createAlumni',

    /**
     * [$auth][static] 1.1 填写创建者个人信息并完成校友录创建
     * @version 170305 1.0
     * @param {String}  *alumni_id 校友录id
     * @param {String}  real_name  真实姓名
     * @param ...
     */
    do_alumni_auth: '/user/addUserInfo',

    /**
     * 1.2.0 用户经过分享连接进入到校友录 - 检查是否验证过校友录
     * @version 170305 1.0
     * @param  {String} *alumni_id 校友录id
     * @return {Int}               -2第一次进来，-1被拒绝，0待认证，1已同意
     */
    do_check_alumni_auth_status: '/alumni/validateAlumniUser',

    /**
     * [$auth][s] 1.2.1 获取校友录认证字段
     * @version 170219 1.0
     * @param {Int} *alumni_id 校友录id
     */
    get_alumni_auth_fields    : '/user/getAlumniAuthentiField',

    /**
     * 1.2.2 执行校友认证
     * @version 170305 1.0
     * @param {String} *alumni_id    校友录id
     * @param {String} leave_message 留言
     */
    do_alumni_user_auth: '/user/alumnierAuthenti',

    /*================== 2 校友录 ==================*/
    /**
     * [$alumni][s] 2.1.0 我的校友录列表
     * @version 170224 1.0
     */
    get_alumni_list: '/alumni/index',

    /**
     * [$alumni][s] 2.1.1 获取校友录基本信息
     * @version 170203 1.0
     * @param {Int} *alumni_id 校友录id
     */
    get_alumni_info           : '/alumni/getAlumniById',

    /**
     * [$alumni][s] 2.1.2 修改校友录基本信息
     * @version 170207 1.0
     * @param {Int}    *alumni_id  校友录id
     * @param {String} logo        校友录头像
     * @param {String} name        校友录名称
     * @param {String} school_name 学校名称
     * @param {String} description 描述
     */
    update_alumni_info        : '/alumni/updateAlumni',

    /**
     * [$user][s] 2.1.3 校友录用户列表
     * @version 170220 1.0
     * @param {Int} *alumni_id 校友录id
     */
    get_alumni_user_list      : '/alumni/getAlumniUserLists',

    /**
     * [$user][s] 2.1.4 校友录用户详情
     * @version 170222 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} *user_id   用户id
     */
    get_alumni_user_detail    : '/alumni/getAlumniUserDetail',

    /**
     * [$user][s] 2.1.5 校友录发出交换名片请求
     * @version 170224 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} *user_id   用户id
     */
    do_exchange_card          : '/alumni/exchangeCard',

    /**
     * [$identity][s] 2.1.6 设置用户所在校友录身份
     * @version 170305 1.0
     * @param {Int} *alumni_id         校友录id
     * @param {Int} *user_id           用户id
     * @param {Int} *identity_type_ids 身份id
     */
    update_user_identity: '/alumni/setIdentity',

    /**
     * [$admin][s] 2.1.7 设置或取消管理员授权
     * @version 170211 1.0
     * @param {Int} *alumni_id  校友录id
     * @param {Int} *user_id    用户id
     * @param {Int} *is_manager
     */
    update_admin_list         : {
        api: '/alumni/setAlumniUser',
        is_manager: {
            yes: 1, //设置为管理员
            no: 0,  //取消管理员
        },
    },

    /**
     * [$user][s] 2.1.8 删除校友录用户
     * @version 170224 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} *user_id   用户id
     */
    delete_alumni_user        : '/alumni/deleteAlumniUser',

    /**
     * [$user] 2.1.9 用户退出校友录
     * @version 170224 1.0
     * @param {Int} *alumni_id 校友录id
     */
    do_quit_alumni            : '/alumni/logoutAlumni',

    /**
     * [$user][s] 2.1.10 设置或取消加入黑名单
     * @version 170224 1.0
     * @param {Int} *user_id 某个用户id
     * @param {Int} *status
     */
    do_set_black: {
        api: '/user/setBlack',   
        status: {
            yes: -1, //设为黑名单
            no: 0,   //取消黑名单
        },
    },

    /**
     * [$user] 2.1.11 同意、拒绝或取消交换名片
     * @version 170313 1.1
     * @param {Int} *user_id 用户id
     * @param {Int} *status
     */
    do_allow_exchange_card: {
        api: '/alumni/allowExchangeCard',   
        status: {
            resolve: 1, //同意
            reject: -1, //拒绝
            cancel: -2, //取消
        },
    },

    /**
     * [$auth][s] 2.2.1 用户收到的通知列表
     * @version 170220 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} *category  后端约定的
     * @param {Int} page       分页
     */
    get_message_list          : {
        api: '/notice/getNoticeList',
        category: {
            message: 1, //获取用户收到的通知列表
            auth: 2,    //获取待认证用户列表
        },
    },

    /**
     * [$auth][s] 2.2.2 同意或拒绝用户进入校友录
     * @version 170221 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} *user_id   加入的用户id
     * @param {Int} *notice_id 通知id
     * @param {Int} *status    同意状态
     */
    do_submit_alumni_auth        : {
        api: '/alumni/allowOrDenyAlumni',
        status: {
            resolve: 1,
            reject: -1,
        },
    },

    /**
     * [$user] 2.2.3 设置用户备注名
     * @version 170224 1.0
     * @param {Int}    *alumni_id 校友录id
     * @param {Int}    *user_id   加入的用户id
     * @param {String} *back_name 用户备注名
     */
    update_back_name          : '/cards/updateNickName',

    /**
     * [$admin][s] 2.3.0 管理员列表
     * @version 170208 1.0
     * @param {Int} *alumni_id 校友录id
     */
    get_admin_list            : '/alumni/getManagerList',

    /**
     * [$identity][s] 2.4.0 身份列表
     * @version 170212 1.0
     * @param {Int} *alumni_id 校友录id
     */
    get_identity_list         : '/identity/index',

    /**
     * [$identity][s] 2.4.1 添加身份
     * @version 170212 1.0
     * @param {Int}    *alumni_id 校友录id
     * @param {String} *name      名称
     */
    add_identity              : '/identity/createIdentity',

    /**
     * [$identity][s] 2.4.2 修改身份
     * @version 170212 1.0
     * @param {Int}    *alumni_id        校友录id
     * @param {Int}    *identity_type_id 身份管理类型id
     * @param {String} *name             名称
     */
    update_identity           : '/identity/updateIdentity',

    /**
     * [$identity][s] 2.4.3 删除身份
     * @version 170212 1.0
     * @param {Int} *alumni_id        校友录id
     * @param {Int} *identity_type_id 身份管理类型id
     */
    delete_identity           : '/identity/deleteIdentity',

    /**
     * [$notice][s] 2.5.0 发布通知
     * @version 170213 1.0
     * @param {Int}    *alumni_id 校友录id
     * @param {String} *title     标题
     * @param {String} *content   内容
     */
    add_notice                : '/notice/createNotice',

    /**
     * [$notice][s] 2.5.1 通知列表
     * @version 170213 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} page
     */
    get_notice_list           : '/notice/index',

    /**
     * [$notice][s] 2.5.2 通知详细
     * @version 170213 1.0
     * @param {Int} *notice_id 文章id
     */
    get_notice                : '/notice/getNoticeDetail',

    /**
     * [$notice][s] 2.5.3 修改通知
     * @version 170213 1.0
     * @param {Int}    *notice_id 文章id
     * @param {String} *title     标题
     * @param {String} *content   内容
     */
    update_notice             : '/notice/updateNotice',

    /**
     * [$notice][s] 2.5.4 删除通知
     * @version 170213 1.0
     * @param {Int} *notice_id 文章id
     */
    delete_notice             : '/notice/deleteNotice',

    /**
     * [$auth][s] 2.7.0 获取已经认证和未认证数量
     * @version 170219 1.0
     * @param {Int} *alumni_id 校友录id
     */
    get_auth_count            : '/alumni/getAuthentiCount',

    /**
     * 2.7.1 获取待认证用户列表
     * 见2.2.0
     */

    /**
     * 2.7.2 获取校友录已有的认证信息
     * 见1.2.1
     */

    /**
     * [$auth][s] 2.7.3 修改认证需要填写的信息
     * @version 170219 1.0
     * @param {Int} *alumni_id        校友录id
     * @param {Int} ...is_need_mobile 如：上个接口的参数
     */
    update_alumni_auth_fields : '/alumni/updateAuthenti',

    /**
     * [$auth][s] 2.7.4 获取认证后可见信息
     * @version 170220 1.0
     * @param {Int} *alumni_id        校友录id
     */
    get_alumni_show_fields    : '/alumni/getAuthentiShow',

    /**
     * [$auth][s] 2.7.5 修改认证认证后可见信息
     * @version 170220 1.0
     * @param {Int} *alumni_id        校友录id
     * @param {Int} ...is_show_mobile 如：上个接口的参数
     */
    update_alumni_show_fields : '/alumni/updateAuthentiShow',


    /*================== 3 个人中心 ==================*/
    /**
     * [$user][s] 3.0.0 修改我的名片
     * @version 170313 1.0
     * 见1.1
     */
    update_user_info: '/user/updateUserInfo',

    /**
     * 3.1.0 名片库
     * @version 170313 1.0
     */
    get_cards: '/cards/index',

    /**
     * [$user] 3.2.0 黑名单
     * @version 170313 1.0
     */
    get_blacklist: '/user/blackUserLists',
};

const _fetch = async (api, query) => {
    let response;

    if (Const._offline) {
        response = await fetch(`./build/api${api}.json`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

    } else {
        response = await fetch(`${Const.web}${api}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: Utils.getQueryStr({ access_token, ...query }),
        });
    }

    return await response.json();
};

/**
 * POST
 * @version 170306 1.0
 * @param {String} *api
 * @param {Object} query
 * @param {Object} config -> `show`请求时显示Toast，`fail`服务器端请求结果失败自定义回调
 */
const P = (api, query = {}, config = {}) => {
    return new Promise((resolve, reject) => {
        const { fail, show = true } = config;
        const isSubmitApi = api.indexOf('get_') !== 0; //判断api是不是操作型的
        const isNeedShowToast = show && isSubmitApi;

        const apiAddress = typeof apis[api] === 'object' ? apis[api].api : apis[api]; //api地址

        isNeedShowToast && Toast.loading('请求中...');

        setTimeout(async () => {
            const res = await _fetch(apiAddress, query);

            isNeedShowToast && Toast.hide();

            if (res.code != 0) {
                const _fail = res => Utils.onAlert(`[${res.code}] ${res.err}`);

                typeof fail === 'function' ? fail(res, _fail) : _fail(res);

                reject(res);

            } else {
                resolve(res.data);
            }
        }, 600);
    });
};

/**
 * 获取api字段的枚举值
 * @version 170310 1.0
 * @param  {String} *api       api名称
 * @param  {String} *paramName 字段name
 * @param  {String} *keyName   字段值枚举key
 * @return {String}
 */
const getParam = (api, paramName, keyName) => apis[api][paramName][keyName];


/**
 * 获取api字段的枚举值并构造query
 * @version 170318 1.0
 * @param  {String} *api       api名称
 * @param  {String} *paramName 字段name
 * @param  {String} *keyName   字段值枚举key
 * @param  {Object} query      可以把fetch的其他query一同传过来构造
 * @return {Object}
 */
const genQuery = (api, paramName, keyName, query) => {
    return {
        ...query,
        [paramName]: getParam(api, paramName, keyName),
    };
};

export default {
    P,
    getParam,
    genQuery, 
};