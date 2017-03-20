/**
 * 我的名片
 * @Date: 2017-03-13 02:56:24
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-19 19:17:41
 */
'use strict';

import React from 'react';
import { form, observer } from 'decorators';
import { $user } from 'stores';
import { Button } from 'antd-mobile';
import { Spin, Title, ButtonWrap, AppButton, AppForm } from 'components';

const prefixCls = 'pages-user__info';

@form
@observer
export default class UserInfo extends React.Component {
    constructor() {
        super();

        Utils.binds(this, ['handleSubmit']);
    }

    componentDidMount() {
        $user.fetch();
    }

    async handleSubmit(value) {
        await $user.update_info(value);

        Utils.onSuccess();
    }

    get data() {
        return {
            user: $user.getState(),
        };
    }

    renderForms() {
        const { form } = this.props;
        const { user } = this.data;

        delete user.list;
        delete user.detial;

        return Utils.generateFieldsConfig(user).map((item, index) => {
            const items = [];

            item.forEach((i, idx) => {
                const { config, rules, component = 'Input' } = i[5];
                const title = i[2];
                const name = i[0];
                const El = AppForm[component];
                
                items.push(
                    <El
                        key={name}
                        title={title}
                        name={name}
                        initialValue={user[name]}
                        option={Const.rules.genRules(rules, name == 'real_name' || name == 'mobile')}
                        {...config}
                    />
                );
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

        return (
            <ButtonWrap>
                <Button 
                    type="primary" 
                    onClick={(e) => onSubmit(e, form, this.handleSubmit)}
                >
                    保存
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
                {this.renderForms()}

                {this.renderBtn()}
            </Spin>
        );
    } 
};