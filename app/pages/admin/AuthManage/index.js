/**
 * 认证管理
 * @Date: 2017-02-19 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-18 23:45:21
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $auth } from 'stores';
import { List } from 'antd-mobile';
import { Spin } from 'components';

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

    get data() {
        return {
            count: $auth.getStateById(this.alumni_id, 'count'),
        };
    }

    render() {
        const { alumni_id } = this;
        const { count } = this.data;

        return (
            <Spin 
                className={prefixCls}
                spinning={Utils.isSpinning(this.data)}
            >
                <List className="mt-distance">
                    <Item extra={`${count.had_authenti_count}人`}>已认证</Item>
                    <Item 
                        arrow="horizontal"
                        extra={`${count.none_authenti_count}人`}
                        onClick={() => Utils.router.push(
                            Const.router.admin_auth_list({ 
                                alumni_id,
                            })
                        )}
                    >
                        待认证
                    </Item>
                    <Item 
                        arrow="horizontal"
                        onClick={() => Utils.router.push(
                            Const.router.admin_auth_fields({ 
                                alumni_id,
                            })
                        )}
                    >
                        认证需填写信息
                    </Item>
                    <Item 
                        arrow="horizontal"
                        onClick={() => Utils.router.push(
                            Const.router.admin_auth_show({ 
                                alumni_id, 
                            })
                        )}
                    >
                        认证后可见信息
                    </Item>
                </List>
            </Spin>
        );
    } 
};