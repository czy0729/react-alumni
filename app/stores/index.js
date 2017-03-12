/**
 * Mobx stores
 * @version 170122 1.0
 */
const stores = {
    $admin    : require('./$admin'),
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