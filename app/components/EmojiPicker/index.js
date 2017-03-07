/**
 * emoji简易选择器
 * @version 170215 1.0
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import { emojify } from 'react-emoji';
import { emojiDS } from './ds';
import './index.less';

const prefixCls =  'components__emoji-picker';

export default class EmojiPicker extends React.Component {
    static propTypes = {
        onPick: React.PropTypes.func,
        onShow: React.PropTypes.func,
        onHide: React.PropTypes.func,
    };

    static defaultProps = {
        onPick: (emoji) => {},
        onShow: () => {},
        onHide: () => {},
    };

    constructor() {
        super();

        this.state = {
            show: false,
        };
        Utils.binds(this, ['show', 'hide', 'pick']);
    }

    show() {
        const { onShow } = this.props;

        this.setState({
            show: true,
        }, () => setTimeout(() => onShow(), 250));
    }

    hide() {
        const { onHide } = this.props;

        this.setState({
            show: false,
        }, () => setTimeout(() => onHide(), 250));
    }

    pick(e) {
        const { onPick } = this.props;

        onPick(e.target.alt);
    }

    render() {
        const { show } = this.state;

        return (
            <div className={prefixCls}>
                {show && <div className={`${prefixCls}__full`} onClick={e => this.setState({ show: false })}/>}

                <div 
                    className={classNames(`${prefixCls}__btn-toggle`, {
                        [`${prefixCls}__btn-toggle_active`]: show,
                    })}
                    onClick={show ? this.hide : this.show}
                >
                    {emojify(':grinning:', {
                        //host: 'http://localhost:8080',
                        //path: './common/emoji',
                        attributes: {
                            width: undefined,
                            height: undefined,
                        },
                    })}
                </div>

                <div className={classNames(`${prefixCls}__items`, {
                    [`${prefixCls}__items_open`]: show,
                })}>
                    {emojiDS.map((item) => emojify(item, {
                        //host: 'http://localhost:8080',
                        //path: './common/emoji',
                        attributes: {
                            width: undefined,
                            height: undefined,
                            className: `${prefixCls}__item`,
                            alt: item,
                            onClick: this.pick,
                        },
                        key: item,
                    }))}
                </div>
            </div>
        );
    }
};