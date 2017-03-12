/**
 * Tabbar
 * @version 170306 1.0
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
                onPress={() => Utils.router.push(pathname)}
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
                        icon: <Icon type="plus" />,
                        pathname: Const.router.add_alumni(),
                    })}
                    {this.renderTabBarItem({
                        title: '校友录',
                        icon: <Icon type="bars" />,
                        pathname: Const.router.user_alumni(),
                    })}
                    {this.renderTabBarItem({
                        title: '个人',
                        icon: <Icon type="smile" />,
                        selectedIcon: <Icon type="smile-circle" />,
                        pathname: Const.router.user_center(),
                    })}
                    {this.renderTabBarItem({
                        title: '收起',
                        icon: <Icon type="down" />,
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
                    <Icon type="up" />
                </div>
            </div>
        );
    }
};