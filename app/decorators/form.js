/**
 * @form rc-form createForm()
 * @version 170131 1.0
 * @version 170205 1.1 加入表单常用的几个方法
 * @version 170311 1.2 分离出onErr
 */
'use strict';

import React from 'react';
import { createForm } from 'rc-form';
import { getFormItemCls } from 'components/AppForm/_utils';

const formDecorator = (ComposedComponent) => {
    return createForm()(
        class FormComponent extends React.Component {
            constructor() {
                super();

                Utils.binds(this, ['formatValues', 'onValidate', 'onErr', 'onOk', 'onSubmit']);
            }
            
            /**
             * Moment格式转为时间字符串，数组转为字符串逗号分隔
             * @version 170312 1.0
             */
            formatValues(values) {
                for (let key in values) {
                    switch (values[key].constructor.name) {
                        case 'Array':
                            values[key] = values[key].join(',');
                            break;

                        case 'Moment':
                            //这里可能会出问题
                            values[key] = values[key]._i;
                            break;

                        default: break;
                    }
                }

                return values;
            }

            /**
             * 表单验证，验证后执行next
             * @version 170205 1.0
             * @version 170312 1.1 默认格式化了values
             */
            onValidate(e, form, next = () => {}) {
                e.preventDefault();

                form.validateFields((err, values) => {
                    if (err) {
                        this.onErr(err);
                        return;
                    }

                    this.onOk(this.formatValues(values), next);
                });
            }

            /**
             * 表单验证错误后滚动到首个错误表单项的位置
             * @version 170311 1.0
             */
            onErr(err) {
                //由于err是对象不是数组，所以没法确定第一个错误是那个字段？
                let clients = [];
                for (let fieldName in err) {
                    clients.push({
                        fieldName,

                        //#todo 有空这里需要做一下检查dom存在与否
                        top: document.querySelector(`.${getFormItemCls(fieldName)}`).getBoundingClientRect().top,
                    });

                    //client.top值越小越上
                    clients = clients.sort((a, b) => a.top - b.top);
                }

                Utils.scrollTo(document.body.scrollTop + clients[0].top)
            }

            /**
             * 验证返回的err是false时，执行next
             * @version 170205 1.0
             * @version 170310 1.1 分离出onErr
             */
            onOk(values, next = () => {}) {
                next(values);
            }

            /**
             * onValidate + onOk 的组合方法
             * @version 170206 1.0
             */
            onSubmit(e, form, next = () => {}) {
                this.onValidate(e, form, (values) => this.onOk(values, next));
            }
            
            render() {
                return (
                    <ComposedComponent 
                        onValidate={this.onValidate}
                        onErr={this.onErr}
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