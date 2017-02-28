/**
 * 校友录基本信息
 * @version 170127 1.0
 */
'use strict';

import React from 'react';
import { form, observer } from 'decorators';
import { $alumni } from 'stores';
import { Button } from 'antd-mobile';
import { Page, ButtonWrap, AppForm } from 'components';

const prefixCls = 'pages-admin__info';

@form
@observer
export default class AdminInfo extends React.Component {
    constructor() {
        super();

        Utils.binds(this, ['doUpdate']);
    }

    componentDidMount() {
    	$alumni.fetch({ alumni_id: this.alumni_id });
    }

    async doUpdate(values) {
    	await $alumni.update({
    		alumni_id: this.alumni_id,
    		...values,
    	});

    	Utils.onSuccess();
    }

    get alumni_id() {
        return this.props.params.alumni_id;
    }

    render() {
        const { form, onSubmit } = this.props;
        const data = $alumni.getById(this.alumni_id);

        return (
            <Page className={prefixCls}>
                <AppForm 
                	form={form}
                	onSubmit={e => onSubmit(e, form, this.doUpdate)}
                >
                	<AppForm.Upload
                		name="logo"
                		title="图标"
                		initialValue={data.logo}
                        option={Const.required}
                	/>
                    <AppForm.Input
                        name="name"
                        title="名称"
                        initialValue={data.name}
                        option={Const.required}
                    />
                    <AppForm.Input
                        name="school_name"
                        title="学校"
                        initialValue={data.school_name}
                        option={Const.required}
                    />
                    <AppForm.Textarea
                        name="description"
                        title="描述"
                       	initialValue={data.description}
                        emoji
                    />
                </AppForm>

                <ButtonWrap>
                	<Button 
                		type="primary"
                		form="form"
                		htmlType="submit"
                	>
                		保存
                	</Button>
                </ButtonWrap>
            </Page>
        );
    } 
};