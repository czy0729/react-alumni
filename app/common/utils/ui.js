/**
 * UI相关
 * @version 170211 1.0
 */
'use strict';

import React from 'react';
import { Toast, Modal } from 'antd-mobile';
import { emojify } from 'react-emoji';

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
     * @version 170218 1.0
     */
    emojify(value, style) {
        const config = {
            host: 'http://localhost:8080',
            path: './common/emoji',
            attributes: {
                width: undefined,
                height: undefined,
                style,
            },
        };

        return emojify(value, config) || [];
    },
};