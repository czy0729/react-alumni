/**
 * 身份
 * @version 170212 1.0
 */
'use strict';

import { useStrict, observable, extendObservable, action, computed } from 'mobx';
import common from './common';

useStrict(true);

class store extends common {
	constructor() {
		super();

		this.config = {
			namespace: '$identity',
			cache: true,
		};
	}

	@observable state = this.initState();

    /**
     * 2.4.0 身份列表
     * @version 170212 1.0
     * @param {Int} *alumni_id 校友录id
     */
	@action
	async fetch(query, config) {
		const { alumni_id } = query;

		const result = await Ajax('get_identity_list', query, {
			show: !this.getById(alumni_id)._loaded,
			...query,
		});

		this.setStateById(alumni_id, result);
	}

	/**
     * 2.4.1 添加身份
     * @version 170212 1.0
     * @param {Int}    *alumni_id 校友录id
     * @param {String} *name      名称
     */
	@action
	async add(query, config) {
		const { alumni_id } = query;

		await Ajax('add_identity', query, config);

		this.fetch({ alumni_id });
	}

	/**
     * 2.4.2 修改身份
     * @version 170212 1.0
     * @param {Int}    *alumni_id        校友录id
     * @param {Int}    *identity_type_id 身份管理类型id
     * @param {String} *name             名称
     */
	@action
	async update(query, config) {
		const { alumni_id } = query;

		await Ajax('update_identity', query, config);

		this.fetch({ alumni_id });
	}

	/**
     * 2.4.3 删除身份
     * @version 170212 1.0
     * @param {Int} *alumni_id        校友录id
     * @param {Int} *identity_type_id 身份管理类型id
     */
    @action
	async delete(query, config) {
		const { alumni_id } = query;

		await Ajax('delete_identity', query, config);

		this.fetch({ alumni_id });
	}
};

export default new store();