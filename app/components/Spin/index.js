/**
 * Spin 加载中
 * @version 170315 1.0
 */
'use strict';

import React from 'react';
const { CSSTransitionGroup } = React.addons;
import classNames from 'classnames';
import './index.less';

const prefixCls = 'components__spin';

export default class Spin extends React.Component {
    static defaultProps = {
        spinning: true,
        pageTransitionTime: 600, //页面切换动画过渡时间
    };

    constructor(props) {
        super(props);

        const { spinning, pageTransitionTime } = props;
        this.state = {
            spinning,
        };

        if (spinning) {
            this.pastTime = 0; //构造后经过了多长时间
            this._interval = setInterval(() => {
                if (this.pastTime < pageTransitionTime) {
                    this.pastTime += 100;
                } else {
                    clearInterval(this._interval);
                }
            }, 100);
        }
    }

    componentWillReceiveProps(nextProps) {
        //模拟至少要完成页面切换动画才渲染内容
        if (this.state.spinning && !nextProps.spinning) {
            if (this.pastTime < this.props.pageTransitionTime) {
                clearInterval(this._interval);

                this._interval = setInterval(() => {
                    if (this.pastTime < this.props.pageTransitionTime) {
                        this.pastTime += 100;

                    } else {
                        clearInterval(this._interval);
                        this.setState({
                            spinning: false,
                        });
                    }
                }, 100);

            } else {
                this.setState({
                    spinning: false,
                });
            }
        }
    }

    render() {
        const { className, children, ...other } = this.props;
        const { spinning } = this.state;

        return (
            <div>
                {
                    spinning &&
                    <div className={prefixCls}>
                        <span className={`${prefixCls}__dot`}>
                            {Array.from(Array(4), (item, idx) => <i key={idx} />)}
                        </span>
                    </div>
                }
                <CSSTransitionGroup
                    className={className}
                    component="div"
                    transitionName="fade"
                    transitionEnterTimeout={320}
                    transitionLeaveTimeout={300}
                >
                    {spinning ? null : children}
                </CSSTransitionGroup>
            </div>
        );
    }
};