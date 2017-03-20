'use strict';

function successDecorator(target, prop, descriptor) {
    const copy = target[prop].bind(target.constructor);

    descriptor.value = (...arg) => {
        copy(...arg);

        Utils.onSuccess();
    };
}

export default successDecorator;