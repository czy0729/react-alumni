/**
 * TabPane 用户列表
 * @Date: 2017-02-10 21:57:25
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-31 08:19:01
 */
'use strict';

import React from 'react';
import { Icon, SearchBar, List } from 'antd-mobile';
import { Img, AppListView } from 'components';

const prefixCls = 'pages-index__index__member';

export default class IndexIndexMember extends React.Component {
    constructor() {
        super();

        this.state = {
            search: '',
        };
        Utils.binds(this, ['handleChange', 'doSearch']);
    }

    handleChange(value) {
        this.setState({
            search: value,
        });
    }

    doSearch(item) {
        const { search } = this.state;

        if (search == '') return true;

        //昵称
        if (item.nickname.indexOf(search) !== -1) return true;

        //地区
        if (item.area.indexOf(search) !== -1) return true;

        //入读年份
        if (item.attend_middle_school_date.indexOf(search) !== -1) return true;
        
        //入读年级
        if (Const.getOptionLabel('middle_attend_grade', item.middle_attend_grade).indexOf(search) !== -1) return true;
        
        //班级
        if (item.middle_class.indexOf(search) !== -1) return true;

        return false;
    }

    render() {
        const { alumni_id, user_list = { data: [] } } = this.props;

        const ds = [];
        const section = [];
        
        user_list.data.forEach((item) => {
            section.push({
                title: item.name,
                filter: (i) => i._name == item.name,
            });

            item.data.forEach((i) => {
                //过滤结果
                if (this.doSearch(i)) {
                    ds.push({
                        ...i,
                        _name: item.name,
                    });
                }
            });
        });

        return (
            <div>
                <SearchBar
                    placeholder="搜索"
                    onChange={this.handleChange}
                />

                <AppListView
                    data={ds}
                    loaded={user_list.loaded}
                    section={section}
                    renderSectionHeader={(sectionData) => <div>{sectionData}</div>}
                    renderRow={(rowData, sectionID, rowID) => (
                        <List.Item 
                            key={`${sectionID}-${rowID}`}
                            extra={
                                <div className="pull-right flex-align-center">
                                    <Icon type={require('svg/location.svg')} className="text-14 text-primary" />
                                    <span className="ml-sm text-14">{rowData.area}</span>
                                </div>
                            }
                            onClick = {() => Utils.router.push(
                                Const.router.user_detail({
                                    alumni_id,
                                    user_id: rowData.user_id,
                                })
                            )}
                        >
                            <div className="flex-align-center">
                                <Img src={rowData.headimgurl} />
                                <div className="ml-md">
                                    <p>
                                        <span>{rowData.nickname}</span>
                                        {rowData.back_name && <span className="ml-sm">({rowData.back_name})</span>}
                                        {rowData.is_manager == Const.is_manager.yes && <span className="ml-md text-default text-mini">管理员</span>}
                                    </p>
                                    <p className="mt-sm text-14 text-default">
                                        <span>{rowData.attend_middle_school_date}届</span>
                                        <span className="ml-xs">{Const.getOptionLabel('middle_attend_grade', rowData.middle_attend_grade)}</span>
                                        <span className="ml-xs">{rowData.middle_class.replace('班', '')}班</span>
                                    </p>
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        );
    } 
};