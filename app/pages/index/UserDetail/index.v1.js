/**
 * 用户详情
 * @version 170222 1.0
 * @version 170314 1.1 补完功能
 */
'use strict';

import React from 'react';
import { observer, form } from 'decorators';
import { $alumni, $user, $admin, $identity } from 'stores';
import { List, Button, Icon, Switch, Picker } from 'antd-mobile';
import { AvatarBlock, Permission, ButtonWrap, AppForm } from 'components';

const prefixCls = 'pages-index__user-detail';
const Item = List.Item;

@form
@observer
export default class UserDetail extends React.Component {
    constructor(props) {
        super(props);

        Utils.binds(this, [
            'refresh',
            'doExchangeCard', 'doAllowExchangeCard', 
            'doSetIdentity', 'doSetAdmin', 'doSetBlack',
            'doDelete', 'doQuit'
        ]);

        $store.set('alumni_id', props.params.alumni_id);
        $store.set('user_id', props.routeParams.user_id);
    }

    componentDidMount() {
        this.refresh();

        $identity.fetch({
            alumni_id: this.alumni_id,
        });
    }

    refresh() {
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
        this.refresh();
    }

    //同意、拒绝或取消交换名片
    async doAllowExchangeCard(status = 'resolve') {
        await $user.allow_exchange_card({
            user_id: this.user_id,
        }, status);

        Utils.onSuccess();
        this.refresh();
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
        this.refresh();
    }

    //设为管理员
    async doSetAdmin(checked) {
        await $admin.auth({
            alumni_id  : this.alumni_id,
            user_id    : this.user_id,
            is_manager : checked ? Const.is_manager.yes : Const.is_manager.no,
        });

        Utils.onSuccess();
        this.refresh();
    }

    //加入黑名单
    async doSetBlack(checked) {
        await $user.set_black({
            alumni_id : this.alumni_id,
            user_id   : this.user_id,
            status    : checked ? Const.do_set_black_status.yes : Const.do_set_black_status.no,
        });

        Utils.onSuccess();
        this.refresh();
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

        return (
            <AvatarBlock 
                src={data.headimgurl}
                extra={this.renderHeadBtn(data.type)}
            >
                <span>{data.nickname}</span>
                <span className="ml-sm text-caption-sm text-default">{data.back_name && `(${data.wx_sn})`}</span>
            </AvatarBlock>
        );
    }

    renderHeadBtn(type) {
        let config;

        switch (parseInt(type)) {
            //自己
            case Const.user_detail_type.self:
                config = {
                    onClick: () => Utils.router.push(Const.router.user_info()),
                    children: '个人中心',
                };
                break;
            
            //可交换名片
            case Const.user_detail_type.can_change:
                config = {
                    type: 'primary',
                    onClick: () => Utils.onConfirm('确定向对方发出交换名片的请求？', this.doExchangeCard),
                    children: '交换名片',
                };
                break;

            //可同意交换
            case Const.user_detail_type.can_resolve:
                config = {
                    type: 'primary',
                    onClick: () => Utils.onConfirm('确定同意交换名片？', this.doAllowExchangeCard.bind(this, 'resolve')),
                    children: '同意交换',
                };
                break;

            //待同意交换
            case Const.user_detail_type.wait_change:
                config = {
                    children: '等待对方处理',
                };
                break;

            //可取消交换
            case Const.user_detail_type.can_cancel:
                config = {
                    onClick: () => Utils.onConfirm('确定取消交换名片？', this.doAllowExchangeCard.bind(this, 'cancel')),
                    children: '收回名片',
                };
                break;

            default:
                return null;
        }

        return (
            <Button 
                size="small" 
                style={{ width: '1.8rem' }}
                {...config}
            />
        );
    }

    renderDetail() {
        const data = this.user_detail;
        const _data = { ...data };

        delete _data.nickname;
        delete _data.headimgurl;

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
                                                      ? <span>{Const.getOptionLabel(i[5].format, i[1]) || '-'}</span>
                                                      : <span>{i[1] || '-'}</span>
                                            }
                                            {!is_hidden && is_tel && i[1] && <Icon className="pull-right text-default" type="mobile" />}
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
        //用户详情
        const data = this.user_detail; 

        //用户各种状态
        const is_manager = data.is_manager == Const.is_manager.yes;
        const is_creater = data.is_creater == Const.is_creater.yes;
        const is_black   = data.status == Const.user_detail_status.yes;
        const is_self    = data.type == Const.user_detail_type.self;

        //身份DS
        const identityDS = $identity.getById(this.alumni_id).data.map((item) => ({ 
            label: item.name,
            value: item.identity_type_id,
        }));
        identityDS.unshift({
            label: '无',
            value: '',
        });
        const isIdentityEmpty = identityDS.length === 0;

        return (
            <List renderHeader={() => <div>操作</div>}>
                <Picker 
                    data={identityDS}
                    cols={1}
                    value={data.identity.length === 0 ? [''] : [data.identity[0].identity_type_id]}
                    disabled={isIdentityEmpty}
                    onChange={this.doSetIdentity}
                >
                    <Item 
                        arrow="horizontal"
                        onClick={
                            isIdentityEmpty 
                              ? () => Utils.onConfirm(
                                    '当前校友录暂无添加任何身份，是否前往添加？', 
                                    () => Utils.router.push(Const.router.admin_identity({
                                        alumni_id: this.alumni_id,
                                    }))
                                ) 
                              : undefined
                        }
                    >
                        身份
                    </Item>
                </Picker>

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
        const { alumni_id, user_id } = this;

        //这里要注意Permission的值，他(用户)和我(操作人)的不同
        const user = this.user_detail;
        const self = this.alumni_info;

        return (
            <div className={prefixCls}>
                {this.renderHead}
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
            </div>
        );
    } 
};