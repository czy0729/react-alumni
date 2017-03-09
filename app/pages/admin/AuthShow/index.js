/**
 * 认证需填写字段
 * @version 170220 1.0
 * @version 170307 1.1 判断来源add_alumni
 */
'use strict';

import React from 'react';
import { form, observer } from 'decorators';
import { $auth } from 'stores';
import { List, Button } from 'antd-mobile';
import { Title, ButtonWrap, AppForm } from 'components';
import './index.less';

const prefixCls = 'pages-admin__auth-show';

@form
@observer
export default class AdminAuthShow extends React.Component {
    constructor() {
        super();

        Utils.binds(this, ['handleSubmit']);
    }

    componentDidMount() {
        const { alumni_id } = this;

        $auth.fetch_auth_fields({ alumni_id });
    	$auth.fetch_show_fields({ alumni_id });
    }

    async handleSubmit(values) {
        const { alumni_id } = this;

        await $auth.update_show_fields({
            alumni_id,
            ...values,
        });

        switch (this.query.from) {
            case 'add_alumni':
                Utils.router.replace({
                    pathname: Const.router.auth({ alumni_id }),
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

    renderForms() {
        const { form } = this.props;
        const dataShowFields = $auth.getById(this.alumni_id, 'show_fields');
        const dataAuthFields = $auth.getById(this.alumni_id, 'auth_fields');

        return Utils.generateFieldsConfig(dataShowFields).map((item, index) => {
            const items = [];

            item.forEach((i, idx) => {
                //假如authFileds里不是必填或者选填，不生成
                if (dataAuthFields[i[0].replace('is_show_', 'is_need_')] != '0') {
                    items.push(
                        <AppForm.Radio 
                            key={`${index}-${idx}`} 
                            name={i[0]} 
                            title={i[2]} 
                            initialValue={i[1]} 
                            value="1"
                            clear="0"
                        />
                    );
                }
            });

            return items.length != 0 && (
                <AppForm 
                    key={index}
                    renderHeader={() => (
                        <div className={`${prefixCls}__form-header`}>
                            {
                                index == 0
                                  ? <span>
                                        <span>{Const.fileds_group[index]}</span>
                                        <span className="text-mini"> (昵称、地区、性别授权时自动获取)</span>
                                        <div>
                                            <span>可见</span>
                                        </div>
                                    </span>
                                  : <span>{Const.fileds_group[index]}</span>
                            }
                        </div>
                    )}
                    form={form}
                >
                    {items}
                </AppForm>
            );
        });
    }

    renderBtn() {
        const { form, onSubmit } = this.props;
        let text;

        switch (this.query.from) {
            case 'add_alumni':
                text = '下一步 (3/4)';
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
        const { form, onSubmit } = this.props;

        return (
            <div className={prefixCls}>
                <Title>请设置已认证的校友可以查看其它校友的信息。不建议勾选重要或全部信息，没勾选或全部信息交换名片方可查看。</Title>
                
                {this.renderForms()}

                {this.renderBtn()}
            </div>
        );
    } 
};