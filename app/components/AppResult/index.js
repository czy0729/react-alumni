/**
 * AppResult
 * @version 170317 1.0
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import { Result, Icon } from 'antd-mobile';
import './index.less';

const prefixCls = 'components__app-result';

const AppResult = (props) => {
    const { 
        icon = require('common/svg/check.svg'), 
        color = Const.ui.color_primary, 
        title, 
        message, 
        className, 
        ...other,
    } = props;

    return (
        <Result
            className={classNames(prefixCls, className)}
            img={
                <Icon 
                    className={`${prefixCls}__icon`}
                    type={icon}
                    style={{ color }}
                />
            }
            title={<p className={`${prefixCls}__title`}>{title}</p>}
            message={<p className={`${prefixCls}__message`}>{message}</p>}
        />
    );
}

export default AppResult;