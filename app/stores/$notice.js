/**
 * 通知
 * @Date: 2017-02-13 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-19 04:33:41
 */
'use strict';

import { useStrict, observable, action } from 'mobx';
import common from './common';

useStrict(true);

class store extends common {
    config = {
        namespace: '$notice',
        cache: true,
    };

    @observable state = this.initState({
        list: {},
        detail: {},
    });

    constructor() {
        super();
    }

    /*==================== view ====================*/
    /**
     * 2.5.1 通知列表
     * @version 170213 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} page
     */
    @action
    fetch_list(query, config) {
        return this.fetchThenSetStateById(query, config, 'get_notice_list', 'alumni_id', 'list');
    }

    /**
     * 2.5.2 通知详细
     * @version 170213 1.0
     * @param {Int} *notice_id 文章id
     */
    @action
    fetch_detail(query, config) {
        return this.fetchThenSetStateById(query, config, 'get_notice', 'notice_id', 'detail');
    }

    /*==================== action ====================*/
    /**
     * 2.5.0 发布通知
     * @version 170214 1.0
     * @param {Int}    *alumni_id 校友录id
     * @param {String} *title     标题
     * @param {String} *content   内容
     */
    @action
    add(query, config) {
        return Ajax.P('add_notice', query, config);
    }

    /**
     * 2.5.3 修改通知
     * @version 170214 1.0
     * @param {Int}    *notice_id 文章id
     * @param {String} *title     标题
     * @param {String} *content   内容
     */
    @action
    update(query, config) {
        return Ajax.P('update_notice', query, config);
    }

    /**
     * 2.5.4 删除通知
     * @version 170217 1.0
     * @param {Int} *notice_id 文章id
     */
    @action
    delete(query, config) {
        return Ajax.P('delete_notice', query, config);
    }
};

export default new store();