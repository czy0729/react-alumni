'use strict';

import React from 'react';
import { ButtonWrap } from 'components';

const Delete = (props) => {
    const { doDelete } = props;

    return (
        <ButtonWrap>
            <br />
            <p 
                className="text-center text-danger"
                onClick={() => Utils.onConfirm('确定删除？', doDelete)}
            >
                删除该成员
            </p>
        </ButtonWrap>
    );
};

export default Delete;