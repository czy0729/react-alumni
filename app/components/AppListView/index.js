/**
 * AppListView
 * 
 * 17-02-17 变得可以不传section
 * 17-03-17 数组为空时渲染提示为空
 * 
 * @Date: 2017-02-02 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-31 04:45:54
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import { ListView } from 'antd-mobile';
import AppResult from '../AppResult';
import './index.less';

const prefixCls = 'components__app-list-view';
const defaultSection = [{
    _noSection: true,
    title: '',
    filter: (item) => 1,
}];
const defaultEmpty = {
    icon: require('common/svg/inbox.svg'),
    title: '空空如也',
    message: '您可能需要一些操作后才能看见数据',
};

export default class AppListView extends React.Component {
    static defaultProps = {
        data: undefined,
        section: defaultSection,
        renderSectionHeader: (sectionData) => null,
        loaded: true,
        empty: {},
    };

    constructor(props) {
        super(props);

        this.getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        this.getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
        this.dataSource = new ListView.DataSource({
            getRowData: this.getRowData,
            getSectionHeaderData: this.getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.createDs = (data, section) => {
            const dataBlob = {};
            const sectionIDs = [];
            const rowIDs = [];

            section.forEach((item, index) => {
                sectionIDs.push(item.title);
                dataBlob[item.title] = item.title;
                rowIDs[index] = [];
            });

            data.forEach((item, index) => {
                dataBlob[index] = item;

                section.forEach((i, idx) => {
                    if (i.filter(item)) {
                        rowIDs[idx].push(index);
                        return false;
                    }
                });
            });

            return this.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
        };

        const section = props.section.length == 0 ? defaultSection : props.section;
        
        this.state = {
            dataSource: this.createDs(props.data, section),
        };
        Utils.binds(this, ['onEndReached']);
    }

    componentWillReceiveProps(nextProps) {
        const section = nextProps.section.length == 0 ? defaultSection : nextProps.section;
        
        this.setState({
            dataSource: this.createDs(nextProps.data, section),
        });
    }

    onEndReached(event) {

    }

    render(){
        const { className, data, loaded, empty, ...other } = this.props;
        let { section } = this.props;
        const state = this.state;

        if (section.length === 0) section = defaultSection;

        return loaded && data.length === 0
          ? <AppResult {...{...defaultEmpty, ...empty}} />

          : <ListView.IndexedList
                ref="listView"
                className={classNames(prefixCls, className, {
                    [`${prefixCls}_no-section`]: section[0]._noSection,
                })}
                dataSource={state.dataSource}
                stickyHeader
                stickyProps={{ stickyStyle: { zIndex: 999 } }}
                quickSearchBarStyle={{ display: 'none' }}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
                {...other}
            />;
    }
};