/**
 * common store
 * @Date: 2017-02-08 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-19 19:12:13
 */
'use strict';

import { useStrict, observable, action } from 'mobx';

useStrict(true);

class store {
    constructor() {}

    /**
     * 判断配置，从localStorage里初始化state
     * @version 170213 1.0
     * @version 170313 1.1 过滤参数，某些键可以强制使用默认值
     */
    initState(defaultState = {}, filter = []) {
        const { cache, namespace } = this.config || {};

        const filterState = {};
        filter.forEach((item) => {
            filterState[item] = defaultState[item];
        });

        return cache && namespace 
          ? Object.assign({}, defaultState, Utils.lsGet(namespace), filterState) 
          : { ...defaultState, ...filterState };
    }

    /**
     * 从state取值，浅拷贝
     * 切记不能直接取state，delete等操作后会把store的引用都删掉了
     * @version 170312 1.0
     */
    getState(key = 'base') {
        if (key) {
            return this.state[key] && { ...this.state[key] } || {};
        } else {
            return { ...this.state } || {};
        }
    }

    /**
     * 从state取一个id值，浅拷贝
     * @version 170208 1.0
     * @version 170213 1.1 新增@param key
     * @version 170219 1.2 为了安全，返回的数据做了浅拷贝处理
     */
    getStateById(id, key = 'base') {
        if (key) {
            return this.state[key] && { ...this.state[key][id] } || {};
        } else {
            return { ...this.state[id] } || {};
        }
    }

    /**
     * 普通setState
     * @version 170216 1.0
     * @version 170319 1.1 set之前做了比较
     */
    @action
    setState(data, key = 'base') {
        //对象和数组返回数据都生成相同的结构
        const value = Array.isArray(data) ? {
            data,
            _loaded: true,
        } : {
            ...data,
            _loaded: true,
        };

        if (!this.is(this.getState(key), value)) {
            this.state[key] = {
                ...this.state[key],
                ...value,
            };
        }
    }

    /**
     * 专门用于保存带id主键的请求结果的setState
     * 并且判断返回结果是对象还是数组，都处理成统一的数据结构
     * @version 170209 1.1
     * @version 170214 1.2 [+]key [merge]setStateArrayById
     * @version 170319 1.3 set之前做了比较
     */
    @action
    setStateById(id, data = {}, key = 'base') {
        //对象和数组返回数据都生成相同的结构
        const value = Array.isArray(data) ? {
            data,
            _loaded: true,
        } : {
            ...data,
            _loaded: true,
        };

        if (!this.is(this.getStateById(id, key), value)) {
            this.state[key] = {
                ...this.state[key],
                [id]: value,
            };
        }
    }

    /**
     * ajax后自动setState
     * @version 170318 1.0
     * @param  {Object}  query
     * @param  {Object}  config Ajax的扩展配置
     * @param  {String}  *api   api名字
     * @param  {String}  key    this.state[key]
     * @return {Promise}
     */
    async fetchThenSetState(query, config, api, key) {
        const state = this.getState(key);

        const result = Ajax.P(api, query, {
            show: !state._loaded,
            ...config,
        });

        const data = await result;

        this.setState(data, key);

        return result;
    }

    /**
     * ajax后自动setStateById
     * @version 170318 1.0
     * @param  {Object}  query
     * @param  {Object}  config Ajax的扩展配置
     * @param  {String}  *api   api名字
     * @param  {String}  *idKey id fieldname
     * @param  {String}  key    this.state[key]
     * @return {Promise}
     */
    async fetchThenSetStateById(query, config, api, idKey, key) {
        const id = query[idKey];
        const state = this.getStateById(id, key);

        const result = Ajax.P(api, query, {
            show: !state._loaded,
            ...config,
        });

        const data = await result;

        this.setStateById(id, data, key);

        return result;
    }

    /**
     * 比较下一个值是否跟当前值相同
     * @version 170319 1.0
     * @param  {Object}  *current
     * @param  {Object}  *next
     * @return {Boolean}
     */
    is(current = {}, next = {}) {
        if (typeof current !== 'object' || typeof next !== 'object') return false;

        //当前数据源没有就绪的时候，总是返回false
        if (!current._loaded) return false;

        //#todo 因为数据源数据量都很小，暂时先转成字符串比较
        return JSON.stringify(current) === JSON.stringify(next);
    }
};

export default store;