/**
 * 管理员列表
 * @version 170208 1.0
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $admin } from 'stores';
import { Button } from 'antd-mobile';
import { Img, ButtonWrap, AppListView, AppSwipeActionItem } from 'components';
import { section } from './ds';

const prefixCls = 'pages-admin__list';

@observer
export default class AdminList extends React.Component {
    constructor() {
        super();

        Utils.binds(this, ['doCancel']);
    }

    componentDidMount() {
        $admin.fetch({ alumni_id: this.alumni_id });
    }

    doCancel(user_id) {
        $admin.auth({
            alumni_id: this.alumni_id,
            user_id,
            is_manager: 0,
        });
    }

    get alumni_id() {
        return this.props.params.alumni_id;
    }

    render() {
        const data = $admin.getById(this.alumni_id);

        return (
            <div className={prefixCls}>
                <AppListView
                    data={data.data}
                    section={section}
                    renderSectionHeader={(sectionData) => <div>{sectionData}</div>}
                    renderRow={(rowData, sectionID, rowID) => (
                        <AppSwipeActionItem
                            key={rowID}
                            right={[{
                                text: '取消授权',
                                onPress: () => Utils.onConfirm('确定取消授权？', this.doCancel.bind(this, rowData.user_id)),
                                style: {
                                    backgroundColor: Const.ui.color_danger,
                                    color: '#fff'
                                },
                            }]}
                            disabled={rowData.is_creater == Const.is_creater.yes}
                        >
                            <div className="flex-align-center">
                                <Img src={rowData.headimgurl} />
                                <span className="ml-md">{rowData.real_name}</span>
                            </div>
                        </AppSwipeActionItem>
                    )}
                />

                <ButtonWrap>
                    <a href={`#/${this.alumni_id}/center`}>
                        <Button>添加管理员</Button>
                    </a>
                </ButtonWrap>
            </div>
        );
    } 
};