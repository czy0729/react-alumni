/**
 * Title 用于页面说明
 * @version 170219 1.0
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import './index.less';

const prefixCls = 'components__title';

const Title = ({ className, children, ...other }) => {
    return (
        <div 
            className={classNames(prefixCls, className)}
            {...other}
        >
            <span>{children}</span>
        </div>
    );
}

export default Title;