/**
 * 校友录管理中心
 * @Date: 2017-02-10 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-22 06:48:31
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $alumni, $user } from 'stores';
import { Tabs, Icon } from 'antd-mobile';
import { Spin, AppResult } from 'components';
import Member from './containers/Member';
import './index.less';

const prefixCls = 'pages-index__index';
const TabPane = Tabs.TabPane;

@observer
export default class IndexIndex extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const { alumni_id } = this;

        $alumni.fetch({ alumni_id });
        $user.fetch_list({ alumni_id });
    }

    get alumni_id() {
        return this.props.params.alumni_id;
    }

    get data() {
        const { alumni_id } = this;

        return {
            alumni    : $alumni.getStateById(alumni_id),
            user_list : $user.getStateById(alumni_id, 'list'),
        };
    }

    render() {
        const { alumni_id } = this;
        const { alumni, user_list } = this.data;

        return (
            <Spin 
                className={prefixCls}
                spinning={Utils.isSpinning(this.data)}
            >
                <div className={`${prefixCls}__head`}>
                    <Icon 
                        className={`${prefixCls}__btn-center`} 
                        type="ellipsis"
                        onClick={() => Utils.router.push(
                            Const.router.center({ 
                                alumni_id,
                            })
                        )}
                    />

                    <p className={`${prefixCls}__head_name`}>{alumni.name}</p>
                    <p className={`${prefixCls}__head_desc`}>{alumni.school_name}</p>
                    <p className={`${prefixCls}__head_sub`}>
                        “ {Utils.emojify(alumni.description, {
                            width: '.3rem',
                            height: '.3rem',
                        })} ”
                    </p>
                </div>

                <Tabs 
                    defaultActiveKey="1"
                    swipeable={false}
                >
                    <TabPane tab="通讯录" key="1">
                        <div style={{ minHeight: '80vw' }}>
                            <Member
                                alumni_id={alumni_id}
                                user_list={user_list}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab="通知栏" key="2">
                        <div style={{ minHeight: '80vw' }}>
                            <AppResult
                                icon={require('common/svg/inbox.svg')}
                                title="空空如也"
                                message="暂时没有特别的消息"
                            />
                        </div>
                    </TabPane>
                </Tabs>
            </Spin>
        );
    } 
};