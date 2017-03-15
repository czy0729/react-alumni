/**
 * AvatarBlock 头像Block
 * @version 170313 1.0
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import Img from '../Img';
import './index.less';

const prefixCls = 'components__avatar-block';

const AvatarBlock = (props) => {
    const { src, extra, className, children, ...other } = props;

    return (
        <div className={classNames(prefixCls, className)}>
            <Img src={src} />
            <div>{children}</div>
            {extra && <div className={`${prefixCls}__extra`}>{extra}</div>}
        </div>
    );
};

export default AvatarBlock;