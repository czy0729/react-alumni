/**
 * 分享页
 * @Date: 2017-03-29 02:10:40
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-29 03:02:25
 */
'use strict';

import React from 'react';
import Qrcode from 'qrcode.react';
import { $alumni } from 'stores';
import { Spin, Img } from 'components';
import './index.less';

const prefixCls = 'pages-index__share';

export default class IndexShare extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
		$alumni.fetch({
			alumni_id: this.alumni_id,
		});
    }

    get alumni_id() {
        return this.props.params.alumni_id;
    }

    get data() {
    	return {
    		alumni: $alumni.getStateById(this.alumni_id),
    	}
    }

    render() {
    	const { alumni } = this.data;

        return (
            <Spin 
            	className={prefixCls}
            	spinning={Utils.isSpinning(this.data)}
            >
            	<div className={`${prefixCls}__qr`}>
            		<Qrcode
	                    value={`${Const.web}${Const.router.auth({ 
	                    	alumni_id: this.alumni_id,
	                    })}`}
	                    size={340}
	                />
            	</div>
            	<div className={`${prefixCls}__detail`}>
                	<Img src={alumni.logo} style={{ borderRadius: '50%' }} />
            		<p className="mt-sm">{alumni.name}</p>
            		<p className="mt-sm text-sm text-default">扫一扫二维码，加入该校友录</p>
        		</div>
            </Spin>
        );
    } 
};