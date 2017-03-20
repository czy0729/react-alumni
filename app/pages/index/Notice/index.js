/**
 * 通知正文
 * @Date: 2017-02-15 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-19 07:38:07
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $notice, $alumni } from 'stores';
import { Icon } from 'antd-mobile';
import { Spin, Content, Permission, AppPopover } from 'components';
import './index.less';

const prefixCls = 'pages-index__notice';
const Item = AppPopover.Item;

@observer
export default class IndexNotice extends React.Component {
    constructor() {
        super();

        Utils.binds(this, ['handleSelect', 'doDelete']);
    }

    componentDidMount() {
        $notice.fetch_detail({ notice_id: this.notice_id });
    }

    handleSelect(node, key) {
        switch (key) {
            case 0:
                Utils.router.push(
                    Const.router.admin_notice({
                        alumni_id: this.alumni_id,
                        notice_id: this.notice_id,
                    })
                );
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

    get data() {
        return {
            alumni: $alumni.getStateById(this.alumni_id),
            detail: $notice.getStateById(this.notice_id, 'detail'),
        };
    }

    render() {
        const { alumni, detail } = this.data;

        return (
            <div className={prefixCls}>
                <div className={`${prefixCls}__head`}>
                    {/*右上角按钮*/}
                    {/*①我是管理员*/}
                    <Permission 
                        rules={[{
                            condition : [Const.user_type.super, Const.user_type.admin],
                            value     : alumni.user_type,
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
                    <p className={`${prefixCls}__head_name`}>{detail.title}</p>
                    <p className={`${prefixCls}__head_desc`}>
                        <Icon type="calendar" />
                        <span className="ml-sm">{Utils.date(detail.ctime)}</span>
                        <Icon className="ml-xl" type="user" />
                        <span className="ml-sm">{detail.nickname}</span>
                    </p>
                </div>

                {/*正文*/}
                <Content className={`${prefixCls}__content`} value={detail.content} />
            </div>
        );
    } 
};