/**
 * 
 * @Date: 2017-03-26 06:47:35
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-27 06:43:59
 */
'use strict';

import React from 'react';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import './index.less';

const prefixCls = 'pages-index__album__tween-img';

export default class TweenImg extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            animationMask: {
                backgroundColor: '#000',
                duration: props.ms, 
                ease: 'easeOutCubic',
            },
            animation: {
                top: 0, 
                left: 0, 
                width: '100vw', 
                height: '100vh',
                duration: props.ms, 
                ease: 'easeOutCubic',
            },
            loaded: false,
        };
    }

    render() {
        const { top, left, width, height, src, ms } = this.props;
        const { animation, animationMask, loaded } = this.state;

        const common = {
            top,
            left,
            width,
            height,
            backgroundColor: 'transparent',
        };

        return (
            <div className={prefixCls}>
                <TweenOne
                    className={`${prefixCls}__mask`}
                    animation={animationMask}
                />
                <TweenOne
                    className={`${prefixCls}__orgin`}
                    style={{
                        ...common,
                        backgroundImage: `url(${Utils.getImgUrl(src)})`,
                        backgroundSize: 'contain',
                    }}
                    paused={!loaded}
                    animation={animation}
                    onClick={(e) => this.setState({
                        animation: {
                            ...animation,
                            ...common,
                        },
                        animationMask: {
                            ...animationMask,
                            backgroundColor: 'transparent',
                        },
                    })}
                />
                <img 
                    src={Utils.getImgUrl(src)}
                    onLoad={(e) => this.setState({ loaded: true })}
                    style={{ display: 'none' }}
                />
            </div>
        );
    }
};