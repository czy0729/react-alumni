/**
 * rc-form表单验证规则
 * @version 170206 1.0
 */
'use strict';

export default {
	required: {
        rules: [{
            required: true, 
            message: '必填',
        }],
    },

    required_number: {
        rules: [{
            required: true, 
            message: '必填',
            type: 'number',
        }],
    },

    required_array: {
        rules: [{
            required: true, 
            message: '必填',
            type: 'array',
        }],
    },

    required_object: {
        rules: [{
            required: true, 
            message: '必填',
            type: 'object',
        }]
    },
};