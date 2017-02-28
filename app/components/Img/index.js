/**
 * AppImg 项目统一图片组件
 * @version 170208 1.0
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import './index.less';

const prefixCls = 'components__img';

const AppImg = (props) => {
	const { src, size, style, className, ...other } = props;

	return (
		<div 
		    className={classNames(prefixCls, className)} 
		    style={size
	          ? { width: size, height: size, backgroundImage: `url(${Utils.getAppImgUrl(src)})`, ...style }
	          : { backgroundImage: `url(${Utils.getAppImgUrl(src)})`, ...style }
		    }
		    {...other}
		/>
	);
};

export default AppImg;