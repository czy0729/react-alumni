/**
 * 名片库
 * @Date: 2017-03-30 15:16:44
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-31 09:45:41
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $user } from 'stores';
import { SearchBar } from 'antd-mobile';
import { Spin, Img, AppListView, AppSwipeActionItem } from 'components';

const prefixCls = 'pages-user__cards';

@observer
export default class UserCards extends React.Component {
    constructor() {
        super();

        this.state = {
            search: '',
        };
        Utils.binds(this, ['handleChange', 'doSearch']);
    }

    componentDidMount() {
        $user.fetch_cards();
    }

    handleChange(value) {
        this.setState({
            search: value,
        });
    }

    doSearch(item) {
        const { search } = this.state;

        if (search == '') return true;

        //真实姓名
        if (item.real_name.indexOf(search) !== -1) return true;

        //备注
        if (item.back_name.indexOf(search) !== -1) return true;

        return false;
    }

    get data() {
        return {
            user_cards: $user.getState('cards'),
        };
    }

    render() {
        const { user_cards } = this.data;

        const data = [];
        const section = [];
        user_cards.data && user_cards.data.forEach((item) => {
            section.push({
                title: item.name,
                filter: (i) => i.alumni_id === item.alumni_id,
            });

            item.data.forEach((i) => {
                if (this.doSearch(i)) {
                    data.push({
                        ...i,
                        alumni_id: item.alumni_id,
                    });
                }
            });
        });

        return (
            <Spin 
                className={prefixCls}
                spinning={Utils.isSpinning(this.data)}
            >
                <SearchBar
                    placeholder="搜索"
                    onChange={this.handleChange}
                />

                <AppListView
                    data={data}
                    section={section}
                    renderSectionHeader={(sectionData) => <div>来自 "{sectionData}"</div>}
                    renderRow={(rowData, sectionID, rowID) => (
                        <AppSwipeActionItem
                            key={rowID}
                            arrow="horizontal"
                            right={[{
                                text: '打电话',
                                onPress: () => Utils.onConfirm(
                                    `${rowData.mobile}，确定拨号？`, 
                                    () => {
                                        window.location = `tel:${rowData.mobile}`
                                    }
                                ),
                                style: {
                                    backgroundColor: Const.ui.color_primary,
                                    color: '#fff'
                                },
                            }]}
                            onClick={(e) => Utils.router.push(
                                Const.router.user_detail({
                                    alumni_id: rowData.alumni_id,
                                    user_id: rowData.user_id,
                                })
                            )}
                        >
                            <div className="flex-align-center">
                                <Img src={rowData.headimgurl} />
                                <span className="ml-md">{rowData.real_name}</span>
                                {rowData.back_name && <span className="ml-sm text-sm text-default">({rowData.back_name})</span>}
                            </div>
                        </AppSwipeActionItem>
                    )}
                />
            </Spin>
        );
    } 
};