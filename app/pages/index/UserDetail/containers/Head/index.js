'use strict';

import React from 'react';
import { AvatarBlock } from 'components';
import Btn from './btn';

const Head = (props) => {
    const { user_detail, doExchangeCard, doAllowExchangeCard } = props;

    return (
        <AvatarBlock 
            src={user_detail.headimgurl}
            extra={
                <Btn 
                    type={user_detail.type}
                    doExchangeCard={doExchangeCard}
                    doAllowExchangeCard={doAllowExchangeCard}
                />
            }
        >
            <span>{user_detail.nickname}</span>
            <span className="ml-sm text-caption-sm text-default">{user_detail.back_name && `(${user_detail.wx_sn})`}</span>
        </AvatarBlock>
    );
};

export default Head;