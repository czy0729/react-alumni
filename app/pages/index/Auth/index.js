/**
 * 填写认证信息
 * [!] 作为管理员创建的第4步时，成功后跳转到创建成功结果页
 * [!] 作为用户加入校友录时，有留言字段，提交成功后，等待审核返回我的校友录
 * [!] 取得当前用户的个人信息，并作为默认值
 * @Date: 2017-03-08 10:53:49
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-19 07:10:05
 */
'use strict';

import React from 'react';
import { form, observer } from 'decorators';
import { $auth, $user, $alumni } from 'stores';
import { Button } from 'antd-mobile';
import { Spin, Title, ButtonWrap, AppForm } from 'components';

const prefixCls = 'pages-index__auth';

@form
@observer
export default class IndexAuth extends React.Component {
    constructor() {
        super();

        Utils.binds(this, ['handleSubmit']);
    }

    componentDidMount() {
        $user.fetch();
        $auth.fetch_auth_fields({ alumni_id: this.alumni_id });
    }

    async handleSubmit(value) {
        const { alumni_id } = this;

        switch (this.query.from) {
            //创建校友录第四步
            case 'add_alumni':
                //创建者信息认证
                await $auth.alumni_auth({
                    alumni_id,
                    ...value,
                });

                //更新校友录信息
                await $alumni.fetch({ alumni_id });

                Utils.router.replace({
                    pathname: Const.router.result(),
                    state: {
                        title: '创建成功',
                        message: '您现在可以通过分享，邀请其他校友进入校友录',
                        button: [{
                            type: 'primary',
                            text: '进入校友录',
                            href: Const.router.index({ alumni_id }),
                        }, {
                            text: '邀请页',
                            href: Const.router.share({ alumni_id }),
                        }],
                    },
                });

                break;

            //用户申请加入校友录
            default:
                
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
            user: $user.getState(),
        };
    }

    renderForms() {
        const { form } = this.props;
        const { auth_fields, user } = this.data;

        return Utils.generateFieldsConfig(auth_fields).map((item, index) => {
            const items = [];

            item.forEach((i, idx) => {
                //假如authFileds里不是必填或者选填，不生成
                const isNeed = auth_fields[i[0]];

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

            return items.length !== 0 && (
                <AppForm 
                    key={Const.fileds_group[index]}
                    form={form}
                    renderHeader={() => <div>{Const.fileds_group[index]}</div>}
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
            <Spin 
                className={prefixCls}
                spinning={Utils.isSpinning(this.data)}
            >
                <Title>校友录管理员要求，必须真实填写以下信息才可以加入校友录，以便校友之间联系和交换名片。</Title>

                {this.renderForms()}

                {this.renderBtn()}
            </Spin>
        );
    } 
};