/**
 * 认证需填写字段
 * 17-03-07 判断来源add_alumni
 * @Date: 2017-02-19 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-18 23:14:45
 */
'use strict';

import React from 'react';
import { form, observer } from 'decorators';
import { $auth } from 'stores';
import { List, Button } from 'antd-mobile';
import { Spin, Title, ButtonWrap, AppForm } from 'components';
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
        $auth.fetch_auth_fields({ 
            alumni_id: this.alumni_id,
        });
    }

    async handleSubmit(values) {
        const { alumni_id } = this;

        await $auth.update_auth_fields({
            alumni_id,
            ...values,
        });

        switch (this.query.from) {
            case 'add_alumni':
                Utils.router.replace({
                    pathname: Const.router.admin_auth_show({ 
                        alumni_id,
                    }),
                    query: this.query,
                });
                break;

            default:
                Utils.onSuccess();
                break;
        }
    }

    get alumni_id() {
        return this.props.params.alumni_id;
    }

    get query() {
        return this.props.location.query;
    }

    get data() {
        return {
            auth_fields: $auth.getStateById(this.alumni_id, 'auth_fields'),
        };
    }

    renderForms() {
        const { form } = this.props;
        const { auth_fields } = this.data;

        return Utils.generateFieldsConfig(auth_fields).map((item, index) => (
            <AppForm 
                key={index}
                form={form}
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

    renderBtn() {
        const { form, onSubmit } = this.props;
        let text;

        switch (this.query.from) {
            case 'add_alumni':
                text = '下一步 (2/4)';
                break;

            default: 
                text = '保存';
                break;
        }

        return (
            <ButtonWrap>
                <Button 
                    type="primary" 
                    onClick={(e) => onSubmit(e, form, this.handleSubmit)}
                >
                    {text}
                </Button>
            </ButtonWrap>
        );
    }

    render() {
        return (
            <Spin
                className={prefixCls}
                spinning={Utils.isSpinning(this.data)}
            >
                <Title>请设置加入该校友录的校友需要填写的个人信息。</Title>

                {this.renderForms()}

                {this.renderBtn()}
            </Spin>
        );
    } 
};