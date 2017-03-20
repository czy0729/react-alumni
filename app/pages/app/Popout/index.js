/**
 * Popout容器，放置弹出层之类的全局性UI
 * @Date: 2017-02-16 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-19 06:58:17
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import { observer } from 'decorators';
import { $popout } from 'stores';

import './index.less';

const prefixCls = 'pages-app__popout';

@observer
export default class AppPopout extends React.Component {
    constructor() {
        super();
    }

    renderMask() {
        const { mask } = $popout.state;
        const { show, content, config = {} } = mask;
        const { className } = config;

        delete config.className;

        return show && (
            <div 
                className={classNames('am-modal-mask', `${prefixCls}__mask`, className)}
                onClick={(e) => $popout.hideMask()}
                {...config}
            >
                {content}
            </div>
        );
    }

    render() {
        return (
            <div className={prefixCls}>
                {this.renderMask()}
            </div>
        );
    }
};