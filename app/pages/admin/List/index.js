/**
 * 管理员列表
 * @Date: 2017-02-28 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-31 04:41:42
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $admin } from 'stores';
import { Button } from 'antd-mobile';
import { Spin, Img, ButtonWrap, AppListView, AppSwipeActionItem } from 'components';
import { section } from './ds';

const prefixCls = 'pages-admin__list';

@observer
export default class AdminList extends React.Component {
    constructor() {
        super();

        Utils.binds(this, ['init', 'doCancel']);
    }

    componentDidMount() {
        this.init();
    }

    init() {
        $admin.fetch({
            alumni_id: this.alumni_id,
        });
    }

    async doCancel(user_id) {
        await $admin.auth({
            alumni_id: this.alumni_id,
            user_id,
        }, 'no');

        this.init();
    }

    get alumni_id() {
        return this.props.params.alumni_id;
    }

    get data() {
        return {
            admin: $admin.getStateById(this.alumni_id),
        };
    }

    render() {
        const { admin } = this.data;

        return (
            <Spin 
                className={prefixCls}
                spinning={Utils.isSpinning(this.data)}
            >
                <AppListView
                    data={admin.data}
                    loaded={admin._loaded}
                    section={section}
                    renderSectionHeader={(sectionData) => <div>{sectionData}</div>}
                    renderRow={(rowData, sectionID, rowID) => (
                        <AppSwipeActionItem
                            key={rowID}
                            right={[{
                                text: '取消授权',
                                onPress: () => Utils.onConfirm('确定取消授权？', 
                                    () => this.doCancel(rowData.user_id)
                                ),
                                style: {
                                    backgroundColor: Const.ui.color_danger,
                                    color: '#fff',
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
                    <Button 
                        type="primary"
                        onClick={() => Utils.router.push(
                            Const.router.index({ 
                                alumni_id: this.alumni_id
                            })
                        )}
                    >
                        添加管理员
                    </Button>
                </ButtonWrap>
            </Spin>
        );
    } 
};