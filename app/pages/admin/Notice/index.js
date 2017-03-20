/**
 * 发布/修改通知
 * @Date: 2017-02-13 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-19 06:54:50
 */
'use strict';

import React from 'react';
import { form, observer } from 'decorators';
import { $notice, $popout } from 'stores';
import { Button } from 'antd-mobile';
import { Spin, Content, ButtonWrap, AppForm } from 'components';
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
        const { notice_id } = this;

        if (notice_id) {
            $notice.fetch_detail({ 
                notice_id,
            });
        }
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

    get data() {
        const { notice_id } = this;

        return {
            detail: notice_id ? $notice.getStateById(notice_id, 'detail') : {},
        };
    }

    render() {
        const { form, onSubmit } = this.props;
        const { notice_id } = this;
        const { detail } = this.data;

        return (
            <Spin 
                className={prefixCls}
                spinning={notice_id && Utils.isSpinning(this.data)}
            >
                <AppForm
                    form={form}
                    onSubmit={e => onSubmit(e, form, notice_id ? this.doUpdate : this.doAdd)}
                >
                    <AppForm.Input
                        name="title"
                        placeholder="请输入标题"
                        initialValue={detail.title}
                        option={Const.rules.required}
                    />
                    <AppForm.Textarea
                        name="content"
                        placeholder="请输入正文"
                        initialValue={detail.content}
                        option={Const.rules.required}
                        rows={10}
                        count={500}
                        emoji
                    />
                </AppForm>

                <ButtonWrap>
                    <Button 
                        type="primary"
                        form="form"
                        htmlType="submit"
                    >
                        {notice_id ? '修改通知' : '确认发布'}
                    </Button>
                    <Button onClick={this.showView}>预览</Button>
                </ButtonWrap>
            </Spin>
        );
    } 
};