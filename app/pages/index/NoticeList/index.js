/**
 * 通知列表
 * @version 170217 1.0
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $notice, $alumni } from 'stores';
import { List, Button } from 'antd-mobile';
import { Permission, ButtonWrap, AppListView } from 'components';

const prefixCls = 'pages-index__notice-list';

@observer
export default class NoticeList extends React.Component {
    static contextTypes = {
        router: React.PropTypes.any,
    };

    constructor() {
        super();
    }

    componentDidMount() {
        $notice.fetch_list({ alumni_id: this.alumni_id });
    }

    get alumni_id() {
        return this.props.params.alumni_id;
    }

    render() {
        const { router } = this.context;
        const data = $notice.getById(this.alumni_id, 'list');
        const data_alumni = $alumni.getById(this.alumni_id);

        return (
            <div className={prefixCls}>
                {/*按钮*/}
                {/*①我是管理员*/}
                <Permission
                    rules={[{
                        condition : [Const.user_type.super, Const.user_type.admin],
                        value     : data_alumni.user_type,
                    }]}
                >
                    <ButtonWrap>
                        <Button onClick={() => router.push(`/${this.alumni_id}/admin/notice/`)}>发布通知</Button>
                    </ButtonWrap>
                </Permission>

                {/*列表*/}
                <AppListView
                    data={data.data}
                    renderRow={(rowData, sectionID, rowID) => (
                        <List.Item 
                            arrow="horizontal"
                            onClick={() => router.push(`/${this.alumni_id}/notice/${rowData.notice_id}/`)}
                        >
                            <p>{rowData.title}</p>
                            <p className="mt-space text-mini text-default">
                                <span>{rowData.nickname}</span>
                                <span className="ml-sm">{Utils.lastDate(rowData.ctime)}</span>
                            </p>
                        </List.Item>
                    )}
                />
            </div>
        );
    } 
};