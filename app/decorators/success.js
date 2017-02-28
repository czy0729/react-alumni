/**
 * @success async包装方法，await后显示统一Modal.success
 * @version 170212 0.1
 */
'use strict';

function successDecorator(target, prop, descriptor) {
	const copy = target[prop].bind(target.constructor);

	descriptor.value = (...arg) => {
		copy(...arg);

		Utils.onSuccess();
	};
}

export default successDecorator;