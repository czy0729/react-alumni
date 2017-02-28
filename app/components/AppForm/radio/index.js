/**
 * AppForm.Radio
 * @version 170219 1.0
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import { Radio, Modal } from 'antd-mobile';
import _utils from '../_utils';

const prefixCls = 'components__app-form__radio';

const AppFormRadio = (props) => {
    const { 
        form, initialValue, option, 
        name, title, value, clear, onChange = () => {},
        className, ...other,
    } = props;

    return (
        <Radio.RadioItem
            {...form.getFieldProps(name, {
                initialValue,
                ...option,
            })}
            className={classNames(prefixCls, className)}
            checked={form.getFieldValue(name) == value}
            onChange={() => {
                onChange();
                form.setFieldsValue({
                    [name]: clear != undefined && form.getFieldValue(name) == value ? clear : value,
                });
            }}
            {...other}
        >
            {title && _utils.getLabelDecorator(option)(title)}
        </Radio.RadioItem>
    );
};

export default AppFormRadio;