'use strict';

import React from 'react';
import { AvatarBlock } from 'components';
import Btn from './btn';

const Head = (props) => {
    const { detail, doExchangeCard, doAllowExchangeCard } = props;

    return (
        <AvatarBlock 
            src={detail.headimgurl}
            extra={
                <Btn 
                    type={detail.type}
                    doExchangeCard={doExchangeCard}
                    doAllowExchangeCard={doAllowExchangeCard}
                />
            }
        >
            <span>{detail.nickname}</span>
            <span className="ml-sm text-caption-sm text-default">{detail.back_name && `(${detail.wx_sn})`}</span>
        </AvatarBlock>
    );
};

export default Head;