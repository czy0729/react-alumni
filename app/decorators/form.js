/**
 * @form rc-form createForm()
 * @version 170131 1.0
 * @version 170205 1.1 加入表单常用的几个方法
 */
'use strict';

import React from 'react';
import { createForm } from 'rc-form';

function formDecorator(ComposedComponent) {
    return createForm()(
        class FormComponent extends React.Component {
            constructor() {
                super();

                Utils.binds(this, ['onValidate', 'onOk', 'onSubmit']);
            }

            /**
             * 表单验证，验证后执行next
             * @version 170205 1.0
             */
            onValidate(e, form, next = () => {}) {
                e.preventDefault();

                form.validateFields((err, values) => next(err, values));
            }

            /**
             * 验证返回的err是false时，执行next
             * @version 170205 1.0
             * @version 170310 1.1 #todo 验证错误并自动滚动到错误项的y轴位置
             */
            onOk(err, values, form, next = () => {}) {
                if (err) {
                    console.log(err)
                    //console.log(form.getFieldInstance('real_name').refs.input.getBoundingClientRect())
                    return false;
                }

                next(values);
            }

            /**
             * onValidate + onOk 的组合方法
             * @version 170206 1.0
             */
            onSubmit(e, form, next = () => {}) {
                this.onValidate(e, form, (err, values) => {
                    this.onOk(err, values, form, next);
                });
            }
            
            render() {
                return (
                    <ComposedComponent 
                        onValidate={this.onValidate}
                        onOk={this.onOk}
                        onSubmit={this.onSubmit}
                        {...this.props}
                    />
                );
            }
        }
    );
}

export default formDecorator;