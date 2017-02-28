/**
 * 校友录管理中心
 * @version 170210 1.0
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $user } from 'stores';
import { Icon, SearchBar, List } from 'antd-mobile';
import { Page, Img, AppListView } from 'components';
import './index.less';

const prefixCls = 'pages-index__index__member';

@observer
export default class IndexMember extends React.Component {
    static contextTypes = {
        router: React.PropTypes.any,
    };

    constructor() {
        super();

        this.state = {
            search: '',
        };
        Utils.binds(this, ['handleChange', 'doSearch']);
    }

    componentDidMount() {
        $user.fetch_list({ alumni_id: this.alumni_id });
    }

    handleChange(value) {
        this.setState({
            search: value,
        });
    }

    //过滤字段
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

    get alumni_id() {
        return this.props.alumni_id;
    }

    render() {
        const { router } = this.context;
        const { data = [] } = $user.getById(this.alumni_id, 'list');
        
        const ds = [];
        const section = [];
        
        data.forEach((item) => {
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
                {/*搜索栏*/}
                <SearchBar
                    placeholder="搜索"
                    focused
                    onChange={this.handleChange}
                />

                {/*用户列表*/}
                <AppListView
                    data={ds}
                    section={section}
                    renderSectionHeader={(sectionData) => <div>{sectionData}</div>}
                    renderRow={(rowData, sectionID, rowID) => (
                        <List.Item 
                            key={`${sectionID}-${rowID}`}
                            extra={
                                <div>
                                    <Icon type="environment-o" className="text-14 text-primary" />
                                    <span className="ml-sm text-14">{rowData.area}</span>
                                </div>
                            }
                            onClick = {() => router.push(
                                Const.router.user_detail({
                                    alumni_id: this.alumni_id,
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
                                        {rowData.is_manager == Const.is_manager.yes && <Icon type="user" className="ml-sm text-primary" />}
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