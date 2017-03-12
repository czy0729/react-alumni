/**
 * Title 用于页面说明
 * @version 170219 1.0
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd-mobile';
import './index.less';

const prefixCls = 'components__title';

const Title = ({ className, children, ...other }) => {
    return (
        <div 
            className={classNames(prefixCls, className)}
            {...other}
        >
            <Icon type="exclamation-circle-o" />
            <span> {children}</span>
        </div>
    );
}

export default Title;