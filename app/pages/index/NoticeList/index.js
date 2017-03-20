/**
 * 通知列表
 * @Date: 2017-02-17 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-21 06:28:58
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $notice, $alumni } from 'stores';
import { List, Button } from 'antd-mobile';
import { Spin, Permission, ButtonWrap, AppListView } from 'components';

const prefixCls = 'pages-index__notice-list';

@observer
export default class IndexNoticeList extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const { alumni_id } = this;

        $alumni.fetch({ alumni_id });
        $notice.fetch_list({ alumni_id });
    }

    get alumni_id() {
        return this.props.params.alumni_id;
    }

    get data() {
        const { alumni_id } = this;

        return {
            alumni: $alumni.getStateById(alumni_id),
            list: $notice.getStateById(alumni_id, 'list'),
        };
    }

    render() {
        const { alumni_id } = this;
        const { alumni, list } = this.data;

        return (
            <Spin 
                className={prefixCls}
                spinning={Utils.isSpinning(this.data)}
            >
                <AppListView
                    data={list.data}
                    loaded={list._loaded}
                    renderRow={(rowData, sectionID, rowID) => (
                        <List.Item 
                            arrow="horizontal"
                            onClick={() => Utils.router.push(
                                Const.router.notice({
                                    alumni_id,
                                    notice_id: rowData.notice_id,
                                })
                            )}
                        >
                            <p>{rowData.title}</p>
                            <p className="mt-space text-mini text-default">
                                <span>{rowData.nickname}</span>
                                <span className="ml-sm">{Utils.lastDate(rowData.ctime)}</span>
                            </p>
                        </List.Item>
                    )}
                />

                {/*①我是管理员*/}
                <Permission
                    rules={[{
                        condition : [Const.user_type.super, Const.user_type.admin],
                        value     : alumni.user_type,
                    }]}
                >
                    <ButtonWrap>
                        <Button 
                            onClick={() => Utils.router.push(
                                Const.router.admin_notice({ 
                                    alumni_id,
                                    notice_id: '',
                                })
                            )}
                        >
                            发布通知
                        </Button>
                    </ButtonWrap>
                </Permission>
            </Spin>
        );
    } 
};