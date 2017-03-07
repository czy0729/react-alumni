/**
 * 校友录基本
 * @version 170205 1.0
 */
'use strict';

import { useStrict, observable, extendObservable, action, computed } from 'mobx';
import common from './common';

useStrict(true);

class store extends common {
	constructor() {
		super();

		this.config = {
			namespace: '$alumni',
			cache: true,
		};
	}

	@observable state = this.initState({
		list: {},
	});

	/*==================== view ====================*/
	/**
     * 2.1.1 获取校友录基本信息
     * @version 170205 1.0
     * @param {Int}	*alumni_id 校友录id
     */
	@action
	async fetch(query, config) {
		const { alumni_id } = query;

		const result = await Ajax('get_alumni_info', query, {
			show: !this.getById(alumni_id)._loaded,
			...config,
		});

		this.setStateById(alumni_id, result);

		return result;
	}

	/**
     * 2.1.0 我的校友录列表
     * @version 170228 1.0
     */
    @action
	async fetch_list(query, config) {
		const result = await Ajax('get_alumni_list', query, {
			show: !this.state['list']._loaded,
			...config,
		});

		this.setState({
			data: result,
			_loaded: true,
		}, 'list');

		return result;
	}

	/*==================== action ====================*/
	/**
     * 1.0 添加校友录
     * @version 170305 1.0
     * @param {String} *name        校友录名称
     * @param {String} *school_name 学校名称
     * @param {String} *description 描述
     * @param {Base64} logo         校友录头像
     */
    @action
	async add(query, config) {
		return await Ajax('add_alumni', query, config);
	}

    /**
     * 2.1.2 修改校友录基本信息
     * @version 170207 1.0
     * @param {Int}    *alumni_id  校友录id
     * @param {String} logo 	   校友录头像
     * @param {String} name 	   校友录名称
     * @param {String} school_name 学校名称
     * @param {String} description 描述
     */
	@action
	async update(query, config) {
		return await Ajax('update_alumni_info', query, config);
	}
};

export default new store();