/**
 * generate textarea value
 * @version 170215 1.0
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import { emojify } from 'react-emoji';
import './index.less';

const prefixCls = 'components__content';

const Content = (props) => {
	const { className, value, ...other } = props;

    return (
    	<div 
    		className={classNames(prefixCls, className)}
    		{...other}
    	>
    		{
    			Utils.emojify(value).map((item) => {
			        if (typeof item !== 'string') return item;

			        if (item.indexOf('\n') === -1) {
			            return item;

			        } else {
			            const temp = [];

			            item.split('\n').forEach((i, idx) => {
			                if (idx == 0) {
			                    i !== '' && temp.push(i);
			                } else {
			                    temp.push(<br />);
			                    i !== '' && temp.push(i)
			                }
			            });

			            return temp;
			        }
			    })
    		}
    	</div>
    );
};

export default Content;