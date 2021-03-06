/**
 * Tabbar 导航条
 * @Date: 2017-03-06 19:46:25
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-31 08:12:10
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import { observer } from 'decorators';
import { $app } from 'stores';
import { TabBar, Icon } from 'antd-mobile';
import './index.less';

const prefixCls = 'pages-app__tabbar';

@observer
export default class AppTabbar extends React.Component {
    constructor() {
        super();

        this.timeout = 0;
    }

    renderTabBarItem(props) {
        const { location } = this.props;
        const { pathname, title, icon, selectedIcon, ...other } = props;

        return (
            <TabBar.Item
                key={pathname}
                title={title}
                icon={icon}
                selectedIcon={selectedIcon || icon}
                selected={location.pathname === pathname}
                onPress={() => {
                    Utils.router.push(pathname);

                    if (pathname !== '_down') {
                        if (this.timeout) {
                            clearTimeout(this.timeout);
                        }

                        this.timeout = setTimeout(() => {
                            $app.hideTabbar();
                            this.timeout = 0;
                        }, 3000);
                    }
                }}
                {...other}
            />
        );
    }

    render() {
        return (
            <div className={prefixCls}>
                <TabBar
                    unselectedTintColor={Const.ui.color_default}
                    tintColor={Const.ui.color_primary}
                    hidden={!$app.state.tabbar.show}
                >
                    {this.renderTabBarItem({
                        title: '新建',
                        icon: <Icon size="xxs" type={require('svg/file_default.svg')} />,
                        selectedIcon: <Icon size="xxs" type={require('svg/file.svg')} />,
                        pathname: Const.router.add_alumni(),
                    })}
                    {this.renderTabBarItem({
                        title: '校友录',
                        icon: <Icon size="xxs" type={require('svg/bag_default.svg')} />,
                        selectedIcon: <Icon size="xxs" type={require('svg/bag.svg')} />,
                        pathname: Const.router.user_alumni(),
                    })}
                    {this.renderTabBarItem({
                        title: '个人',
                        icon: <Icon size="xxs" type={require('svg/smile_default.svg')} />,
                        selectedIcon: <Icon size="xxs" type={require('svg/smile.svg')} />,
                        pathname: Const.router.user_center(),
                    })}
                    {this.renderTabBarItem({
                        title: '收起',
                        icon: <Icon size="xxs" type={require('svg/cross_default.svg')} />,
                        pathname: '_down',
                        onPress: () => $app.hideTabbar(),
                    })}
                </TabBar>

                <div 
                    className={classNames({
                        [`${prefixCls}__btn-toggle`]: 1,
                        [`${prefixCls}__btn-toggle_active`]: !$app.state.tabbar.show,
                    })}
                    onClick={() => $app.showTabbar()}
                >
                    <Icon size="xxs" type={require('common/svg/up.svg')} />
                </div>
            </div>
        );
    }
};