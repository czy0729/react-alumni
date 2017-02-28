/**
 * Page
 * @version 170125 1.0
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import './index.less';

const prefixCls = 'components__page';

const Page = ({ className, children, ...other }) => {
	return (
		<div 
			className={classNames(prefixCls, className)}
			{...other}
		>
			{children}
		</div>
	);
}

export default Page;