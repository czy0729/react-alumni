/**
 * 项目顶容器
 * @version 170120 1.0
 */
'use strict';

import React from 'react';
const { CSSTransitionGroup } = React.addons;
import stores, { $app } from 'stores';
import { TabBar, Icon } from 'antd-mobile';
import { Page } from 'components';
import Tabbar from '../Tabbar';
import Popout from '../Popout';
import './index.less';

const prefixCls = 'pages-app__index';

export default class App extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        //测试用
        if (typeof wx === 'undefined') {
            window.Const = Const;
            window.Utils = Utils;
            window.Ajax = Ajax;

            //开启缓存stores
            //window.addEventListener('beforeunload', e => stores.setCache(), false);
        }
    }

    render() {
        const { routes, location, children } = this.props;

        //页面切换时更新页面title
        document.title = routes[routes.length - 1].title;

        return (
            <div className={prefixCls}>
                <CSSTransitionGroup
                    className={`${prefixCls}__transition`}
                    component="div"
                    transitionName={Utils.getPageTransition(location) ? 'slide-left' : 'slide-right'}
                    transitionEnterTimeout={620}
                    transitionLeaveTimeout={600}
                >
                    {React.cloneElement(
                        <Page>{children}</Page> || <div />, 
                        { key: location.pathname }
                    )}
                </CSSTransitionGroup>

                <Tabbar location={location} />

                <Popout />
            </div>
        );
    }
};