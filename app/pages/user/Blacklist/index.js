/**
 * 黑名单
 * @Date: 2017-03-31 08:37:12
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-31 09:45:49
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $user } from 'stores';
import { SearchBar, List, Button } from 'antd-mobile';
import { Spin, Img, AppListView } from 'components';

const prefixCls = 'pages-user__blacklist';

@observer
export default class UserBlacklist extends React.Component {
    constructor() {
        super();

        this.state = {
            search: '',
        };
        Utils.binds(this, ['init', 'handleChange', 'doSearch', 'doCancelBlack']);
    }

    componentDidMount() {
        this.init();
    }

    init() {
    	$user.fetch_blacklist();
    }

    handleChange(value) {
        this.setState({
            search: value,
        });
    }

    doSearch(item) {
        const { search } = this.state;

        if (search == '') return true;

        if (item.nickname.indexOf(search) !== -1) return true;

        return false;
    }

    async doCancelBlack(user_id) {
    	await $user.set_black({
    		user_id,
    	}, 'no');

    	Utils.onSuccess();
    	this.init();
    }

    get data() {
        return {
            user_blacklist: $user.getState('blacklist'),
        };
    }

    render() {
        const { user_blacklist } = this.data;

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
                	loaded={user_blacklist._loaded}
                    data={user_blacklist.data && user_blacklist.data.filter((item) => this.doSearch(item))}
                    renderRow={(rowData, sectionID, rowID) => (
                        <List.Item extra={
                        	<Button 
                        		size="small" 
                        		inline 
                        		style={{ width: '1.4rem' }}
                        		onClick={(e) => Utils.onConfirm('确定移出黑名单？', this.doCancelBlack.bind(this, rowData.user_id))}
                        	>
                        		移出
                        	</Button>
                        }>
                            <div className="flex-align-center">
                                <Img src={rowData.headimgurl} />
                                <span className="ml-md">{rowData.nickname}</span>
                            </div>
                        </List.Item>
                    )}
                />
            </Spin>
        );
    } 
};