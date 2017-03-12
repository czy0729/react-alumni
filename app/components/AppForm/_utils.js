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
     * 构造一个根据name生成的表单项目唯一类名
     * @version 170311 1.0
     * @param  {String} *name
     * @return {String}
     */
    getFormItemCls(name) {
        return `components__app-form_${name}`;
    }

    /**
     * 构造必填label
     * @version 170208 1.0
     * @param  {Element} content
     * @return {Element}
     */
    getLabel(content, isRequired) {
        return (
            <label 
                className={classNames('tool-label', {
                    'tool-label_required': isRequired,
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

        return (content) => this.getLabel(content, required);
    }
};

export default new utils();