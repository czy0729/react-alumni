/**
 * 请求列表
 * @version 170220 1.0
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $auth } from 'stores';
import { Result, Button } from 'antd-mobile';
import { Page, Img, AppListView } from 'components';
import './index.less';

const prefixCls = 'pages-admin__auth-list';

@observer
export default class AdminAuthList extends React.Component {
    static contextTypes = {
        router: React.PropTypes.any,
    };

    constructor() {
        super();

        Utils.binds(this, ['handleSubmit']);
    }

    componentDidMount() {
        $auth.fetch_auth_list({ alumni_id: this.alumni_id });
    }

    async handleSubmit({ user_id, notice_id }, status) {
        await $auth.submit_auth({
            alumni_id: this.alumni_id,
            user_id,
            notice_id,
            status,
        });

        Utils.onSuccess();
    }

    get alumni_id() {
        return this.props.params.alumni_id;
    }

    render() {
        const { router } = this.context;
        const data = $auth.getById(this.alumni_id, 'auth_list');

        return (
            <Page className={prefixCls}>
                {/*列表*/}
                <AppListView
                    data={data.data}
                    renderRow={(rowData, sectionID, rowID) => (
                        <div>
                            <p className={`${prefixCls}__date`}>{Utils.date(rowData.ctime)}</p>
                            <Result
                                img={<Img size="1.2rem" src={rowData.headimgurl} />}
                                title={`${rowData.nickname}`}
                                message={<p>{rowData.content || '用户没有留言'}</p>}
                            />
                            <div className={`${prefixCls}__confirm`}>
                                <Button 
                                    type="ghost" 
                                    onClick={this.handleSubmit.bind(this, rowData, Const.auth_status.resolve)}
                                >
                                    同意
                                </Button>
                                <Button 
                                    onClick={() => Utils.onConfirm('确定拒绝校友申请？', 
                                        this.handleSubmit.bind(this, rowData, Const.auth_status.reject))}
                                >
                                    拒绝
                                </Button>
                            </div>
                        </div>
                    )}
                    renderSeparator={(sectionID, rowID) => <div key={`${sectionID}-${rowID}`} className="tool-separator" />}
                />
            </Page>
        );
    } 
};