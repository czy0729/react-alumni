/**
 * Popout弹出层
 * @Date: 2017-02-28 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-19 04:38:23
 */
'use strict';

import { useStrict, observable, action } from 'mobx';
import common from './common';

useStrict(true);

class store extends common {
    config = {
        namespace: '$popout',
        cache: false,
    };

    @observable state = this.initState({
        mask: {},
    });

    constructor() {
        super();
    }

    /*==================== action ====================*/
    /**
     * 全局popout隐藏
     * @version 170216 1.0
     * @param {Element} content
     */
    @action
    hide() {
        this.hideMask();
    }

    /**
     * 显示遮罩背景层
     * @version 170216 1.0
     * @param {Element} content
     */
    @action
    showMask(content, config) {
        this.setState({
            show: true,
            content,
            config,
        }, 'mask');
    }

    /**
     * 隐藏遮罩背景层
     * @version 170216 1.0
     */
    @action
    hideMask() {
        this.setState({
            show: false,
        }, 'mask');
    }
};

export default new store();