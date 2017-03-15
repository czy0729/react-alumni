/**
 * 通知
 * @version 170213 1.0
 */
'use strict';

import { useStrict, observable, extendObservable, action, computed } from 'mobx';
import common from './common';

useStrict(true);

class store extends common {
    constructor() {
        super();

        this.config = {
            namespace: '$notice',
            cache: true,
        };
    }

    @observable state = this.initState({
        list: {},
        detail: {},
    });

    /**
     * 2.5.1 通知列表
     * @version 170213 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} page
     */
    @action
    async fetch_list(query, config) {
        const { alumni_id } = query;

        const result = await Ajax.P('get_notice_list', query, {
            show: !this.getById(alumni_id, 'list')._loaded,
            ...config,
        });

        this.setStateById(alumni_id, result, 'list');
    }

    /**
     * 2.5.2 通知详细
     * @version 170213 1.0
     * @param {Int} *notice_id 文章id
     */
    @action
    async fetch_detail(query, config) {
        const { notice_id } = query;

        const result = await Ajax.P('get_notice', query, {
            show: !this.getById(notice_id, 'detail')._loaded,
            ...config,
        });

        this.setStateById(notice_id, result, 'detail');
    }

    /**
     * 2.5.0 发布通知
     * @version 170214 1.0
     * @param {Int}    *alumni_id 校友录id
     * @param {String} *title     标题
     * @param {String} *content   内容
     */
    @action
    async add(query, config) {
        await Ajax.P('add_notice', query, config);
    }

    /**
     * 2.5.3 修改通知
     * @version 170214 1.0
     * @param {Int}    *notice_id 文章id
     * @param {String} *title     标题
     * @param {String} *content   内容
     */
    @action
    async update(query, config) {
        await Ajax.P('update_notice', query, config);
    }

    /**
     * 2.5.4 删除通知
     * @version 170217 1.0
     * @param {Int} *notice_id 文章id
     */
    @action
    async delete(query, config) {
        await Ajax.P('delete_notice', query, config);
    }
};

export default new store();