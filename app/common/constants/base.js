/**
 * 项目基本常量
 * @version 170206 1.0
 */
'use strict';

import moment from 'moment';
import { checkDeviceType } from '../utils';

export default {
    date       : 'y/m/d H:i',
    deviceType : checkDeviceType(),
    img        : require('../images/default.png'),
    now        : moment().locale('zh-cn').utcOffset(8),
    web        : 'http://alumni.maigit.com',
};