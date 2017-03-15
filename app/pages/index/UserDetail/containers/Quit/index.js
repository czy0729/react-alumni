'use strict';

import React from 'react';
import { ButtonWrap } from 'components';

const Quit = (props) => {
    const { doQuit } = props;

    return (
        <ButtonWrap>
            <br />
            <p 
                className="text-center text-danger"
                onClick={() => Utils.onConfirm('确定退出？', doQuit)}
            >
                退出校友录
            </p>
        </ButtonWrap>
    );
};

export default Quit;