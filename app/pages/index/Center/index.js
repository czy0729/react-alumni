/**
 * 校友录管理中心
 * @Date: 2017-02-10 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-22 05:30:08
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $alumni } from 'stores';
import { Grid, Icon, Badge } from 'antd-mobile';
import { Spin } from 'components';
import { menuDS } from './ds';
import './index.less';

const prefixCls = 'pages-index__center';

@observer
export default class IndexCenter extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        $alumni.fetch({ alumni_id: this.alumni_id });
    }

    get alumni_id() {
        return this.props.params.alumni_id;
    }

    get data() {
        return {
            alumni: $alumni.getStateById(this.alumni_id),
        };
    }

    render() {
        const { alumni } = this.data;

        return (
            <Spin 
                className={prefixCls}
                spinning={Utils.isSpinning(this.data)}
            >
                <div className={`${prefixCls}__head`}>
                    <p className={`${prefixCls}__head_name`}>{alumni.school_name}</p>
                    <p className={`${prefixCls}__head_desc`}>
                        <span>总成员 {alumni.total_num}</span>
                        <span className="ml-xl">管理员 {alumni.manager_num}</span>
                    </p>
                </div>
                
                <Grid 
                    columnNum={3}
                    data={menuDS.filter((item) => item.filter(alumni.user_type))}
                    renderItem={(item) => (
                        <a 
                            className={`${prefixCls}__item`}
                            href={`#${item.href({ alumni_id: this.alumni_id })}`}
                        >
                            <Icon type={item.icon} size="lg" />
                            <p>{item.label}</p>
                        </a>
                    )}
                />
            </Spin>
        );
    } 
};