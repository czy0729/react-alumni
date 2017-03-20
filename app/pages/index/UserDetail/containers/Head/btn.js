'use strict';

import React from 'react';
import { Button } from 'antd-mobile';

const Btn = (props) => {
    const { type, doExchangeCard, doAllowExchangeCard } = props;
    
    let config;
    switch (parseInt(type)) {
        //自己
        case Const.user_detail_type.self:
            config = {
                onClick: () => Utils.router.push(Const.router.user_info()),
                children: '个人中心',
            };
            break;
        
        //可交换名片
        case Const.user_detail_type.can_change:
            config = {
                type: 'primary',
                onClick: () => Utils.onConfirm('确定向对方发出交换名片的请求？', doExchangeCard),
                children: '交换名片',
            };
            break;

        //可同意交换
        case Const.user_detail_type.can_resolve:
            config = {
                type: 'primary',
                onClick: () => Utils.onConfirm('确定同意交换名片？', doAllowExchangeCard.bind(this, 'resolve')),
                children: '同意交换',
            };
            break;

        //待同意交换
        case Const.user_detail_type.wait_change:
            config = {
                children: '等待对方处理',
            };
            break;

        //可取消交换
        case Const.user_detail_type.can_cancel:
            config = {
                onClick: () => Utils.onConfirm('确定取消交换名片？', doAllowExchangeCard.bind(this, 'cancel')),
                children: '收回名片',
            };
            break;

        default:
            return null;
    }

    return (
        <Button 
            size="small" 
            style={{ width: '2.2rem' }}
            {...config}
        />
    );
};

export default Btn;