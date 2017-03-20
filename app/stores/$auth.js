/**
 * 认证
 * @Date: 2017-02-19 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-21 07:19:02
 */
'use strict';

import { useStrict, observable, action } from 'mobx';
import common from './common';

useStrict(true);

class store extends common {
    config = {
        namespace: '$auth',
        cache: true,
    };

    @observable state = this.initState({
        count: {},
        auth_list: {},
        auth_fields: {},
        show_fields: {},
    });

    constructor() {
        super();
    }

    /*==================== view ====================*/
    /**
     * 2.7.0 获取已经认证和未认证数量
     * @version 170219 1.0
     * @param {Int} *alumni_id 校友录id
     */
    @action
    fetch_count(query, config) {
        return this.fetchThenSetStateById(query, config, 'get_auth_count', 'alumni_id', 'count');
    }

    /**
     * 2.2.1 获取待认证用户列表
     * @version 170220 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} page       分页
     */
    @action
    fetch_auth_list(query, config) {
        const api = 'get_message_list';

        return this.fetchThenSetStateById(
            Ajax.genQuery(api, 'category', 'auth', query),
            config, api, 'alumni_id', 'auth_list'
        );
    }

    /**
     * 1.2.1 获取校友录认证字段
     * @version 170219 1.0
     * @param {Int} *alumni_id 校友录id
     */
    @action
    fetch_auth_fields(query, config) {
        return this.fetchThenSetStateById(query, config, 'get_alumni_auth_fields', 'alumni_id', 'auth_fields');
    }

    /**
     * 2.7.4 获取认证后可见信息
     * @version 170220 1.0
     * @param {Int} *alumni_id 校友录id
     */
    @action
    fetch_show_fields(query, config) {
        return this.fetchThenSetStateById(query, config, 'get_alumni_show_fields', 'alumni_id', 'show_fields');
    }

    /*==================== action ====================*/
    /**
     * 2.2.2 同意或拒绝用户进入校友录
     * @version 170221 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} *user_id   加入的用户id
     * @param {Int} *notice_id 通知id
     * @param {Int} *status    同意状态 resolve|reject
     */
    @action
    submit_auth(query, status = 'resolve', config) {
        const api = 'do_submit_alumni_auth';

        return Ajax.P(api, Ajax.genQuery(api, 'status', status, query), config);
    }

    /**
     * 2.7.3 修改认证需要填写的信息
     * @version 170219 1.0
     * @param {Int} *alumni_id        校友录id
     * @param {Int} ...is_need_mobile 如：上个接口的参数
     */
    @action
    update_auth_fields(query, config) {
        return Ajax.P('update_alumni_auth_fields', query, config);
    }

    /**
     * 2.7.5 修改认证认证后可见信息
     * @version 170220 1.0
     * @param {Int} *alumni_id        校友录id
     * @param {Int} ...is_show_mobile 如：上个接口的参数
     */
    @action
    update_show_fields(query, config) {
        return Ajax.P('update_alumni_show_fields', query, config);
    }

    /**
     * 1.1 填写创建者个人信息并完成校友录创建
     * @version 170312 1.0
     * @param {String}  *alumni_id 校友录id
     * @param {String}  real_name  真实姓名
     * @param ...
     */
    @action
    alumni_auth(query, config) {
        return Ajax.P('do_alumni_auth', query, config);
    }    
};

export default new store();