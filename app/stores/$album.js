/**
 * 
 * @Date: 2017-03-24 23:36:39
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-25 05:02:08
 */
'use strict';

import { useStrict, observable, action } from 'mobx';
import common from './common';

useStrict(true);

class store extends common {
    config = {
        namespace: '$album',
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
     * 2.6.0 相册图片
     * @version 170325 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} page       页数
     */
    @action
    fetch(query, config) {
        return this.fetchThenSetStateById(query, config, 'get_photo_list', 'alumni_id');
    }

    /*==================== action ====================*/
    /**
     * 2.1.7 设置或取消管理员授权
     * @version 170211 1.0
     * @param {Int} *alumni_id  校友录id
     * @param {Int} *user_id    用户id
     * @param {Int} *is_manager yes|no
     */
    /*@action
    auth(query, is_manager, config) {
        const api = 'update_admin_list';

        return Ajax.P(api, Ajax.genQuery(api, 'is_manager', is_manager, query), config);
    }*/
};

export default new store();