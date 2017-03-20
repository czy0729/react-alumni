/**
 * index分组容器
 * @Date: 2017-02-15 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-19 07:03:27
 */
'use strict';

import React from 'react';

const prefixCls = 'pages-index__app';

export default class IndexApp extends React.Component {
    constructor() {
        super();
    }
    
    render() {
        const { children } = this.props;

        return children;
    }
};