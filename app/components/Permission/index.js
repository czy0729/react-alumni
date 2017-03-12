/**
 * Permission
 * @version 170217 0.1
 * @version 170224 1.0
 */
'use strict';

import React from 'react';

const prefixCls = 'components__permission';

/*
rules={[{
    condition : [Const.user_type.super],
    type      : 'oneOf',
    value     : self.user_type,
}, {
    condition : [Const.user_detail_type.self],
    type      : 'not',
    value     : user.type,
}]}*/
const Permission = (props) => {
    const { rules, replace = null, children } = props;

    let check = true;
    rules.forEach((item) => {
        const { condition = [], type = 'oneOf', value } = item;

        let oneOf = false; 
        let not = true;
        condition.forEach((i) => {
            //oneOf 其中一个是
            if (type === 'oneOf') {
                not = true; //因为不是oneOf检验，要把not设为true跳过检验

                if (i == value) {
                    oneOf = true;
                    return false;
                }

            //not 全不是
            } else if (type === 'not') {
                oneOf = true; //因为不是not检验，要把oneOf设为true跳过检验

                if (i == value) {
                    not = false;
                    return false;
                }
            }
        });

        check = oneOf && not;

        if (!check) return false;
    });

    return check ? children : replace;
};

/*
const Permission = (props) => {
    const { condition, type = 'oneOf', value, replace = null, children } = props;

    let check = false;

    switch (type) {
        case 'oneOf':
            for (let key in condition) {
                condition[key].forEach((item) => {
                    if (Const[key][item] == value) {
                        check = true;
                        return false;
                    }
                });
            }
        break;

        default: break;
    }

    return check ? children : replace;
};
*/

export default Permission;