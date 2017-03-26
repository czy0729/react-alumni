/**
 * AppForm.Upload
 * @version 170206 1.0
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import { List, InputItem } from 'antd-mobile';
import Upload from '../../Upload';
import _utils from '../_utils';
import './index.less';

const prefixCls = 'components__app-form__upload';

export default class AppFormUpload extends React.Component {
    constructor(props) {
        super(props);

        Utils.binds(this, ['onChange']);
    }

    async onChange(files, e) {
        const { form, name } = this.props;

        const result = await Ajax.P('do_upload_file', { 
            data: files.data,
        });

        form.setFieldsValue({
            [name]: result,
        });
    }

    render() {
        const { form, initialValue, option, title, name } = this.props;

        //关键：form改变后要以form的值为主，不再使用initialValue，并构造upload需要的数据结构
        const value = form.getFieldValue(name);
        const files = value 
          ? [{ url: Utils.getAppImgUrl(value) }] 
          : initialValue
              ? [{ url: Utils.getAppImgUrl(initialValue) }] 
              : []; 

        return (
            <List.Item 
                className={classNames(prefixCls, _utils.getFormItemCls(name), {
                    [`${prefixCls}_disabled-input`]: files.length > 0,
                })}
                arrow="horizontal"
            >
                <div className={`${prefixCls}__wrap`}>
                    <div className={`${prefixCls}__label`}>
                        {_utils.getLabelDecorator(option)(title)}
                    </div>
                    <label className="flex-1" htmlFor={`${prefixCls}-${name}`}>
                        <Upload 
                            id={`${prefixCls}-${name}`}
                            files={files}
                            onChange={this.onChange}
                        />
                        {form.getFieldDecorator(name, {
                            initialValue,
                            ...option,
                        })(<InputItem style={{ display: 'none' }} />)}
                    </label>
                </div>
            </List.Item>
        );
    }
};