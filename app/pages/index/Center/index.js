/**
 * 校友录管理中心
 * @version 170210 1.0
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $alumni } from 'stores';
import { Grid, Icon, Badge } from 'antd-mobile';
import { menuDS } from './ds';
import './index.less';

const prefixCls = 'pages-index__center';

@observer
export default class Center extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        $alumni.fetch({ alumni_id: this.alumni_id });
    }

    get alumni_id() {
        return this.props.params.alumni_id;
    }

    render() {
        const data = $alumni.getById(this.alumni_id);

        return (
            <div className={prefixCls}>
                <div className={`${prefixCls}__head`}>
                    <p className={`${prefixCls}__head_name`}>{data.school_name}</p>
                    <p className={`${prefixCls}__head_desc`}>
                        <span>总成员</span>
                        <Badge text={data.total_num} />
                        <span className="ml-xl">管理员</span>
                        <Badge text={data.manager_num} />
                    </p>
                </div>
                
                <Grid 
                    columnNum={3}
                    data={menuDS.filter((item) => item.filter(data.user_type))}
                    renderItem={(item) => (
                        <a 
                            className={`${prefixCls}__item`}
                            href={`#${item.href({ alumni_id: this.alumni_id })}`}
                        >
                            <Icon type={item.icon} />
                            <p>{item.label}</p>
                        </a>
                    )}
                />
            </div>
        );
    } 
};