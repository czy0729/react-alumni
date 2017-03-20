/**
 * 个人中心 
 * @Date: 2017-03-12 21:18:53
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-21 07:16:47
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $user } from 'stores';
import { List, Icon, Button } from 'antd-mobile';
import { Spin, AvatarBlock } from 'components';
import './index.less';

const prefixCls = 'pages-user__index';

@observer
export default class UserIndex extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        $user.fetch();
    }

    get data() {
        return {
            user: $user.getState(),
        };
    }

    render() {
        const { user } = this.data;

        return (
            <Spin 
                className={prefixCls}
                spinning={Utils.isSpinning(this.data)}
            >
                <AvatarBlock src={user.headimgurl}>
                    <span>{user.nickname}</span>
                    <span className="ml-sm text-caption-sm text-default">({user.wx_sn})</span>
                </AvatarBlock>

                <List className={`${prefixCls}__menu`}>
                    <List.Item
                        thumb={<Icon type={require('common/svg/navigate.svg')} />}
                        arrow="horizontal"
                        onClick={() => Utils.router.push(
                            Const.router.user_info()
                        )}
                    >
                        我的名片
                    </List.Item>
                    <List.Item
                        thumb={<Icon type={require('common/svg/bars.svg')} />}
                        arrow="horizontal"
                        onClick={() => Utils.router.push(
                            Const.router.user_alumni()
                        )}
                    >
                        我的校友录
                    </List.Item>
                    <List.Item
                        thumb={<Icon type={require('common/svg/trip.svg')} />}
                        arrow="horizontal"
                        onClick={() => Utils.router.push(
                            Const.router.user_cards()
                        )}
                    >
                        名片库
                    </List.Item>
                    <List.Item
                        thumb={<Icon type={require('common/svg/me-fill.svg')} />}
                        arrow="horizontal"
                        onClick={() => Utils.router.push(
                            Const.router.user_blacklist()
                        )}
                    >
                        黑名单
                    </List.Item>
                </List>
            </Spin>
        );
    } 
};