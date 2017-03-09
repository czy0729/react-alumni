/**
 * AppForm.Picker
 * https://mobile.ant.design/components/picker/
 * @version 170309 1.0
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import { Picker, List } from 'antd-mobile';
import _utils from '../_utils';
import './index.less';

const prefixCls = 'components__app-form__picker'

const AppFormPicker = (props) => {
    const { 
        form, option,
        name, title, initialValue,
        className, ...other,
    } = props;

    return (
        <Picker 
            className={classNames(prefixCls, className)}
            data={Const[name]}
            title={`选择${title}`}
            cols={1}
            {...form.getFieldProps(name, {
                initialValue: [initialValue],
                ...option,
            })}
        >
            <List.Item 
                className={`${prefixCls}__list-item`} 
                arrow="horizontal"
            >
                {title && _utils.getLabelDecorator(option)(title)}
            </List.Item>
        </Picker>
    );
};

export default AppFormPicker;