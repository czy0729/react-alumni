/**
 * 管理员
 * @version 170208 1.0
 */
'use strict';

import { useStrict, observable, extendObservable, action, computed } from 'mobx';
import common from './common';

useStrict(true);

class store extends common {
	constructor() {
		super();

		this.config = {
			namespace: '$admin',
			cache: true,
		};
	}

	@observable state = this.initState();

    /**
     * 2.3.0 管理员列表
     * @version 170208 1.0
     * @param {Int} *alumni_id 校友录id
     */
	@action
	async fetch(query, config) {
		const { alumni_id } = query;

		const result = await Ajax('get_admin_list', query, {
			show: !this.getById(alumni_id)._loaded,
			...query,
		});

		this.setStateById(alumni_id, result);
	}

    /**
     * 2.1.7 设置或取消管理员授权
     * @version 170211 1.0
     * @param {Int} *alumni_id 	校友录id
     * @param {Int} *user_id 	用户id
     * @param {Int} *is_manager 1设置为管理员,0取消管理员
     */
	@action
	async auth(query, config) {
		const { alumni_id } = query;

		await Ajax('update_admin_list', query, config);

		this.fetch({ alumni_id });
	}
};

export default new store();