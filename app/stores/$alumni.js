/**
 * 校友录
 * @Date: 2017-02-05 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-18 18:14:34
 */
'use strict';

import { useStrict, observable, action } from 'mobx';
import common from './common';

useStrict(true);

class store extends common {
    config = {
        namespace: '$alumni',
        cache: true,
    };

    @observable state = this.initState({
        base: {},
        list: {},
    });

    constructor() {
        super();
    }

    /*==================== view ====================*/
    /**
     * 2.1.1 获取校友录基本信息
     * @version 170205 1.0
     * @param {Int} *alumni_id 校友录id
     */
    @action
    fetch(query, config) {
        return this.fetchThenSetStateById(query, config, 'get_alumni_info', 'alumni_id');
    }

    /**
     * 2.1.0 我的校友录列表
     * @version 170228 1.0
     */
    @action
    fetch_list(query, config) {
        return this.fetchThenSetState(query, config, 'get_alumni_list', 'list');
    }

    /*==================== action ====================*/
    /**
     * 1.0 添加校友录
     * @version 170305 1.0
     * @param {String} *name        校友录名称
     * @param {String} *school_name 学校名称
     * @param {String} *description 描述
     * @param {Base64} logo         校友录头像
     */
    @action
    add(query, config) {
        return Ajax.P('add_alumni', query, config);
    }

    /**
     * 2.1.2 修改校友录基本信息
     * @version 170207 1.0
     * @param {Int}    *alumni_id  校友录id
     * @param {String} logo        校友录头像
     * @param {String} name        校友录名称
     * @param {String} school_name 学校名称
     * @param {String} description 描述
     */
    @action
    update(query, config) {
        return Ajax.P('update_alumni_info', query, config);
    }
};

export default new store();