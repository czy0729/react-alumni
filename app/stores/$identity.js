/**
 * 身份
 * @Date: 2017-02-12 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-19 04:40:35
 */
'use strict';

import { useStrict, observable, action } from 'mobx';
import common from './common';

useStrict(true);

class store extends common {
    config = {
        namespace: '$identity',
        cache: true,
    };

    @observable state = this.initState({
        base: {},
    });

    constructor() {
        super();
    }

    /*==================== view ====================*/
    /**
     * 2.4.0 身份列表
     * @version 170212 1.0
     * @param {Int} *alumni_id 校友录id
     */
    @action
    fetch(query, config) {
        return this.fetchThenSetStateById(query, config, 'get_identity_list', 'alumni_id');
    }

    /*==================== action ====================*/
    /**
     * 2.4.1 添加身份
     * @version 170212 1.0
     * @param {Int}    *alumni_id 校友录id
     * @param {String} *name      名称
     */
    @action
    add(query, config) {
        return Ajax.P('add_identity', query, config);
    }

    /**
     * 2.4.2 修改身份
     * @version 170212 1.0
     * @param {Int}    *alumni_id        校友录id
     * @param {Int}    *identity_type_id 身份管理类型id
     * @param {String} *name             名称
     */
    @action
    update(query, config) {
        return Ajax.P('update_identity', query, config);
    }

    /**
     * 2.4.3 删除身份
     * @version 170212 1.0
     * @param {Int} *alumni_id        校友录id
     * @param {Int} *identity_type_id 身份管理类型id
     */
    @action
    delete(query, config) {
        return Ajax.P('delete_identity', query, config);
    }

    /**
     * 2.1.6 设置用户所在校友录身份
     * @version 170314 1.0
     * @param {Int} *alumni_id         校友录id
     * @param {Int} *user_id           用户id
     * @param {Int} *identity_type_ids 身份id
     */
    @action
    set(query, config) {
        return Ajax.P('update_user_identity', query, config);
    }
};

export default new store();