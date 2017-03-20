/**
 * AppButton 封装loading状态
 * @Date: 2017-03-13 04:52:03
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-19 08:24:11
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import { observer } from 'decorators';
import { $app } from 'stores';
import { Button } from 'antd-mobile';

const prefixCls = 'components__app-button';

@observer
export default class AppButton extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { 
            loading = $app.state.loading, 
            disabled = false,
            className, children, ...other
        } = this.props;

        return (
            <Button 
                className={classNames(prefixCls, className)}
                loading={loading}
                disabled={loading ? true : disabled}
                {...other}
            >
                {loading ? '请求中' : children}
            </Button>
        );
    }
};