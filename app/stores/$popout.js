/**
 * Popout状态管理
 * @version 170216 1.0
 */
'use strict';

import { useStrict, observable, extendObservable, action, computed } from 'mobx';
import common from './common';

useStrict(true);

class store extends common {
	constructor() {
		super();

		this.config = {
			namespace: '$popout',
			cache: false,
		};
	}

	@observable state = this.initState({
		mask: {},
	});

	/**
     * 全局popout隐藏
     * @version 170216 1.0
     * @param {Element} content
     */
	@action
	hide() {
		this.hideMask();
	}

	/**
     * 显示遮罩背景层
     * @version 170216 1.0
     * @param {Element} content
     */
	@action
	showMask(content, config) {
		this.setState({
			show: true,
			content,
			config,
		}, 'mask');
	}

	/**
     * 隐藏遮罩背景层
     * @version 170216 1.0
     */
	@action
	hideMask() {
		this.setState({
			show: false,
		}, 'mask');
	}
};

export default new store();