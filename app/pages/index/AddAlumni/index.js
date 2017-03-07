/**
 * 创建校友录
 * @version 170305 1.0
 */
'use strict';

import React from 'react';
import { form } from 'decorators';
import { $alumni } from 'stores';
import { Button } from 'antd-mobile';
import { ButtonWrap, AppForm } from 'components';

const prefixCls = 'pages-index__add-alumni';

@form
export default class AddAlumni extends React.Component {
    constructor() {
        super();

        Utils.binds(this, ['doAdd']);
    }

    componentDidMount() {
        Utils.router.push({
            pathname: Const.router.admin_auth_fields({ alumni_id: 137 }),
            query: {
                from: 'add_alumni',
            },
        });
    }

    async doAdd(values) {
        const { alumni_id } = await $alumni.add(values);

        Utils.router.push({
            pathname: Const.router.admin_auth_fields({ alumni_id }),
            query: { modal: true },
            state: { fromDashboard: true }
        });
    }

    render() {
        const { form, onSubmit } = this.props;

        return (
            <div className={prefixCls}>
                {/*标题*/}
                <div className="tool-block" style={{ height: '30vw' }}>
                    <h1 className="text-primary">新建校友录</h1>
                </div>

                <AppForm 
                    form={form}
                    onSubmit={e => onSubmit(e, form, this.doAdd)}
                >
                    <AppForm.Input
                        name="name"
                        placeholder="校友录名称"
                        option={Const.required}
                    />
                    <AppForm.Input
                        name="school_name"
                        placeholder="学校名称"
                        option={Const.required}
                    />
                    <AppForm.Textarea
                        name="description"
                        placeholder="校友录描述，例如学校校训（选填）"
                        emoji
                    />
                </AppForm>

                <ButtonWrap>
                    <Button 
                        type="primary"
                        form="form"
                        htmlType="submit"
                    >
                        下一步(1/4)
                    </Button>
                </ButtonWrap>
            </div>
        );
    } 
};