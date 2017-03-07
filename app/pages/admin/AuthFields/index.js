/**
 * 认证需填写字段
 * @version 170219 1.0
 * @version 170307 1.1 判断是否来源于#/add_alumni/
 */
'use strict';

import React from 'react';
import { form, observer } from 'decorators';
import { $auth } from 'stores';
import { List, Button } from 'antd-mobile';
import { Title, ButtonWrap, AppForm } from 'components';
import { generateFieldsConfig } from '../_utils';
import './index.less';

const prefixCls = 'pages-admin__auth-fields';

@form
@observer
export default class AdminAuthFields extends React.Component {
    constructor() {
        super();

        Utils.binds(this, ['handleSubmit']);
    }

    componentDidMount() {
    	$auth.fetch_auth_fields({ alumni_id: this.alumni_id });

        console.log(this.is_from_add_alumni)
    }

    async handleSubmit(values) {
        await $auth.update_auth_fields({
            alumni_id: this.alumni_id,
            ...values,
        });

        Utils.onSuccess();
    }

    get alumni_id() {
        return this.props.params.alumni_id;
    }

    get is_from_add_alumni() {
        return this.props.location.query;
    }

    renderForms() {
        const { form } = this.props;
        const data = $auth.getById(this.alumni_id, 'auth_fields');

        return generateFieldsConfig(data).map((item, index) => (
            <AppForm 
                key={index}
                renderHeader={() => (
                    <div className={`${prefixCls}__form-header`}>
                        <span>{Const.fileds_group[index]}</span>
                        {
                            index == 0 && 
                            <div>
                                <span>必填</span>
                                <span>选填</span>
                            </div>
                        }
                    </div>
                )}
                form={form}
            >
                {
                    item.map((i, idx) => (
                        <List.Item 
                            key={`${index}-${i[0]}`} 
                            extra={this.renderRadios(i)}
                        >
                            {i[2]}
                        </List.Item>
                    ))
                }
            </AppForm>
        ));
    }

    //右侧两个单选item
    renderRadios(item) {
        const { form } = this.props;

        return (
            <div className={`${prefixCls}__radios`}>
                <AppForm.Radio 
                    form={form} 
                    name={item[0]}
                    initialValue={item[1]}
                    value="1"
                    clear="0"
                    disabled={item[3] == 0} /*分组0的项目不能修改*/
                />
                <AppForm.Radio 
                    form={form} 
                    name={item[0]}
                    initialValue={item[1]}
                    value="2"
                    clear="0"
                    disabled={item[3] == 0}
                />
            </div>
        );
    }

    render() {
        const { form, onSubmit } = this.props;

        return (
            <div className={prefixCls}>
                <Title>请设置加入该校友录的校友需要填写的个人信息。</Title>
                {this.renderForms()}

                <ButtonWrap>
                    <Button 
                        type="primary" 
                        onClick={(e) => onSubmit(e, form, this.handleSubmit)}
                    >
                        保存
                    </Button>
                </ButtonWrap>
            </div>
        );
    } 
};