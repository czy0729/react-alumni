/**
 * 创建校友录
 * @Date: 2017-03-05 04:37:20
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-21 08:56:57
 */
'use strict';

import React from 'react';
import { form } from 'decorators';
import { $alumni } from 'stores';
import { Button } from 'antd-mobile';
import { ButtonWrap, AppForm } from 'components';

const prefixCls = 'pages-index__add-alumni';

@form
export default class IndexAddAlumni extends React.Component {
    constructor() {
        super();

        Utils.binds(this, ['doAdd']);
    }

    async doAdd(values) {
        const { alumni_id } = await $alumni.add(values);

        Utils.router.push({
            pathname: Const.router.admin_auth_fields({ alumni_id }),
            query: {
                from: 'add_alumni',
            },
        });
    }

    render() {
        const { form, onSubmit } = this.props;

        return (
            <div className={prefixCls}>
                <div className="tool-block" style={{ height: '30vw' }}>
                    <h1 className="text-primary">新建校友录</h1>
                </div>

                <AppForm form={form}>
                    <AppForm.Input
                        name="name"
                        placeholder="校友录名称"
                        option={Const.rules.required}
                    />
                    <AppForm.Input
                        name="school_name"
                        placeholder="学校名称"
                        option={Const.rules.required}
                    />
                    <AppForm.Textarea
                        name="description"
                        placeholder="校友录描述，例如学校校训（选填）"
                        initialValue=""
                        emoji
                    />
                </AppForm>

                <ButtonWrap>
                    <Button 
                        type="primary"
                        onClick={(e) => onSubmit(e, form, this.doAdd)}
                    >
                        下一步 (1/4)
                    </Button>
                </ButtonWrap>
            </div>
        );
    } 
};