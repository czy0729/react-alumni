/**
 * user分组容器
 * @version 170228 1.0
 */
'use strict';

import React from 'react';

const prefixCls = 'pages-user__app';

export default class UserApp extends React.Component {
    constructor() {
        super();
    }
    
    render() {
        const { children } = this.props;

        return children;
    }
};