/**
 * listView
 * @version 170208 1.0
 * @version 170217 1.1 [+]变得可以不传section
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import { ListView } from 'antd-mobile';
import './index.less';

const prefixCls = 'components__app-list-view';

export default class AppListView extends React.Component {
    static defaultProps = {
        data: [],
        section: [{
            _noSection: true,
            title: '',
            filter: (item) => 1,
        }],
        renderSectionHeader: (sectionData) => null,
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

        this.state = {
            dataSource: this.createDs(props.data, props.section),
        };
        Utils.binds(this, ['onEndReached']);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.createDs(nextProps.data, nextProps.section),
        });
    }

    onEndReached(event) {

    }

    render(){
        const { className, section, data, ...other } = this.props;
        const state = this.state;

        return (
            <ListView.IndexedList
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
            />
        );
    }
};

/*
style={{ height: '95vh', overflow: 'auto' }}
delayTime={10}
delayActivityIndicator={<div style={{ padding: 25, textAlign: 'center' }}>渲染中...</div>}
*/