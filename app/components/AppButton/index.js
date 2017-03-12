/**
 * AppButton 封装loading状态
 * @version 170313 1.0
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