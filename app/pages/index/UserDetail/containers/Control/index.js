'use strict';

import React from 'react';
import { List, Picker, Switch } from 'antd-mobile';
const Item = List.Item;

const Control = (props) => {
    const { 
        alumni_id,
        detail, identity, 
        doSetIdentity, doSetAdmin, doSetBlack,
    } = props;

    //用户各种状态
    const is_manager = detail.is_manager == Const.is_manager.yes;
    const is_creater = detail.is_creater == Const.is_creater.yes;
    const is_black   = detail.status == Const.user_detail_status.yes;
    const is_self    = detail.type == Const.user_detail_type.self;

    //身份DS
    const identityDS = identity.map((item) => ({ 
        label: item.name,
        value: item.identity_type_id,
    }));
    identityDS.unshift({
        label: '无',
        value: '',
    });
    const isIdentityEmpty = identityDS.length === 0;

    return (
        <List renderHeader={() => <div>操作</div>}>
            <Picker 
                data={identityDS}
                cols={1}
                value={
                    detail.identity.length === 0 
                      ? [''] 
                      : [detail.identity[0].identity_type_id]
                }
                disabled={isIdentityEmpty}
                onChange={doSetIdentity}
            >
                <Item 
                    arrow="horizontal"
                    onClick={
                        isIdentityEmpty && (() => Utils.onConfirm(
                            '当前校友录暂无添加任何身份，是否前往添加？', 
                            () => Utils.router.push(Const.router.admin_identity({
                                alumni_id: this.alumni_id,
                            }))
                        ))
                    }
                >
                    身份
                </Item>
            </Picker>

            <Item extra={
                /*因为Switch的`disabled`阻止了冒泡，只能套一层来实现不允许操作时点击弹出提示的功能*/
                <div 
                    onClick={is_creater && (() => Utils.onAlert('创建者不能取消管理员'))}
                    style={{ opacity: is_creater ? .4 : 1 }}
                >
                    <Switch 
                        checked={is_manager}
                        onChange={!is_creater && doSetAdmin }
                    />
                </div>
            }>
                设为管理员
            </Item>

            <Item extra={
                <div 
                    onClick={is_self && (() => Utils.onAlert('不能把自己加入黑名单'))}
                    style={{ opacity: is_self ? .4 : 1 }}
                >
                    <Switch 
                        checked={is_black}
                        onChange={!is_self && doSetBlack}
                    />
                </div>
            }>
                加入黑名单
            </Item>
        </List>
    );
};

export default Control;