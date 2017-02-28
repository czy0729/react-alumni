/**
 * antd-mobile Popover
 * @version 170215 1.0
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import { Popover } from 'antd-mobile';

const prefixCls = 'components__app-popover';

class AppPopover extends React.Component {
	static propTypes = {
		overlay: React.PropTypes.array.isRequired,
		onSelect: React.PropTypes.func,
	};

	static defaultProps = {
        onSelect: (node, key) => {},
    };

	constructor() {
        super();

        this.state = {
            visible: false,
        };
        Utils.binds(this, ['handleVisibleChange', 'handleSelect']);
    }

    handleVisibleChange(visible) {
    	this.setState({
    		visible,
    	});
    }

    handleSelect(node, key) {
    	const { onSelect } = this.props;

    	this.setState({
    		visible: false,
    	});

    	onSelect(node, key);
    }

    render() {
    	const { onSelect, className, children, ...other } = this.props;
    	const { visible } = this.state;

    	return (
    		<Popover
    			className={classNames(prefixCls, className)}
                mask
                visible={visible}
                popupAlign={{
                    overflow: { adjustY: 0, adjustX: 0 },
                    offset: [0, 24],
                }}
                onVisibleChange={this.handleVisibleChange}
                onSelect={this.handleSelect}
                {...other}
            >
                {children}
            </Popover>
    	);
    }
};

AppPopover.Item = Popover.Item;

export default AppPopover;