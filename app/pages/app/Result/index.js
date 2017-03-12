/**
 * 结果页
 * @version 170312 1.0
 */
'use strict';

import React from 'react';
import { Result, Icon, Button } from 'antd-mobile';
import { ButtonWrap } from 'components';
import './index.less';

const prefixCls = 'pages-app__result';

export default class AppResult extends React.Component {
    constructor() {
        super();
    }
 
    get router_state() {
        return this.props.location.state;
    }
    
    render() {
        const { icon = 'check-circle', color = Const.ui.color_primary, title, message, button } = this.router_state;

        return (
            <div className={prefixCls}>
                <Result
                    img={
                        <Icon 
                            className={`${prefixCls}__icon`}
                            type={icon}
                            style={{ color }}
                        />
                    }
                    title={<p className={`${prefixCls}__title`}>{title}</p>}
                    message={<p className={`${prefixCls}__message`}>{message}</p>}
                />

                <ButtonWrap>
                    {
                        button.map((item, idx) => {
                            const { text, href, ...other } = item;

                            return (
                                <Button 
                                    key={idx}
                                    onClick={href ? () => Utils.router.push(href) : undefined}
                                    {...other}
                                >
                                    {text}
                                </Button>
                            );
                        })
                    }
                </ButtonWrap>
            </div>
        );
    }
};