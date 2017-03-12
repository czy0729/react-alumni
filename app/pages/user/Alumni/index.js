/**
 * 我的校友录列表
 * @version 170228 1.0
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $alumni } from 'stores';
import { SearchBar, List } from 'antd-mobile';
import { Img, AppListView } from 'components';
import { section } from './ds';

const prefixCls = 'pages-user__alumni';

@observer
export default class UserAlumni extends React.Component {
    constructor() {
        super();

        this.state = {
            search: '',
        };
        Utils.binds(this, ['handleChange', 'handleItemClick', 'onSearch']);
    }

    componentDidMount() {
        $alumni.fetch_list();
    }

    handleChange(value) {
        this.setState({
            search: value,
        });
    }

    handleItemClick({ status, alumni_id }) {
        switch (parseInt(status)) {
            //(2/4)
            case Const.alumni_list_status.new:
                Utils.router.push({
                    pathname: Const.router.admin_auth_fields({ alumni_id }),
                    query: {
                        from: 'add_alumni',
                    },
                });
                break;

            //(3/4)
            case Const.alumni_list_status.auth:
                Utils.router.push({
                    pathname: Const.router.admin_auth_show({ alumni_id }),
                    query: {
                        from: 'add_alumni',
                    },
                });
                break;

            //(4/4)
            case Const.alumni_list_status.show:
                Utils.router.push({
                    pathname: Const.router.auth({ alumni_id }),
                    query: {
                        from: 'add_alumni',
                    },
                });
                break;

            //完成创建的
            case Const.alumni_list_status.finish:
                Utils.router.push(Const.router.index({ alumni_id }));
                break;
        }
    }

    onSearch(item) {
        const { search } = this.state;

        if (search == '') return true;

        //校友录名称
        if (item.name.indexOf(search) !== -1) return true;

        //学校名称
        if (item.school_name.indexOf(search) !== -1) return true;

        return false;
    }

    renderExtra(status) {
        let info;

        switch (parseInt(status)) {
            case Const.alumni_list_status.new:
                info = '未完成(1/4)';
                break;

            case Const.alumni_list_status.auth:
                info = '未完成(2/4)';
                break;

            case Const.alumni_list_status.show:
                info = '未完成(3/4)';
                break;

            default: 
                return null;
                break;
        }

        return <div className="text-mini">{info}</div>
    }

    render() {
        const { data = [] } = $alumni.state.list;
        const ds = data.filter(this.onSearch);

        return (
            <div className={prefixCls}>
                {/*搜索栏*/}
                <SearchBar
                    placeholder="搜索"
                    focused
                    onChange={this.handleChange}
                />

                {/*列表*/}
                <AppListView
                    data={ds}
                    section={section}
                    renderSectionHeader={(sectionData) => <div>{sectionData}</div>}
                    renderRow={(rowData, sectionID, rowID) => (
                        <List.Item
                            extra={this.renderExtra(rowData.status)}
                            onClick={rowData.type != Const.alumni_list_type.not_auth && this.handleItemClick.bind(this, rowData)}
                        >
                            <div className="flex-align-center">
                                <Img src={rowData.logo} empty={Const.img} />
                                <div className="ml-md">
                                    <p>{rowData.name}</p>
                                    <p className="mt-sm text-sm text-default">{rowData.school_name}</p>
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        );
    } 
};