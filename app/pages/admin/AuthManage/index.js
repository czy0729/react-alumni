/**
 * 认证管理
 * @version 170219 1.0
 * @version 170313 1.1 fixed bug
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $auth } from 'stores';
import { List } from 'antd-mobile';

const prefixCls = 'pages-admin__auth-manage';
const Item = List.Item;

@observer
export default class AdminAuthManage extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        $auth.fetch_count({ alumni_id: this.alumni_id });
    }

    get alumni_id() {
        return this.props.params.alumni_id;
    }

    render() {
        const { alumni_id } = this;
        const data = $auth.getById(alumni_id, 'count');

        return (
            <div className={prefixCls}>
                <List className="mt-distance">
                    <Item extra={`${data.had_authenti_count}人`}>已认证</Item>
                    <Item 
                        extra={`${data.none_authenti_count}人`}
                        arrow="horizontal"
                        onClick={() => Utils.router.push(Const.router.admin_auth_list({ alumni_id }))}
                    >
                        待认证
                    </Item>
                    <Item 
                        arrow="horizontal"
                        onClick={() => Utils.router.push(Const.router.admin_auth_fields({ alumni_id }))}
                    >
                        认证需填写信息
                    </Item>
                    <Item 
                        arrow="horizontal"
                        onClick={() => Utils.router.push(Const.router.admin_auth_show({ alumni_id }))}
                    >
                        认证后可见信息
                    </Item>
                </List>
            </div>
        );
    } 
};