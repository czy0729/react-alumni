/**
 * rc-form表单验证规则
 * doc: https://github.com/yiminghe/async-validator
 * @version 170206 1.0
 * @version 170310 1.1 重构
 * #todo 错误提示暂时还不能动态化
 */
'use strict';

/**
 * rc-form rules生成器
 * @version 170310 1.0
 * @param  {String}  type       规则
 * @param  {Boolean} isRequierd 是否必须
 * @return {Object}  rc-form Decorator rules
 */
const genRules = (type, isRequired = true) => {
    const rules = [];
    const required = {
        required: true, 
        message: '必填',
    };

    switch (type) {
        //async-validator没有提供以下这些验证，手动实现
        case 'email':
        case 'mobile':
        case 'wechat':
        case 'number':
            isRequired && rules.push(required);

            rules.push({
                validator(rule, value, callback) {
                    //callback需要至少执行一次
                    //https://github.com/ant-design/ant-design/issues/5155
                    if (!Utils.validate(value, type)) {
                        callback(`${rule.field} format error`);
                    } else {
                        callback();
                    }
                }
            });

            break;

        //picker未选择的时候值为[0: undefined]，要检测排除这种情况
        case 'picker':
            isRequired && rules.push(required);

            rules.push({
                validator(rule, value, callback) {
                    if (!Array.isArray(value) || value[0] === undefined) {
                        callback(`${rule.field} is required`);
                    } else {
                        callback();
                    }
                }
            })

            break;

        //以下为async-validator提供的默认规则
        //string, !number, boolean, method, regexp, integer, float, 
        //array, object, enum, date, url, hex, !email
        default: 
            rules.push(type ? { ...required, type } : required);

            break;
    }

    return { rules };
};

export default {
	required: genRules(),
    genRules,
};