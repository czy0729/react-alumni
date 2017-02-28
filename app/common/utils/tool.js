/**
 * 公用工具方法
 * @version 170131 1.0
 */
'use strict';

import Const from '../constants';

export default {
	/**
     * 复数方法bind(this)
     * @version 160602 1.0
     * @param  {Obj}  target 绑定目标，通常是this
     * @param  {Arr}  arrKeys 键值数组，例['handleClick', 'handleChange']
     * @return {Void}
     */
    binds(target, arrKeys) {
        arrKeys.forEach(item => {
            target[item] = target[item].bind(target);
        });
    },

    /**
     * json拼凑成url字符串
     * @version 170206 1.0
     * @param  {Obj} obj
     * @param  {String}
     * @return {String}
     */
    getQueryStr(obj) {
        let query = '';

        for (let key in obj) {
            query += `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}&`;
        }

        if (query) query = query.substring(0, query.length - 1);

        return query;
    },

    /**
     * 字符串特定位置插入字符串
     * @version 170215 1.0
     * @param  {String} str 原字符串
     * @param  {String} flg 插入的字符串
     * @param  {Int}    sn  index
     * @return {String}
     */
    strInsert(str, flg, sn) {
        const left = str.substring(0, sn);
        const right = str.substring(sn);

        return `${left}${flg}${right}`;
    },

    /**
     * 检查机型
     * @version 170217 1.0
     * @return {String}
     */
    checkDeviceType() {
        const agent   = navigator.userAgent,
            isAndroid = /(Android)/i.test(agent),
            isiOS     = /(iPhone|iPad|iPod|iOS)/i.test(agent) && !isAndroid;

        if (isiOS) return 'ios';
        if (isAndroid) return 'android';
        return 'other';
    },

    /**
     * 时间戳距离现在时间的描述
     * @version 170217 1.0
     * @param  {String} timestamp 时间戳
     * @return {String}
     */
    lastDate(timestamp) {
        const d = new Date(timestamp * 1000);
        const date = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}/${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        const dateTime = new Date(date)
        const currentTime = new Date();
        let totalTime = currentTime.getTime() - dateTime.getTime();

        let _, years, months, weeks, days, hours, minutes;
        const getNumber = () => parseInt(totalTime / parseInt(_));
        const modTimestamp = () => totalTime % parseInt(_);

        _ = 1000 * 60 * 60 * 24 * 365;
        years = getNumber();
        totalTime = modTimestamp();

        _ = 1000 * 60 * 60 * 24 * 30;
        months = getNumber();
        totalTime = modTimestamp();

        if (years > 0) return `${years}年${months}月前`;

        _ = 1000 * 60 * 60 * 24 * 7;
        weeks = getNumber();
        totalTime = modTimestamp();

        if (months > 0) return `${months}月${weeks}周前`;

        _ = 1000 * 60 * 60 * 24;
        days = getNumber();
        totalTime = modTimestamp();

        if (weeks > 0) return `${weeks}周${days}天前`;

        _ = 1000 * 60 * 60;
        hours = getNumber();
        totalTime = modTimestamp();

        if (days > 0) return `${days}天${hours}时前`;

        _ = 1000 * 60;
        minutes = getNumber();
        totalTime = modTimestamp();

        if (hours > 0) return `${hours}时${minutes}分前`;

        return `${minutes}分前`;
    },

    /**
     * 和PHP一样的时间戳格式化函数
     * @version 160421 1.0
     * @version 170104 1.1 变得可以省略format
     * @param  {String} format    格式化格式
     * @param  {Int}    timestamp 时间戳
     * @return {String}
     */
    date(format, timestamp) {
        //假如第二个参数不存在，第一个参数作为timestamp
        if (!timestamp) {
            timestamp = format;
            format = Const.date || 'Y-m-d H:i:s';
        }

        var a, jsdate = ((timestamp) ? new Date(timestamp * 1000) : new Date());
        var pad = function(n, c) {
            if ((n = n + '').length < c) {
                return new Array(++c - n.length).join('0') + n;
            } else {
                return n;
            }
        };
        var txt_weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var txt_ordin = {
            1: 'st',
            2: 'nd',
            3: 'rd',
            21: 'st',
            22: 'nd',
            23: 'rd',
            31: 'st'
        };
        var txt_months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var f = {
            // Day
            d: function() {
                return pad(f.j(), 2);
            },
            D: function() {
                t = f.l();
                return t.substr(0, 3);
            },
            j: function() {
                return jsdate.getDate();
            },
            l: function() {
                return txt_weekdays[f.w()];
            },
            N: function() {
                return f.w() + 1;
            },
            S: function() {
                return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th';
            },
            w: function() {
                return jsdate.getDay();
            },
            z: function() {
                return (jsdate - new Date(jsdate.getFullYear() + '/1/1')) / 864e5 >> 0;
            },
            // Week
            W: function() {
                var a = f.z(),
                    b = 364 + f.L() - a;
                var nd2, nd = (new Date(jsdate.getFullYear() + '/1/1').getDay() || 7) - 1;
                if (b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
                    return 1;
                } else {
                    if (a <= 2 && nd >= 4 && a >= (6 - nd)) {
                        nd2 = new Date(jsdate.getFullYear() - 1 + '/12/31');
                        return date('W', Math.round(nd2.getTime() / 1000));
                    } else {
                        return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
                    }
                }
            },
            // Month
            F: function() {
                return txt_months[f.n()];
            },
            m: function() {
                return pad(f.n(), 2);
            },
            M: function() {
                t = f.F();
                return t.substr(0, 3);
            },
            n: function() {
                return jsdate.getMonth() + 1;
            },
            t: function() {
                var n;
                if ((n = jsdate.getMonth() + 1) == 2) {
                    return 28 + f.L();
                } else {
                    if (n & 1 && n < 8 || !(n & 1) && n > 7) {
                        return 31;
                    } else {
                        return 30;
                    }
                }
            },
            // Year
            L: function() {
                var y = f.Y();
                return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0;
            },
            //o not supported yet
            Y: function() {
                return jsdate.getFullYear();
            },
            y: function() {
                return (jsdate.getFullYear() + '').slice(2);
            },
            // Time
            a: function() {
                return jsdate.getHours() > 11 ? 'pm' : 'am';
            },
            A: function() {
                return f.a().toUpperCase();
            },
            B: function() {
                // peter paul koch:
                var off = (jsdate.getTimezoneOffset() + 60) * 60;
                var theSeconds = (jsdate.getHours() * 3600) +
                    (jsdate.getMinutes() * 60) +
                    jsdate.getSeconds() + off;
                var beat = Math.floor(theSeconds / 86.4);
                if (beat > 1000) beat -= 1000;
                if (beat < 0) beat += 1000;
                if ((String(beat)).length == 1) beat = '00' + beat;
                if ((String(beat)).length == 2) beat = '0' + beat;
                return beat;
            },
            g: function() {
                return jsdate.getHours() % 12 || 12;
            },
            G: function() {
                return jsdate.getHours();
            },
            h: function() {
                return pad(f.g(), 2);
            },
            H: function() {
                return pad(jsdate.getHours(), 2);
            },
            i: function() {
                return pad(jsdate.getMinutes(), 2);
            },
            s: function() {
                return pad(jsdate.getSeconds(), 2);
            },
            //u not supported yet
            // Timezone
            //e not supported yet
            //I not supported yet
            O: function() {
                var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4);
                if (jsdate.getTimezoneOffset() > 0) t = '-' + t;
                else t = '+' + t;
                return t;
            },
            P: function() {
                var O = f.O();
                return (O.substr(0, 3) + ':' + O.substr(3, 2));
            },
            //T not supported yet
            //Z not supported yet
            // Full Date/Time
            c: function() {
                return f.Y() + '-' + f.m() + '-' + f.d() + 'T' + f.h() + ':' + f.i() + ':' + f.s() + f.P();
            },
            //r not supported yet
            U: function() {
                return Math.round(jsdate.getTime() / 1000);
            }
        };

        return format.replace(/[\\]?([a-zA-Z])/g, function(t, s) {
            var ret = '';

            if (t != s) {
                // escaped
                ret = s;
            } else if (f[s]) {
                // a date function exists
                ret = f[s]();
            } else {
                // nothing special
                ret = s;
            }
            return ret;
        });
    }
};