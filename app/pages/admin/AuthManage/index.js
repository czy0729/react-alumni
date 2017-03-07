/**
 * 认证管理
 * @version 170219 1.0
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
    static contextTypes = {
        router: React.PropTypes.any,
    };

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
        const { router } = this.context;
        const data = $auth.getById(this.alumni_id, 'count');

        return (
            <div className={prefixCls}>
                <List className="mt-distance">
                    <Item extra={`${data.had_authenti_count}人`}>已认证</Item>
                    <Item 
                        extra={`${data.none_authenti_count}人`}
                        arrow="horizontal"
                        onClick={() => router.push(`/${this.alumni_id}/admin/auth_list/`)}
                    >
                        待认证
                    </Item>
                    <Item 
                        arrow="horizontal"
                        onClick={() => router.push(`/${this.alumni_id}/admin/auth_fields/`)}
                    >
                        认证需填写信息
                    </Item>
                    <Item 
                        arrow="horizontal"
                        onClick={() => router.push(`/${this.alumni_id}/admin/auth_show/`)}
                    >
                        认证后可见信息
                    </Item>
                </List>
            </div>
        );
    } 
};