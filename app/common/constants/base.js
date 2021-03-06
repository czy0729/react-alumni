/**
 * 项目基本常量
 * @Date: 2017-02-06 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-31 09:10:42
 */
'use strict';

import moment from 'moment';
import { checkDeviceType } from '../utils';

export default {
    _offline   : true,

    date       : 'y/m/d H:i',
    deviceType : checkDeviceType(),
    img        : require('../images/default.png'),
    now        : moment().locale('zh-cn').utcOffset(8),
    web        : 'http://alumni.maigit.com',
};