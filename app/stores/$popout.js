/**
 * Popout弹出层
 * @Date: 2017-02-28 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-27 06:24:13
 */
'use strict';

import { useStrict, observable, action } from 'mobx';
import common from './common';

useStrict(true);

const prevent = (e) => e.preventDefault();

class store extends common {
    config = {
        namespace: '$popout',
        cache: false,
    };

    @observable state = this.initState({
        layout: {},
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
        this.hideLayout();
        this.hideMask();
    }

    /**
     * 显示一个顶层
     * @version 170326 1.0
     * @param {Element} content
     */
    @action
    showLayout(content, ms = 0) {
        document.body.style.overflowY = 'hidden';
        //document.addEventListener('touchmove', prevent, false);

        this.setState({
            show: true,
            content,
            ms,
        }, 'layout');
    }

    /**
     * 隐藏遮罩背景层
     * @version 170326 1.0
     */
    @action
    hideLayout() {
        const { ms } = this.state.layout;

        setTimeout(() => {
            document.body.style.overflowY = 'initial';
            document.removeEventListener('touchmove', prevent, false);

            this.setState({
                show: false,
                ms: 0,
            }, 'layout');
        }, ms);
    }

    /**
     * 显示遮罩背景层
     * @version 170216 1.0
     * @param {Element} content
     */
    @action
    showMask(content, ms = 0) {
        document.body.style.overflowY = 'hidden';

        this.setState({
            show: true,
            content,
            ms,
        }, 'mask');
    }

    /**
     * 隐藏遮罩背景层
     * @version 170216 1.0
     */
    @action
    hideMask() {
        const { ms } = this.state.mask;

        setTimeout(() => {
            document.body.style.overflowY = 'initial';
            document.removeEventListener('touchmove', prevent, false);

            this.setState({
                show: false,
                ms: 0,
            }, 'mask');
        }, ms);
    }
};

export default new store();