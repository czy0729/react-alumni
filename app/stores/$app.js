/**
 * App一些特殊的状态
 * @version 170306 1.0
 */
'use strict';

import { useStrict, observable, action } from 'mobx';
import common from './common';

useStrict(true);

class store extends common {
    config = {
        namespace: '$app',
        cache: true,
    };

    @observable state = this.initState({
        loading: false,
        tabbar: {
            show: false,
        },
    }, ['loading']);

    constructor() {
        super();
    }

    /**
     * 隐藏Tabbar
     * @version 170306 1.0
     */
    @action
    hideTabbar() {
        this.setState({
            show: false,
        }, 'tabbar');
    }

    /**
     * 显示Tabbar
     * @version 170306 1.0
     */
    @action
    showTabbar() {
        this.setState({
            show: true,
        }, 'tabbar');
    }

    /**
     * 标识action是否ajax请求中
     * @version 170313 1.0
     */
    @action
    loading(loading = true) {
        this.state = {
            ...this.state,
            loading,
        };
    }
};

export default new store();