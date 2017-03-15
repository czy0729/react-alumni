/**
 * 认证
 * @version 170219 1.0
 */
'use strict';

import { useStrict, observable, extendObservable, action, computed } from 'mobx';
import common from './common';

useStrict(true);

class store extends common {
    constructor() {
        super();

        this.config = {
            namespace: '$auth',
            cache: true,
        };
    }

    @observable state = this.initState({
        count: {},
        auth_list: {},
        auth_fields: {},
        show_fields: {},
    });

    /*==================== view ====================*/
    /**
     * 2.7.0 获取已经认证和未认证数量
     * @version 170219 1.0
     * @param {Int} *alumni_id 校友录id
     */
    @action
    async fetch_count(query, config) {
        const { alumni_id } = query;

        const result = await Ajax.P('get_auth_count', query, {
            show: !this.getById(alumni_id, 'count')._loaded,
            ...config,
        });

        this.setStateById(alumni_id, result, 'count');
    }

    /**
     * 2.2.1 获取待认证用户列表
     * @version 170220 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} page       分页
     */
    @action
    async fetch_auth_list(query, config) {
        const { alumni_id } = query;

        const result = await Ajax.P('get_message_list', {
            ...query,
            category: 2,
        }, {
            show: !this.getById(alumni_id, 'auth_list')._loaded,
            ...config,
        });

        this.setStateById(alumni_id, result, 'auth_list');
    }

    /**
     * 1.2.1 邀请好友进入 获取校友录认证字段
     * @version 170219 1.0
     * @param {Int} *alumni_id 校友录id
     */
    @action
    async fetch_auth_fields(query, config) {
        const { alumni_id } = query;

        const result = await Ajax.P('get_alumni_auth_fields', query, {
            show: !this.getById(alumni_id, 'auth_fields')._loaded,
            ...config,
        });

        this.setStateById(alumni_id, result, 'auth_fields');
    }

    /**
     * 2.7.4 获取认证后可见信息
     * @version 170220 1.0
     * @param {Int} *alumni_id 校友录id
     */
    @action
    async fetch_show_fields(query, config) {
        const { alumni_id } = query;

        const result = await Ajax.P('get_alumni_show_fields', query, {
            show: !this.getById(alumni_id, 'show_fields')._loaded,
            ...config,
        });

        this.setStateById(alumni_id, result, 'show_fields');
    }

    /*==================== action ====================*/
    /**
     * 2.2.2 同意或拒绝用户进入校友录
     * @version 170221 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} *user_id   加入的用户id
     * @param {Int} *notice_id 通知id
     * @param {Int} *status    同意状态1同意 -1拒绝
     */
    @action
    async submit_auth(query, config) {
        const { alumni_id } = query;

        await Ajax.P('do_submit_alumni_auth', query, config);

        this.fetch_auth_list({ alumni_id });
    }

    /**
     * 2.7.3 修改认证需要填写的信息
     * @version 170219 1.0
     * @param {Int} *alumni_id        校友录id
     * @param {Int} ...is_need_mobile 如：上个接口的参数
     */
    @action
    async update_auth_fields(query, config) {
        const { alumni_id } = query;

        await Ajax.P('update_alumni_auth_fields', query, config);

        this.fetch_auth_fields({ alumni_id });
    }

    /**
     * 2.7.5 修改认证认证后可见信息
     * @version 170220 1.0
     * @param {Int} *alumni_id        校友录id
     * @param {Int} ...is_show_mobile 如：上个接口的参数
     */
    @action
    async update_show_fields(query, config) {
        const { alumni_id } = query;

        await Ajax.P('update_alumni_show_fields', query, config);

        this.fetch_show_fields({ alumni_id });
    }

	/**
     * 1.1 填写创建者个人信息并完成校友录创建
     * @version 170312 1.0
     * @param {String}  *alumni_id 校友录id
     * @param {String}  real_name  真实姓名
     * @param ...
     */
    @action
    async alumni_auth(query, config) {
        return await Ajax.P('do_alumni_auth', query, config);
    }    
};

export default new store();