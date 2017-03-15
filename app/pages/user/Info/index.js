/**
 * 我的名片
 * @version 170313 1.0
 */
'use strict';

import React from 'react';
import { form, observer } from 'decorators';
import { $user } from 'stores';
import { Title, ButtonWrap, AppButton, AppForm } from 'components';

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

    renderForms() {
        const { form } = this.props;
        const data = $user.getState();

        delete data.list;
        delete data.detial;

        return Utils.generateFieldsConfig(data).map((item, index) => {
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
                        initialValue={data[name]}
                        option={Const.rules.genRules(rules, name == 'real_name' || name == 'mobile')}
                        {...config}
                    />
                );
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

        return (
            <ButtonWrap>
                <AppButton 
                    type="primary" 
                    onClick={(e) => onSubmit(e, form, this.handleSubmit)}
                >
                    保存
                </AppButton>
            </ButtonWrap>
        );
    }

    render() {
        return (
            <div className={prefixCls}>
                {this.renderForms()}
                {this.renderBtn()}
            </div>
        );
    } 
};