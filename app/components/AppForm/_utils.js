/**
 * form utils functions
 * @version 170208 1.0
 * @version 170222 1.1 调整了长度大于4的label的样式
 */
'use strict';

import React from 'react';
import classNames from 'classnames';

class utils {
	/**
     * 构造必填label
     * @version 170208 1.0
     * @param  {Element} content
     * @return {Element}
     */
	getRequiredLabel(content) {
		return (
			<label 
				className={classNames('tool-label', 'tool-label_required', {
					'text-sm': content.length > 4,
				})}
			>
				{content}
			</label>
		);
	}

	/**
     * 根据option，构造label
     * @version 170208 1.0
     * @param  {Object} option
     * @return {Func}
     */
	getLabelDecorator(option = { rules: [] }) {
		let required = false;

		option.rules.forEach((item) => {
			if (item.required) {
				required = true;
				return false;
			}
		});

		return (content) => required 
		  ? this.getRequiredLabel(content) 
		  : <label 
			  	className={classNames('tool-label', {
					'text-sm': content.length > 4,
				})}
		  	>
		  		{content}
		  	</label>;
	}
};

export default new utils();