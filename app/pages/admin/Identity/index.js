/**
 * 身份管理
 * @Date: 2017-02-12 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-31 04:41:06
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $identity } from 'stores';
import { Button } from 'antd-mobile';
import { Spin, Img, ButtonWrap, AppListView, AppSwipeActionItem } from 'components';

const prefixCls = 'pages-admin__identity';

@observer
export default class AdminIdentity extends React.Component {
    constructor() {
        super();

        Utils.binds(this, ['init', 'doAdd', 'doUpdate', 'doDelete']);
    }

    componentDidMount() {
        this.init();
    }

    init() {
        $identity.fetch({ alumni_id: this.alumni_id });
    }

    async doAdd(name) {
        await $identity.add({
            alumni_id: this.alumni_id,
            name,
        });

        Utils.onSuccess();
        this.init();
    }

    async doUpdate(name, identity_type_id) {
        await $identity.update({
            alumni_id: this.alumni_id,
            identity_type_id,
            name,
        });

        Utils.onSuccess();
        this.init();
    }

    async doDelete(identity_type_id) {
        await $identity.delete({
            alumni_id: this.alumni_id,
            identity_type_id,
        });

        Utils.onSuccess();
        this.init();
    }

    get alumni_id() {
        return this.props.params.alumni_id;
    }

    get data() {
        return {
            identity: $identity.getStateById(this.alumni_id),
        };
    }

    render() {
        const { identity } = this.data;

        return (
            <Spin 
                className={prefixCls}
                spinning={Utils.isSpinning(this.data)}
            >
                <AppListView
                    data={identity.data}
                    loaded={identity._loaded}
                    renderRow={(rowData, sectionID, rowID) => (
                        <AppSwipeActionItem
                            key={rowID}
                            right={[{
                                text: '重命名',
                                onPress: () => Utils.onPrompt('重命名身份', 
                                    (value) => this.doUpdate(value, rowData.identity_type_id), rowData.name
                                ),
                                style: {
                                    backgroundColor: Const.ui.color_warning,
                                    color: '#fff'
                                },
                            }, {
                                text: '删除',
                                onPress: () => Utils.onConfirm('确定删除？', 
                                    () => this.doDelete(rowData.identity_type_id)
                                ),
                                style: {
                                    backgroundColor: Const.ui.color_danger,
                                    color: '#fff'
                                },
                            }]}
                            extra={`${rowData.num}人`}
                        >
                            <span>{rowData.name}</span>
                        </AppSwipeActionItem>
                    )}
                />

                <ButtonWrap>
                    <Button 
                        type="primary"
                        onClick={(e) => Utils.onPrompt('添加身份', this.doAdd)}
                    >
                        添加身份
                    </Button>
                </ButtonWrap>
            </Spin>
        );
    } 
};