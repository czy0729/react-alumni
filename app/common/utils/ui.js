/**
 * UI相关
 * @version 170211 1.0
 */
'use strict';

import React from 'react';
import { Toast, Modal } from 'antd-mobile';
import { emojify } from 'react-emoji';

const pageTransitionKeys = [];

export default {
    /**
     * 普通请求成功后应调用此方法
     * @version 170211 1.0
     */
    onSuccess(content = '操作成功', second = 2) {
        Toast.success(content, second);
    },

    /**
     * 确认
     * @version 170223 1.0
     */
    onAlert(content, nextFn = () => {}, title = '温馨提示') {
        Modal.alert(title, content, [{
            text: '好的',
            onPress: nextFn,
        }]);
    },

    /**
     * 确认框
     * @version 170211 1.0
     */
    onConfirm(content, nextFn = () => {}, title = '温馨提示') {
        Modal.alert(title, content, [{
            text: '取消',
            style: 'default',
        }, {
            text: '好的',
            onPress: nextFn,
        }]);
    },

    /**
     * 输入框
     * @version 170211 1.0
     */
    onPrompt(title, nextFn = () => {}, defaultValue, content) {
        Modal.prompt(title, content, [{
            text: '取消',
            style: 'default',
        }, {
            text: '提交',
            onPress: (value) => {
                //@issue Modal.prompt没onchange时，这个value为空
                nextFn(value || defaultValue);
            },
        }], 'text', defaultValue);
    },

    /**
     * 格式化emoji字符串
     * @version 170218 1.0
     * @param  {String}   *value 带有emoji符号的字符串
     * @param  {Object}   style  格式化后<img />的样式
     * @return {Elements}
     */
    emojify(value, style) {
        const config = {
            //host: 'http://localhost:8080',
            //path: './common/emoji',
            attributes: {
                width: undefined,
                height: undefined,
                style,
            },
        };

        return emojify(value, config) || [];
    },

    /**
     * 利用react-router的hash _k判断页面是进还是出，并记录
     * @version 170302 1.0
     * @param  {String} key       下一个页面路由
     * @param  {String} action    `REPLACE` or other
     * @param  {String} pathname  路由名称
     * @return {Bool}   true为进，false为退
     */
    getPageTransition({ key, action, pathname }) {
        if (key == '' || pathname == '') return false;

        if (pathname == '/') {
            pageTransitionKeys.push(key);
            return false;

        } else {

            //router.replace一定是进
            if (action == 'REPLACE') {
                pageTransitionKeys[pageTransitionKeys.length - 1] = key;
                return true;

            } else {
                if (
                    pageTransitionKeys[pageTransitionKeys.length - 1] != key 
                    && pageTransitionKeys[pageTransitionKeys.length - 2] != key
                ) {
                    pageTransitionKeys.push(key);
                    return true;

                } else {
                    pageTransitionKeys.pop();
                    return false;
                }
            }
        }
    },

    /**
     * 滚动到指定y轴坐标
     * @version 170312 1.0
     * @param {Int} y 文档y轴坐标
     */
    scrollTo(y = 0) {
        const timer = setInterval(() => {
            //获取滚动条的滚动高度
            const osTop = document.documentElement.scrollTop || document.body.scrollTop;

            //用于设置速度差，产生缓动的效果
            const speed = Math.floor(- osTop / 6);

            //控制新滚动高度一定不能小于y
            const limit = osTop + speed <= y ? y : osTop + speed;
            document.documentElement.scrollTop = document.body.scrollTop = limit;

            if (osTop <= y) clearInterval(timer);
        }, 30);
    }
};