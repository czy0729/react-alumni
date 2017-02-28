/**
 * 用户详情
 * @version 170222 1.0
 */
'use strict';

import React from 'react';
import { observer } from 'decorators';
import { $alumni, $user, $admin } from 'stores';
import { List, Button, Icon, Switch } from 'antd-mobile';
import { Page, Img, Permission, ButtonWrap } from 'components';

const prefixCls = 'pages-index__user-detail';
const Item = List.Item;

@observer
export default class UserDetail extends React.Component {
    constructor() {
        super();

        Utils.binds(this, ['initFetch', 'doExchangeCard', 'doSetAdmin', 'doSetBlack', 'doDelete', 'doQuit']);
    }

    componentDidMount() {
    	this.initFetch();
    }

    initFetch() {
        $user.fetch_detail({ 
            alumni_id: this.alumni_id,
            user_id: this.user_id,
        });
    }

    /*==================== action ====================*/
    //交换名片
    async doExchangeCard() {
        await $user.exchange_card({
            alumni_id : this.alumni_id,
            user_id   : this.user_id,
        });

        Utils.onSuccess();
        this.initFetch();
    }

    async doSetBackName() {

    }

    //设为管理员
    async doSetAdmin(checked) {
        await $admin.auth({
            alumni_id  : this.alumni_id,
            user_id    : this.user_id,
            is_manager : checked ? Const.is_manager.yes : Const.is_manager.no,
        });

        Utils.onSuccess();
        this.initFetch();
    }

    //加入黑名单
    async doSetBlack(checked) {
        await $user.set_black({
            alumni_id : this.alumni_id,
            user_id   : this.user_id,
            status    : checked ? Const.do_set_black_status.yes : Const.do_set_black_status.no,
        });

        Utils.onSuccess();
        this.initFetch();
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
        Utils.router.replace(Const.router.user_alumni_list());
    }

    /*==================== get ====================*/
    get alumni_id() {
        return this.props.params.alumni_id;
    }

    get user_id() {
        return this.props.routeParams.user_id;
    }

    //用户详情
    get user_detail() {
        const pk = `${this.alumni_id}-${this.user_id}`;

        return $user.getById(pk, 'detail');
    }

    get alumni_info() {
        return $alumni.getById(this.alumni_id);
    }

    /*==================== render ====================*/
    renderHead() {
        const data = this.user_detail;

        const renderHeadTopRightBtn = () => {
            
        };

        return (
            <List className="mt-distance">
                <Item extra={
                    <Button 
                        type="primary" 
                        size="small" 
                        style={{ width: '1.6rem' }}
                        onClick={() => Utils.onConfirm('确定向对方发出交换名片的请求？', this.doExchangeCard)}
                    >
                        交换名片
                    </Button>
                }>
                    <div className="flex-align-center">
                        <Img src={data.headimgurl} />
                        <p className="ml-md">
                            <span>{data.nickname}</span>
                        </p>
                    </div>
                </Item>
            </List>
        );
    }

    renderDetail() {
        const data = this.user_detail;
        const _data = { ...data };

        delete _data.nickname;

        return (
            <div>
                {
                    Utils.generateFieldsConfig(_data).map((item, index) => (
                        <List 
                            key={Const.fileds_group[index]}
                            renderHeader={() => <div>{Const.fileds_group[index]}</div>}
                        >
                            {
                                item.map((i, idx) => {
                                    const is_hidden = i[1] == '(交换名片后可见)'; //是否隐藏
                                    const is_format = i[5] && i[5].format;        //是否需要取中文值
                                    const is_tel    = i[5] && i[5].tel;           //是否显示打电话图标

                                    return (
                                        <Item
                                            key={i[0]}
                                            onClick={!is_hidden && is_tel ? () => window.location = `tel:${i[1]}` : undefined}
                                        >
                                            <label className="tool-label">{i[2]}</label>
                                            {
                                                is_hidden
                                                  ? <span className="text-mini text-default">(交换名片后可见)</span>
                                                  : is_format
                                                      ? <span>{Const.getOptionLabel(i[5].format, i[1])}</span>
                                                      : <span>{i[1]}</span>
                                            }
                                            {!is_hidden && is_tel && <Icon className="pull-right text-default" type="mobile" />}
                                        </Item>
                                    );
                                })
                            }
                        </List>
                    ))
                }
            </div>
        );
    }

    renderControl() {
        const data = this.user_detail;

        const is_manager = data.is_manager == Const.is_manager.yes;
        const is_creater = data.is_creater == Const.is_creater.yes;
        const is_black   = data.status == Const.user_detail_status.yes;
        const is_self    = data.type == Const.user_detail_type.self;

        return (
            <List renderHeader={() => <div>操作</div>}>
                <Item arrow="horizontal">
                    <label className="tool-label">设置身份</label>
                </Item>
                <Item extra={
                    /*因为Switch的`disabled`阻止了冒泡，只能套一层来实现不允许操作时点击弹出提示的功能*/
                    <div 
                        onClick={is_creater ? () => Utils.onAlert('创建者不能取消管理员') : undefined}
                        style={{ opacity: is_creater ? .4 : 1 }}
                    >
                        <Switch 
                            checked={is_manager}
                            onChange={is_creater ? undefined : this.doSetAdmin}
                        />
                    </div>
                }>
                    设为管理员
                </Item>
                <Item extra={
                    <div 
                        onClick={is_self ? () => Utils.onAlert('不能把自己加入黑名单') : undefined}
                        style={{ opacity: is_self ? .4 : 1 }}
                    >
                        <Switch 
                            checked={is_black}
                            onChange={is_self ? undefined : this.doSetBlack}
                        />
                    </div>
                }>
                    加入黑名单
                </Item>
            </List>
        );
    }

    renderDelete() {
        const data = this.user_detail;

        return (
            <ButtonWrap>
                <br />
                <p 
                    className="text-center text-danger"
                    onClick={() => Utils.onConfirm('确定删除？', this.doDelete)}
                >
                    删除该成员
                </p>
            </ButtonWrap>
        );
    }

    renderQuit() {
        return (
            <ButtonWrap>
                <br />
                <p 
                    className="text-center text-danger"
                    onClick={() => Utils.onConfirm('确定退出？', this.doQuit)}
                >
                    退出校友录
                </p>
            </ButtonWrap>
        );
    }
 
    render() {
        //这里要注意Permission的值，他(用户)和我(操作人)的不同
        const user = this.user_detail;
        const self = this.alumni_info;

        return (
            <Page className={prefixCls}>
                {this.renderHead()}
                {this.renderDetail()}

                {/*①我是管理员*/}
                <Permission
                    rules={[{
                        condition : [Const.user_type.super, Const.user_type.admin],
                        value     : self.user_type,
                    }]}
                >
                    {this.renderControl()}
                </Permission>
                
                {/*①我是超级管理员 且②他不是我*/}
                <Permission
                    rules={[{
                        condition : [Const.user_type.super],
                        value     : self.user_type,
                    }, {
                        condition : [Const.user_detail_type.self],
                        type      : 'not',
                        value     : user.type,
                    }]}
                >
                    {this.renderDelete()}
                </Permission>

                {/*①他是我 且②我不是超级管理员*/}
                <Permission
                    rules={[{
                        condition : [Const.user_detail_type.self],
                        value     : user.type,
                    }, {
                        condition : [Const.user_type.super],
                        type      : 'not',
                        value     : self.user_type,
                    }]}
                >
                    {this.renderQuit()}
                </Permission>
            </Page>
        );
    } 
};