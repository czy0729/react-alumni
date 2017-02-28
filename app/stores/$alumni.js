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
	}

	/*==================== action ====================*/
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
		const { alumni_id } = query;

		await Ajax('update_alumni_info', query, config);

		this.fetch({ alumni_id });
	}
};

export default new store();