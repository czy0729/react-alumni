/**
 * 用户
 * @version 170223 1.0
 */
'use strict';

import { useStrict, observable, extendObservable, action, computed } from 'mobx';
import common from './common';

useStrict(true);

class store extends common {
	constructor() {
		super();

		this.config = {
			namespace: '$user',
			cache: true,
		};
	}

	@observable state = this.initState({
		//...self
		list: {},
		detail: {},
	});

	/*==================== view ====================*/
	/**
     * 0.0 自己的基本信息
     * @version 170223 1.0
     */
    @action
	async fetch(query, config) {
		const result = await Ajax('get_user_info', query, {
			show: !this.state._loaded,
			...config,
		});

		this.setState(result);
	}

	/**
     * 2.1.3 校友录用户列表
     * @version 170220 1.0
     * @param {Int} *alumni_id 校友录id
     */
    @action
	async fetch_list(query, config) {
		const { alumni_id } = query;

		const result = await Ajax('get_alumni_user_list', query, {
			show: !this.getById(alumni_id, 'list')._loaded,
			...config,
		});

		this.setStateById(alumni_id, result, 'list');
	}

	/**
     * 2.1.4 校友录用户详情
     * @version 170222 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} *user_id   用户id
     */
    @action
	async fetch_detail(query, config) {
		const { alumni_id, user_id } = query;
		const pk = `${alumni_id}-${user_id}`;

		const result = await Ajax('get_alumni_user_detail', query, {
			show: !this.getById(pk, 'detail')._loaded,
			...config,
		});

		this.setStateById(pk, result, 'detail');
	}

	/*==================== action ====================*/
	/**
     * 2.1.5 校友录发出交换名片请求
     * @version 170224 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} *user_id   用户id
     */
	@action
	async exchange_card(query, config) {
		await Ajax('do_exchange_card', query, config);
	}

	/**
     * 2.1.8 删除校友录用户
     * @version 170224 1.0
     * @param {Int} *alumni_id 校友录id
     * @param {Int} *user_id   用户id
     */
	@action
	async delete(query, config) {
		await Ajax('delete_alumni_user', query, config);
	}

	/**
     * 2.1.9 用户退出校友录
     * @version 170224 1.0
     * @param {Int} *alumni_id 校友录id
     */
    @action
    async quit(query, config) {
    	await Ajax('do_quit_alumni', query, config);
    }

    /**
     * 2.1.10 设置或取消加入黑名单
     * @version 170224 1.0
     * @param {Int} *user_id 某个用户id
     * @param {Int} *status  -1设置为设为黑名单,0取消黑名单
     */
    @action
    async set_black(query, config) {
    	await Ajax('do_set_black', query, config);
    }

    /**
     * 2.2.3 设置用户备注名
     * @version 170224 1.0
     * @param {Int}    *alumni_id 校友录id
     * @param {Int}    *user_id   加入的用户id
     * @param {String} *back_name 用户备注名
     */
    @action
    async set_back_name(query, config) {
    	await Ajax('do_set_black', query, config);
    }
};

export default new store();