/**
 * 缓存相关
 * @version 170213 1.0
 */
'use strict';

export default {
    /**
     * localStorage set
     * @version 170213 1.0
     * @param {String} key
     * @param {Mix}    data
     */
    lsSet(key, data) {
        if (typeof localStorage == 'undefined') return false;

        try {
            const value = typeof data == 'string' ? data : JSON.stringify(data);

            localStorage.setItem(key, value);

        } catch (err) {
            console.log('localStorage set fail: ', key);
        }
    },

    /**
     * localStorage get
     * @version 170213 1.0
     * @param {String} key
     */
    lsGet(key) {
        let data;

        if (typeof localStorage == 'undefined') return {};

        try {
            data = JSON.parse(localStorage.getItem(key)) || {};

        } catch(err) {
            console.log('localStorage get fail: ', key);
        }

        return data;
    },
};