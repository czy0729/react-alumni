/**
 * 本项目才能使用的工具方法
 * @version 170216 1.0
 */
'use strict';

import Const from '../constants';

export default {
    /**
     * 确认后端返回的图片地址是否路径地址，是路径地址在头加上Const.web
     * @version 161026 1.0
     * @param  {String} *str 图片字段值
     * @return {String}
     */
    getImgUrl(str) {
        if (!str || typeof str !== 'string') return '';

        return str.indexOf('http') == 0 ? str : `${Const.web}/${str}`;
    },

    /**
     * 扩展getUmgUrl()，返回服务器约定缩略图图片地址
     * @version 161026 1.0
     * @param  {String} *str 图片字段值
     * @param  {String} flg  插入的字符串
     * @return {String}
     */
    getAppImgUrl(str, flg = 'thumb') {
        if (!str || typeof str !== 'string') return '';

        if (str.indexOf('http') == 0) return str;

        const lastIndex = str.lastIndexOf('.');
        const left = str.substring(0, lastIndex);
        const right = str.substring(lastIndex);

        return `${Const.web}/${left}_${flg}${right}`;
    },

    /**
     * 把api传过来的对象根据Const.fields的配置，构造成表单配置数组
     * 适用于用户详情、认证需填写信息和认证可见信息
     * @version 170220 1.0
     * @param  {Obj}   *data 图片字段值
     * @return {Array} [['字段名', '字段值', '字段名称', '表单字段排序标识', '其他']]
     * e.g. [[['real_name', 'chen', '真实姓名', 0, 10], ['mobile', '...', '手机号', 0, 20]], [...]]
     */
    generateFieldsConfig(data) {
        delete data._loaded;

        //先把api返回的配置对象转成数组
        const configData = [];
        for (let key in data) {
            //只有Const.fields里面有的key才会构造
            //处理了认证需填写信息和认证可见信息接口key
            const fieldValue = Const.fields[key.replace('is_need_', '').replace('is_show_', '')];

            //构造数据结构 ['字段名', '字段值', '字段名称', '表单字段排序标识', '其他']
            fieldValue && configData.push([
                key,
                data[key],
                ...fieldValue,
            ]);
        }

        //根据Const.fields对数组进行排序和分组
        const groupData = [];
        configData
            .sort((a, b) => a[4] - b[4])
            .forEach((item, idx) => {
                if (!groupData[item[3]]) groupData[item[3]] = [];

                groupData[item[3]].push(item);
            });

        return groupData;
    }
};