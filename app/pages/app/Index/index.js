/**
 * 项目顶容器
 * @version 170120 1.0
 */
'use strict';

import React from 'react';
import stores, { $user } from 'stores';
import Popout from '../Popout';

import './index.less';

const prefixCls = 'pages-app';

export default class App extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        //测试用
        window.Const = Const;
        window.Utils = Utils;
        
        if (typeof wx == 'undefined') window.addEventListener('beforeunload', e => stores.setCache(), false);

        $user.fetch();
    }
    
    render() {
        const { children } = this.props;

        return (
            <div className={prefixCls}>
                {children}
                <Popout />
            </div>
        );
    }
};