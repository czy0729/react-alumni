/**
 * Mobx stores
 * @Date: 2017-01-22 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-24 23:39:33
 */
const stores = {
    $admin    : require('./$admin'),
    $album    : require('./$album'),
    $alumni   : require('./$alumni'),
    $app      : require('./$app'),
    $auth     : require('./$auth'),
    $identity : require('./$identity'),
    $notice   : require('./$notice'),
    $popout   : require('./$popout'),
    $user     : require('./$user'),
};

export default {
    ...stores,

    /**
     * 保存到localStorage
     * @version 170213 1.0
     */
    setCache() {
        for (let key in stores) {
            const { cache, namespace } = stores[key].config || {};

            if (cache) Utils.lsSet(namespace, stores[key].state);
        }
    },
};