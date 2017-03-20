/**
 * 用户详情
 * @Date: 2017-02-22 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-20 03:08:58
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $alumni, $user, $admin, $identity } from 'stores';
import { Spin, Permission } from 'components';
import { Head, Detail, Control, Delete, Quit } from './containers';

const prefixCls = 'pages-index__user-detail';

@observer
export default class IndexUserDetail extends React.Component {
    constructor() {
        super();

        Utils.binds(this, [
            'init',
            'doExchangeCard', 'doAllowExchangeCard', 
            'doSetIdentity', 'doSetAdmin', 'doSetBlack',
            'doDelete', 'doQuit',
        ]);
    }

    componentDidMount() {
        const { alumni_id } = this;

        this.init();

        $alumni.fetch({
            alumni_id,
        });
        
        $identity.fetch({
            alumni_id,
        });
    }

    init() {
        $user.fetch_detail({ 
            alumni_id: this.alumni_id,
            user_id: this.user_id,
        });
    }

    /*==================== action ====================*/
    //交换名片请求
    async doExchangeCard() {
        await $user.exchange_card({
            alumni_id : this.alumni_id,
            user_id   : this.user_id,
        });

        Utils.onSuccess();
        this.init();
    }

    //同意、拒绝或取消交换名片
    async doAllowExchangeCard(status = 'resolve') {
        await $user.allow_exchange_card({
            user_id: this.user_id,
        }, status);

        Utils.onSuccess();
        this.init();
    }

    //设置备注名字，只有交换了名片后才能设置(接口原因)
    async doSetBackName() {

    }

    //设置身份
    async doSetIdentity(identity_type_ids) {
        await $identity.set({
            alumni_id : this.alumni_id,
            user_id   : this.user_id,
            identity_type_ids,
        });

        Utils.onSuccess();
        this.init();
    }

    //设为管理员
    async doSetAdmin(checked) {
        const status = checked ? 'yes' : 'no';

        await $admin.auth({
            alumni_id: this.alumni_id,
            user_id: this.user_id,
        }, status);

        this.init();
    }

    //加入黑名单
    async doSetBlack(checked) {
        const status = checked ? 'yes' : 'no';

        await $user.set_black({
            alumni_id : this.alumni_id,
            user_id   : this.user_id,
        }, status);

        this.init();
    }

    //删除该成员
    async doDelete() {
        await $user.delete({
            alumni_id : this.alumni_id,
            user_id   : this.user_id,
        });

        Utils.onSuccess();
        Utils.router.goBack();
    }

    //退出校友录
    async doQuit() {
        await $user.quit({
            alumni_id : this.alumni_id,
        });

        Utils.onSuccess();
        Utils.router.replace(
            Const.router.user_alumni_list()
        );
    }

    /*==================== get ====================*/
    get alumni_id() {
        return this.props.params.alumni_id;
    }

    get user_id() {
        return this.props.routeParams.user_id;
    }

    get data() {
        const { alumni_id, user_id } = this;

        return {
            alumni: $alumni.getStateById(alumni_id),                         //用户详情
            detail: $user.getStateById(`${alumni_id}-${user_id}`, 'detail'), //校友录基本信息
            identity: $identity.getStateById(alumni_id),                     //身份列表
        }
    }

    /*==================== render ====================*/
    render() {
        const { alumni, detail, identity } = this.data;

        return (
            <Spin 
                className={prefixCls}
                spinning={Utils.isSpinning(this.data)}
            >
                <Head 
                    detail={detail}
                    doExchangeCard={this.doExchangeCard}
                    doAllowExchangeCard={this.doAllowExchangeCard}
                />

                <Detail detail={detail} />

                {/*这里要注意Permission的值，他(this.detail)和我(this.alumni_info)的不同*/}
                {/*①我是管理员*/}
                <Permission
                    rules={[{
                        condition : [Const.user_type.super, Const.user_type.admin],
                        value     : alumni.user_type,
                    }]}
                >
                    <Control 
                        alumni_id={this.alumni_id}
                        detail={detail}
                        identity={identity.data}
                        doSetIdentity={this.doSetIdentity}
                        doSetAdmin={this.doSetAdmin}
                        doSetBlack={this.doSetBlack}
                    />
                </Permission>
                
                {/*①我是超级管理员 且②他不是我*/}
                <Permission
                    rules={[{
                        condition : [Const.user_type.super],
                        value     : alumni.user_type,
                    }, {
                        condition : [Const.user_detail_type.self],
                        type      : 'not',
                        value     : detail.type,
                    }]}
                >
                    <Delete doDelete={this.doDelete} />
                </Permission>

                {/*①他是我 且②我不是超级管理员*/}
                <Permission
                    rules={[{
                        condition : [Const.user_detail_type.self],
                        value     : detail.type,
                    }, {
                        condition : [Const.user_type.super],
                        type      : 'not',
                        value     : alumni.user_type,
                    }]}
                >
                    <Quit doQuit={this.doQuit} />
                </Permission>
            </Spin>
        );
    } 
};