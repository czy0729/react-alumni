/**
 * Utils
 * @version 170211 1.1
 * @version 170224 1.2 对router作了一个引用，方便调用
 */
'use strict';

import { hashHistory } from 'react-router'
/*import { useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });*/

export default {
    ...require('./cache'),
    ...require('./tool'),
    ...require('./ui'),
    ...require('./addOn'),
    router: hashHistory,
};