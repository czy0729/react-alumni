/**
 * 个人中心
 * @version 170312 1.0
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $user } from 'stores';
import { List, Icon, Button } from 'antd-mobile';
import { AvatarBlock } from 'components';
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

    render() {
        const data = $user.getState();

        return (
            <div className={prefixCls}>
                <AvatarBlock src={data.headimgurl}>
                    <span>{data.nickname}</span>
                    <span className="ml-sm text-caption-sm text-default">({data.wx_sn})</span>
                </AvatarBlock>

                <List className={`${prefixCls}__menu`}>
                    <List.Item
                        thumb={<Icon type="solution" />}
                        arrow="horizontal"
                        onClick={() => Utils.router.push(Const.router.user_info())}
                    >
                        我的名片
                    </List.Item>
                    <List.Item
                        thumb={<Icon type="bars" />}
                        arrow="horizontal"
                        onClick={() => Utils.router.push(Const.router.user_alumni())}
                    >
                        我的校友录
                    </List.Item>
                    <List.Item
                        thumb={<Icon type="credit-card" />}
                        arrow="horizontal"
                        onClick={() => Utils.router.push(Const.router.user_cards())}
                    >
                        名片库
                    </List.Item>
                    <List.Item
                        thumb={<Icon type="cross-circle-o" />}
                        arrow="horizontal"
                        onClick={() => Utils.router.push(Const.router.user_blacklist())}
                    >
                        黑名单
                    </List.Item>
                </List>
            </div>
        );
    } 
};