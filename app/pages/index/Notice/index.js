/**
 * 通知正文
 * @version 170215 1.0
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $notice, $alumni } from 'stores';

import { Icon } from 'antd-mobile';
import { Page, Content, Permission, AppPopover } from 'components';
import './index.less';

const prefixCls = 'pages-index__notice';
const Item = AppPopover.Item;

@observer
export default class Notice extends React.Component {
    static contextTypes = {
        router: React.PropTypes.any,
    };

    constructor() {
        super();

        Utils.binds(this, ['handleSelect', 'doDelete']);
    }

    componentDidMount() {
        $notice.fetch_detail({ notice_id: this.notice_id });
    }

    handleSelect(node, key) {
        const { router } = this.context;

        switch (key) {
            case 0:
                router.push(`/${this.alumni_id}/admin/notice/${this.notice_id}`);
                break;

            case 1:
                Utils.onConfirm('确定删除通知？', this.doDelete);
                break;
        }
    }

    async doDelete() {
        await $notice.delete({ notice_id: this.notice_id });

        Utils.onSuccess();
    }

    get alumni_id() {
        return this.props.params.alumni_id;
    }

    get notice_id() {
        return this.props.routeParams.notice_id;
    }

    render() {
        const data = $notice.getById(this.notice_id, 'detail');
        const data_alumni = $alumni.getById(this.alumni_id);

        return (
            <Page className={prefixCls}>
                <div className={`${prefixCls}__head`}>
                    {/*右上角按钮*/}
                    {/*①我是管理员*/}
                    <Permission 
                        rules={[{
                            condition : [Const.user_type.super, Const.user_type.admin],
                            value     : data_alumni.user_type,
                        }]}
                    >
                        <AppPopover
                            overlay={[
                                <Item iconName="edit">修改通知</Item>,
                                <Item iconName="delete">删除通知</Item>,
                            ]}
                            onSelect={this.handleSelect}
                        >
                            <Icon className={`${prefixCls}__btn-admin`} type="ellipsis" />
                        </AppPopover>
                    </Permission>

                    {/*正文详情*/}
                    <p className={`${prefixCls}__head_name`}>{data.title}</p>
                    <p className={`${prefixCls}__head_desc`}>
                        <Icon type="calendar" />
                        <span className="ml-sm">{Utils.date(data.ctime)}</span>
                        <Icon className="ml-xl" type="user" />
                        <span className="ml-sm">{data.nickname}</span>
                    </p>
                </div>

                {/*正文*/}
                <Content className={`${prefixCls}__content`} value={data.content} />
            </Page>
        );
    } 
};