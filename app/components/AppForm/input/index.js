/**
 * AppForm.Input
 * @version 170203 1.0
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import { InputItem, Modal } from 'antd-mobile';
import _utils from '../_utils';

const prefixCls = 'components__app-form__input'

const AppFormInput = (props) => {
    const { 
        form, option,
        name, title, initialValue,
        className, ...other 
    } = props;

    return (
        <InputItem 
            {...form.getFieldProps(name, {
                initialValue,
                ...option,
            })}
            className={classNames(prefixCls, _utils.getFormItemCls(name), className)}
            name={name}
            clear
            placeholder={`请输入${title}`}
            updatePlaceholder
            error={!!form.getFieldError(name)}
            onErrorClick={() => {
                Modal.alert('提示', form.getFieldError(name).join('，'));
            }}
            {...other}
        >
            {title && _utils.getLabelDecorator(option)(title)}
        </InputItem>
    );
};

export default AppFormInput;