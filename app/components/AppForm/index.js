/**
 * AppForm
 * @version 170203 1.0
 * @version 170219 1.1 renderHeader存在时，marginTop设为0
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import { List } from 'antd-mobile';
import './index.less';

const prefixCls = 'components__app-form';

const AppForm = (props) => {
	const { 
		form, onSubmit,
		id = 'form', renderHeader,
		className, children, ...other
	} = props;

	return (
		<form 
			className={classNames(prefixCls, className, {
				[`${prefixCls}_has-header`]: !!renderHeader,
			})}
			id={id}
			onSubmit={onSubmit}
		>
			<List 
				renderHeader={renderHeader}
				{...other}
			>
				{
					React.Children.map(children, (item, idx) =>
						React.cloneElement(item, {
							key: `${prefixCls}-${idx}`,
							form
						}))
				}
			</List>
		</form>
	);
};

AppForm.propTypes = {
	form: React.PropTypes.object.isRequired,
};

AppForm.Input    = require('./input');
AppForm.Radio    = require('./radio');
AppForm.Textarea = require('./textarea');
AppForm.Upload   = require('./upload');

export default AppForm;