/**
 * 校友录管理中心
 * @version 170210 1.0
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $alumni } from 'stores';
import { Tabs, Icon } from 'antd-mobile';
import { Spin } from 'components';
import Member from './member';
import Event from './event';
import './index.less';

const prefixCls = 'pages-index__index';
const TabPane = Tabs.TabPane;

@observer
export default class IndexIndex extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        $alumni.fetch({ alumni_id: this.alumni_id });
    }

    get alumni_id() {
        return this.props.params.alumni_id;
    }

    render() {
        const data = $alumni.getById(this.alumni_id);

        return (
            <Spin 
                className={prefixCls}
                spinning={!data._loaded}
            >
                {/*详情*/}
                <div className={`${prefixCls}__head`}>
                    <Icon 
                        className={`${prefixCls}__btn-center`} 
                        type="ellipsis"
                        onClick={() => Utils.router.push(Const.router.center({ alumni_id: this.alumni_id }))}
                    />

                    <p className={`${prefixCls}__head_name`}>{data.name}</p>
                    <p className={`${prefixCls}__head_desc`}>{data.school_name}</p>
                    <p className={`${prefixCls}__head_sub`}>
                        {Utils.emojify(data.description, {
                            width: '.3rem',
                            height: '.3rem',
                        })}
                    </p>
                </div>

                {/*标签页*/}
                <Tabs 
                    defaultActiveKey="1"
                    swipeable={false}
                >
                    <TabPane tab="通讯录" key="1">
                        <Member alumni_id={this.alumni_id} />
                    </TabPane>
                    <TabPane tab="通知栏" key="2">
                        <Event alumni_id={this.alumni_id} />
                    </TabPane>
                </Tabs>
            </Spin>
        );
    } 
};