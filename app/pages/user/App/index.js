/**
 * user分组
 * @Date: 2017-03-01 03:47:47
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-19 08:10:29
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