/**
 * admin容器
 * @version 170123 1.0
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

        return (
            <div className={prefixCls}>
                {children}
            </div>
        );
    }
};