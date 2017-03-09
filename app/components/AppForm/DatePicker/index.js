/**
 * AppForm.DatePicker
 * https://mobile.ant.design/components/date-picker/
 * @version 170309 1.0
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { DatePicker, List } from 'antd-mobile';
import _utils from '../_utils';
import './index.less';

const prefixCls = 'components__app-form__date-picker'

//const maxDate = moment('2018-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
//const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);
//const zhNow = moment().locale('zh-cn').utcOffset(8);

const AppFormDatePicker = (props) => {
    let { 
        form, option,
        name, title, initialValue,
        mode = 'date', format,
        minDate = moment('1900-01-01', 'YYYY-MM-DD').utcOffset(8),
        maxDate = Const.now,
        className, ...other,
    } = props;

    if (typeof initialValue === 'string') {
        let momentFormat;

        switch (mode) {
            case 'year':
                momentFormat = 'YYYY';
                format = val => `${val.format(momentFormat)}年`;
                break;

            default:
                momentFormat = 'YYYY-MM-DD';
                break;
        }

        initialValue = moment(initialValue, momentFormat);
    }

    return (
        <DatePicker
            mode={mode}
            format={format}
            title={`选择${title}`}
            minDate={minDate}
            maxDate={maxDate}
            {...form.getFieldProps(name, {
                initialValue,
                ...option,
            })}
            {...other}
        >
            <List.Item 
                className={`${prefixCls}__list-item`} 
                arrow="horizontal"
            >
                {title && _utils.getLabelDecorator(option)(title)}
            </List.Item>
        </DatePicker>
    );
};

export default AppFormDatePicker;