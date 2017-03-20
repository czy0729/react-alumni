/**
 * 校友录基本信息
 * @Date: 2017-01-27 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-21 05:43:30
 */
'use strict';

import React from 'react';
import { form, observer } from 'decorators';
import { $alumni } from 'stores';
import { Button } from 'antd-mobile';
import { Spin, ButtonWrap, AppForm } from 'components';

const prefixCls = 'pages-admin__info';

@form
@observer
export default class AdminInfo extends React.Component {
    constructor() {
        super();

        Utils.binds(this, ['init', 'doUpdate']);
    }

    componentDidMount() {
        this.init();
    }

    init() {
        $alumni.fetch({ alumni_id: this.alumni_id });
    }

    async doUpdate(values) {
        await $alumni.update({
            alumni_id: this.alumni_id,
            ...values,
        });

        Utils.onSuccess();
        this.init();
    }

    get alumni_id() {
        return this.props.params.alumni_id;
    }

    get data() {
        return {
            alumni: $alumni.getStateById(this.alumni_id),
        };
    }

    render() {
        const { form, onSubmit } = this.props;
        const { alumni } = this.data;

        return (
            <Spin 
                className={prefixCls}
                spinning={Utils.isSpinning(this.data)}
            >
                <AppForm form={form}>
                    <AppForm.Upload
                        name="logo"
                        title="图标"
                        initialValue={alumni.logo}
                    />
                    <AppForm.Input
                        name="name"
                        title="名称"
                        initialValue={alumni.name}
                        option={Const.rules.required}
                    />
                    <AppForm.Input
                        name="school_name"
                        title="学校"
                        initialValue={alumni.school_name}
                        option={Const.rules.required}
                    />
                    <AppForm.Textarea
                        name="description"
                        title="描述"
                        initialValue={alumni.description}
                        emoji
                    />
                </AppForm>

                <ButtonWrap>
                    <Button type="primary" onClick={(e) => onSubmit(e, form, this.doUpdate)}>保存</Button>
                </ButtonWrap>
            </Spin>
        );
    } 
};