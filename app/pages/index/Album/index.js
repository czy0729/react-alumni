/**
 * 相册
 * @Date: 2017-03-24 22:15:32
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-27 06:44:00
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $alumni, $album, $popout } from 'stores';
import { Spin, Upload, Img, AppListView } from 'components';
import TweenImg from './tweenImg';
import './index.less';

const prefixCls = 'pages-index__album';

@observer
export default class IndexAlbum extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const { alumni_id } = this;

        $alumni.fetch({ alumni_id });
        $album.fetch({ alumni_id });

        Utils.binds(this, ['handleImgClick']);
    }

    componentWillUnmount() {
        $popout.hide();
    }

    handleImgClick(rowData, sectionID, rowID) {
        const { top, left, width, height } = document.querySelector(`.pages-index__album__img-${sectionID}-${rowID}`).getBoundingClientRect();
        const ms = 400;

        $popout.showLayout(
            <TweenImg
                ms={ms}
                top={top}
                left={left}
                width={width}
                height={height}
                src={rowData.image_url}
            />,
            ms,
        );
    }

    get alumni_id() {
        return this.props.params.alumni_id;
    }

    get data() {
        const { alumni_id } = this;

        return {
            alumni: $alumni.getStateById(alumni_id),
            album: $album.getStateById(alumni_id),
        };
    }

    render() {
        const data = this.data.album.data || [];
        const section = [];
        const temp = {};

        data.forEach((item) => {
            const date = Utils.date('Y-m-d', item.ctime);

            if (!temp[date]) {
                temp[date] = true;

                section.push({
                    title: date,
                    filter: (item) => Utils.date('Y-m-d', item.ctime) === date,
                });
            }
        });

        return (
            <Spin 
                className={prefixCls}
                spinning={Utils.isSpinning(this.data)}
            >
                <div className={`${prefixCls}__upload`}>
                    <Upload />
                </div>
                <AppListView
                    loaded={album._loaded}
                    data={data}
                    section={section}
                    renderSectionHeader={(sectionData) => <div>{sectionData}</div>}
                    renderRow={(rowData, sectionID, rowID) => (
                        <Img 
                            className={`${prefixCls}__img ${prefixCls}__img-${sectionID}-${rowID}`}
                            src={rowData.image_url}
                            onClick={(e) => this.handleImgClick(rowData, sectionID, rowID)}
                        />
                    )}
                />
            </Spin>
        );
    } 
};