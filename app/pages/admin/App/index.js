/**
 * admin容器
 * @Date: 2017-01-23 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-18 18:15:47
 */
'use strict';

import React from 'react';

const prefixCls = 'pages-admin__app';

export default class AdminApp extends React.Component {
    constructor() {
        super();
    }
    
    render() {
        const { children } = this.props;

        return children;
    }
};