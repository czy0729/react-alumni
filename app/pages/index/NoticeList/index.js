/**
 * 通知列表
 * @Date: 2017-02-17 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-22 06:13:17
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $notice, $alumni } from 'stores';
import { List, Button } from 'antd-mobile';
import { Spin, Permission, ButtonWrap, AppListView } from 'components';
import './index.less';

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

    renderItem(rowData, sectionID, rowID) {
        const title = Utils.getHackImgData(rowData.title);

        return (
            <div 
                className={`${prefixCls}__item`}
                onClick={() => Utils.router.push(
                    Const.router.notice({
                        alumni_id: this.alumni_id,
                        notice_id: rowData.notice_id,
                    })
                )}
            >
                {title[1] && <span className={`${prefixCls}__item_thumbnail`} style={{ backgroundImage: `url(${Utils.getImgUrl(title[1])})` }} />}
                <p className={`${prefixCls}__item_detail`}>
                    <span>{rowData.nickname}</span>
                    <span className="ml-sm text-default">{Utils.lastDate(rowData.ctime)}{rowData.date}</span>
                </p>
                <p className={`${prefixCls}__item_title`}>{title[0]}</p>
            </div>
        );
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
                    renderRow={(rowData, sectionID, rowID) => this.renderItem(rowData, sectionID, rowID)}
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