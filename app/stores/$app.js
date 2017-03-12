/**
 * App一些特殊的状态
 * @version 170306 1.0
 */
'use strict';

import { useStrict, observable, extendObservable, action, computed } from 'mobx';
import common from './common';

useStrict(true);

class store extends common {
    constructor() {
        super();

        this.config = {
            namespace: '$app',
            cache: true,
        };
    }

    @observable state = this.initState({
        loading: false,
        tabbar: {
            show: true,
        },
    }, ['loading']);

    /**
     * @version 170306 1.0
     */
    @action
    hideTabbar() {
        this.setState({
            show: false,
        }, 'tabbar');
    }

    /**
     * @version 170306 1.0
     */
    @action
    showTabbar() {
        this.setState({
            show: true,
        }, 'tabbar');
    }

    /**
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