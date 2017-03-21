/**
 * 发布/修改通知
 * @Date: 2017-02-13 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-22 06:31:45
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
        const { alumni_id } = this;

        const notice_id = await $notice.add({
            alumni_id,
            ...values,
            title: Utils.genHackImgString(values.title, values.thumbnail),
        });

        Utils.onSuccess();
        Utils.router.replace(
            Const.router.notice({
                alumni_id,
                notice_id,
            })
        );
    }

    async doUpdate(values) {
        const { notice_id } = this;

        await $notice.update({
            notice_id,
            ...values,
            title: Utils.genHackImgString(values.title, values.thumbnail),
        });

        Utils.onSuccess();
        Utils.router.replace(
            Const.router.notice({
                alumni_id: this.alumni_id,
                notice_id,
            })
        );
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
                spinning={notice_id ? Utils.isSpinning(this.data) : false}
            >
                <AppForm form={form}>
                    <AppForm.Upload
                        name="thumbnail"
                        title="题图"
                        initialValue={Utils.getHackImgData(detail.title)[1]}
                    />
                </AppForm>
                <AppForm form={form}>
                    <AppForm.Input
                        name="title"
                        placeholder="请输入标题"
                        initialValue={Utils.getHackImgData(detail.title)[0]}
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
                        onClick={(e) => onSubmit(e, form, notice_id ? this.doUpdate : this.doAdd)}
                    >
                        {notice_id ? '修改通知' : '确认发布'}
                    </Button>
                    <Button onClick={this.showView}>预览</Button>
                </ButtonWrap>
            </Spin>
        );
    } 
};