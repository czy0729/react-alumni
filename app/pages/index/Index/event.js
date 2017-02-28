/**
 * 校友录管理中心
 * @version 170210 1.0
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $alumni } from 'stores';
import { Tabs, Icon } from 'antd-mobile';
import { Page } from 'components';
import './index.less';

const prefixCls = 'pages-index__index';
const TabPane = Tabs.TabPane;

@observer
export default class IndexIndex extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        $alumni.fetch({ alumni_id: this.alumni_id });
    }

    get alumni_id() {
        return this.props.alumni_id;
    }

    render() {
        const data = $alumni.getById(this.alumni_id);

        return (
            <div>event</div>
        );
    } 
};