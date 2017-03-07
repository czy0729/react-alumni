/**
 * common
 * @version 170208 1.0
 */
'use strict';

import { useStrict, observable, extendObservable, action, computed } from 'mobx';

useStrict(true);

class store {
	constructor() {}

	/**
	 * 判断配置，从localStorage里初始化state
	 * @version 170213 1.1
	 */
	initState(defaultState = {}) {
		const { cache, namespace } = this.config || defaultState;

		return cache && namespace 
		  ? Object.assign({}, defaultState, Utils.lsGet(namespace)) 
		  : defaultState;
	}

	/**
	 * 从state取一个id值
	 * @version 170208 1.0
	 * @version 170213 1.1 新增@param key
	 * @version 170219 1.2 为了安全，返回的数据做了浅拷贝处理，以后可能使用immutable
	 */
	getById(id, key) {
		if (key) {
			return this.state[key] && { ...this.state[key][id] } || {};
		} else {
			return { ...this.state[id] } || {};
		}
	}

	/**
	 * 普通setState
	 * @version 170216 1.0
	 */
	@action
	setState(data, key) {
		extendObservable(this, {
    		state: key
    		  ? {
    		  		...this.state,
    		  		[key]: {
    		  			...this.state[key],
    		  			...data,
    		  		},
    		    }
    		  : {
    		  		...this.state,
    		  		...data,
    		    }
    	});
	}

	/**
	 * 专门用于保存带id主键的请求结果的setState
	 * 并且判断返回结果是对象还是数组，都处理成统一的数据结构
	 * @version 170209 1.1
	 * @version 170214 1.2 [+]key [merge]setStateArrayById
	 */
	@action
	setStateById(id, data = {}, key) {
		//对象和数组返回数据都生成相同的结构
		const value = toString.apply(data) === '[object Array]'
		  ? { data, _loaded: true } 
		  : { ...data, _loaded: true };

		extendObservable(this, {
    		state: key
    		  ?  {
	    			...this.state,
	    			[key]: {
	    				...this.state[key],
	    				[id]: value,
	    			},
	    		}
	    	  : {
	    			...this.state,
	    			[id]: value,
	    		},
    	});
	}
};

export default store;