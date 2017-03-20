/**
 * 结果页
 * @Date: 2017-03-10 15:14:47
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-19 07:12:49
 */
'use strict';

import React from 'react';
import { Button } from 'antd-mobile';
import { ButtonWrap, AppResult } from 'components';

const prefixCls = 'pages-app__result';

export default class _AppResult extends React.Component {
    constructor() {
        super();
    }
 
    get router_state() {
        return this.props.location.state || {};
    }
    
    render() {
        const { title, message, button = [] } = this.router_state;

        return (
            <div className={prefixCls}>
                <AppResult 
                    title={title}
                    message={message}
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