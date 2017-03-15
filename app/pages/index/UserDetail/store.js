import { useStrict, observable, extendObservable, action, computed } from 'mobx';

class store {
	constructor() {
        console.log('new')
    }

    @observable state = {};

    @action add() {
    	this.state = { a: 1 }
    }
}

export default store;