/**
 * 项目基本常量
 * @version 170206 1.0
 */
'use strict';

import moment from 'moment';

export default {
	web: 'http://alumni.maigit.com',
	date: 'y/m/d H:i',
	img: require('../images/default.png'),
	now: moment().locale('zh-cn').utcOffset(8),
};