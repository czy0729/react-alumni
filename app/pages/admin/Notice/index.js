/**
 * 发布/修改通知
 * @version 170213 1.0
 */
'use strict';

import React from 'react';
import { form, observer } from 'decorators';
import { $notice, $popout } from 'stores';

import { Button } from 'antd-mobile';
import { Page, Content, ButtonWrap, AppForm } from 'components';
import './index.less';

const prefixCls = 'pages-admin__notice';

@form
@observer
export default class AdminNotice extends React.Component {
    constructor() {
        super();

        Utils.binds(this, ['showView', 'doAdd', 'doUpdate']);
    }

    componentDidMount() {
        if (this.notice_id) $notice.fetch_detail({ notice_id: this.notice_id });
    }

    componentWillUnmount() {
        $popout.hide();
    }

    showView() {
        const { form } = this.props;

        $popout.showMask(
            <Content className={`${prefixCls}__view`} value={form.getFieldValue('content')} />,
            { className: prefixCls }
        );
    }

    async doAdd(values) {
        await $notice.add({
            alumni_id: this.alumni_id,
            ...values,
        });

        Utils.onSuccess();
    }

    async doUpdate(values) {
        await $notice.update({
            notice_id: this.notice_id,
            ...values,
        });

        Utils.onSuccess();
    }

    get alumni_id() {
        return this.props.params.alumni_id;
    }

    get notice_id() {
        return this.props.routeParams.notice_id;
    }

    render() {
        const { form, onSubmit } = this.props;
        const data = this.notice_id ? $notice.getById(this.notice_id, 'detail') : {};

        return (
            <Page className={prefixCls}>
                {/*表单*/}
                <AppForm
                    form={form}
                    onSubmit={e => onSubmit(e, form, this.notice_id ? this.doUpdate : this.doAdd)}
                >
                    <AppForm.Input
                        name="title"
                        placeholder="请输入标题"
                        initialValue={data.title}
                        option={Const.required}
                    />
                    <AppForm.Textarea
                        name="content"
                        placeholder="请输入正文"
                        initialValue={data.content}
                        option={Const.required}
                        rows={10}
                        count={500}
                        emoji
                    />
                </AppForm>

                {/*按钮*/}
                <ButtonWrap>
                    <Button 
                        type="primary"
                        form="form"
                        htmlType="submit"
                    >
                        {this.notice_id ? '修改通知' : '确认发布'}
                    </Button>
                    <Button onClick={this.showView}>
                        预览
                    </Button>
                </ButtonWrap>
            </Page>
        );
    } 
};