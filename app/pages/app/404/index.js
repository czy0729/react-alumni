/**
 * 404
 * @Date: 2017-03-21 06:59:51
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-21 07:19:02
 */
'use strict';

import React from 'react';
import { Button } from 'antd-mobile';
import { ButtonWrap, AppResult } from 'components';

const prefixCls = 'pages-app__404';

export default class App404 extends React.Component {
    constructor() {
        super();
    }
 
    render() {
        return (
            <div className={prefixCls}>
                <AppResult 
                    icon={require('common/svg/destination.svg')}
                    title={404}
                    message={'功能还在开发中'}
                    color={Const.ui.color_success}
                />
            </div>
        );
    }
};