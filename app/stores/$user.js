/**
 * 用户
 * @Date: 2017-02-23 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-19 18:57:19
 */
'use strict';

import { useStrict, observable, action } from 'mobx';
import common from './common';

useStrict(true);

class store extends common {
    config = {
        namespace: '$user',
        cache: true,
    };

    @observable state = this.initState({
        base: {},
        list: {},
        detail: {},
    });

    constructor() {
        super();
    }

    /*==================== view ====================*/
    /**
     * 0.0 自己的基本信息
     * @version 170223 1.0
     */
    @action
    fetch(query, config) {
        return this.fetchThenSetState(query, config, 'get_user_info');
    }

    /**
     * 2.1.3 校友录用户列表
     * @version 170220 1.0
     * @param {Int} *alumni_id 校友录id
     */
    @action
    fetch_list(query, config) {
        return this.fetchThenSetStateById(query, config, 'get_alumni_user_list', 'alumni_id', 'list');
    }

    /**
     * 2.1.4 校友录用户详情
     * @version 170222 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} *user_id   用户id
     */
    @action
    fetch_detail(query, config) {
        return this.fetchThenSetStateById({
            _pk: `${query.alumni_id}-${query.user_id}`,
            ...query,
        }, config, 'get_alumni_user_detail', '_pk', 'detail');
    }

    /*==================== action ====================*/
    /**
     * 2.1.5 校友录发出交换名片请求
     * @version 170224 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} *user_id   用户id
     */
    @action
    exchange_card(query, config) {
        return Ajax.P('do_exchange_card', query, config);
    }

    /**
     * 2.1.11 同意、拒绝或取消交换名片
     * @version 170313 1.1
     * @param {Int} *user_id 用户id
     * @param {Int} *status  resolve|reject|cancel
     */
    @action
    allow_exchange_card(query, status, config) {
        const api = 'do_allow_exchange_card';

        return Ajax.P(api, Ajax.genQuery(api, 'status', status, query), config);
    }

    /**
     * 2.1.8 删除校友录用户
     * @version 170224 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} *user_id   用户id
     */
    @action
    delete(query, config) {
        return Ajax.P('delete_alumni_user', query, config);
    }

    /**
     * 2.1.9 用户退出校友录
     * @version 170224 1.0
     * @param {Int} *alumni_id 校友录id
     */
    @action
    quit(query, config) {
        return Ajax.P('do_quit_alumni', query, config);
    }

    /**
     * 2.1.10 设置或取消加入黑名单
     * @version 170224 1.0
     * @version 170315 1.1 参数绑定
     * @param {Int} *user_id 用户id
     * @param {Int} *status  yes|no
     */
    @action
    set_black(query, status, config) {
        const api = 'do_set_black';

        return Ajax.P(api, Ajax.genQuery(api, 'status', status, query), config);
    }

    /**
     * 2.2.3 设置用户备注名
     * @version 170224 1.0
     * @param {Int}    *alumni_id 校友录id
     * @param {Int}    *user_id   加入的用户id
     * @param {String} *back_name 用户备注名
     */
    @action
    set_back_name(query, config) {
        return Ajax.P('do_set_black', query, config);
    }

    /**
     * 3.0.0 修改我的名片
     * @version 170313 1.0
     * 见1.1
     */
    @action
    update_info(query, config) {
        return Ajax.P('update_user_info', query, config);
    }
};

export default new store();