/**
 * 填写认证信息
 * [!] 作为管理员创建的第4步时，成功后跳转到创建成功结果页
 * [!] 作为用户加入校友录时，有留言字段，提交成功后，等待审核返回我的校友录
 * [!] 取得当前用户的个人信息，并作为默认值
 * @version 170307 0.1
 */
'use strict';

import React from 'react';
import { form, observer } from 'decorators';
import { $auth, $user } from 'stores';
import { Button } from 'antd-mobile';
import { Title, ButtonWrap, AppForm } from 'components';

const prefixCls = 'pages-index__auth';

@form
@observer
export default class Auth extends React.Component {
    constructor() {
        super();

        Utils.binds(this, ['handleSubmit']);
    }

    componentDidMount() {
        $user.fetch();
        $auth.fetch_auth_fields({ alumni_id: this.alumni_id });
    }

    handleSubmit(value) {
        console.log(value)
    }

    get alumni_id() {
        return this.props.params.alumni_id;
    }

    get query() {
        return this.props.location.query;
    }

    renderForms() {
        const { form } = this.props;
        const data = $auth.getById(this.alumni_id, 'auth_fields');
        const user = $user.state;

        return Utils.generateFieldsConfig(data).map((item, index) => {
            const items = [];

            item.forEach((i, idx) => {
                //假如authFileds里不是必填或者选填，不生成
                const isNeed = data[i[0]];

                //isNeed 1是必填2是选填
                if (isNeed != '0') {
                    const { config, rules, component = 'Input' } = i[5];
                    const title = i[2];
                    const name = i[0].replace('is_need_', '');
                    const isRequired = i[1] == '1';
                    const El = AppForm[component];
                    
                    items.push(
                        <El
                            key={name}
                            title={title}
                            name={name}
                            initialValue={user[name]}
                            option={isRequired || rules ? Const.rules.genRules(rules, isRequired) : undefined}
                            {...config}
                        />
                    );
                }
            });

            return items.length != 0 && (
                <AppForm 
                    key={Const.fileds_group[index]}
                    renderHeader={() => <div>{Const.fileds_group[index]}</div>}
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
                text = '完成 (4/4)';
                break;

            default: 
                text = '申请加入';
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
            <div className={prefixCls}>
                <Title>校友录管理员要求，必须真实填写以下信息才可以加入校友录，以便校友之间联系和交换名片。</Title>

                {this.renderForms()}

                {this.renderBtn()}
            </div>
        );
    } 
};