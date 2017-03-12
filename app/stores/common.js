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
    getState(key) {
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
                          _loaded: true,
                      },
                }
              : {
                      ...this.state,
                      ...data,
                      _loaded: true,
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