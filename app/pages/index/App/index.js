/**
 * index分组容器
 * @version 170215 1.0
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