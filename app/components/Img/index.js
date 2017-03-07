/**
 * AppImg 项目统一图片组件
 * @version 170208 1.0
 * @version 170301 1.1 [+] `empty` 支持默认图片
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import './index.less';

const prefixCls = 'components__img';

const AppImg = (props) => {
	const { src, size, empty, style, className, ...other } = props;

	return (
		<div 
		    className={classNames(prefixCls, className)} 
		    style={size
	          ? { width: size, height: size, backgroundImage: `url(${Utils.getAppImgUrl(src) || empty})`, ...style }
	          : { backgroundImage: `url(${Utils.getAppImgUrl(src) || empty})`, ...style }
		    }
		    {...other}
		/>
	);
};

export default AppImg;