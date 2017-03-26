/**
 * 路由表
 * @Date: 2017-01-20 15:58:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-27 05:05:58
 */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
//import 'whatwg-fetch';

ReactDOM.render((
    <Router history={hashHistory}>
        <Route         path="/"                    component={require('pages/app/Index')}>
            <IndexRoute                            component={require('pages/user/Alumni')}      title="我的校友录"     />

            {/*基本页面*/}
            <Route     path="add_alumni"           component={require('pages/index/AddAlumni')}  title="新建校友录"     />
            <Route     path="result"               component={require('pages/app/Result')}       title="处理结果"       />
               
            {/*基本页面 需校友录id*/}
            <Route     path="index/:alumni_id"     component={require('pages/index/App')}>
                <Route path="index"                component={require('pages/index/Index')}      title="校友录"         />
                <Route path="center"               component={require('pages/index/Center')}     title="校友录中心"     />
                <Route path="notice_list"          component={require('pages/index/NoticeList')} title="通知"           />
                <Route path="notice/:notice_id"    component={require('pages/index/Notice')}     title="通知正文"       />
                <Route path="user_detail/:user_id" component={require('pages/index/UserDetail')} title="用户详情"       />
                <Route path="auth"                 component={require('pages/index/Auth')}       title="校友认证"       />
                <Route path="album"                component={require('pages/index/Album')}      title="相册"           />
            </Route>

            {/*管理员相关页面*/}
            <Route     path="admin/:alumni_id"     component={require('pages/admin/App')}>
                <Route path="info"                 component={require('pages/admin/Info')}       title="基本信息"       />
                <Route path="list"                 component={require('pages/admin/List')}       title="管理员列表"     />
                <Route path="identity"             component={require('pages/admin/Identity')}   title="身份管理"       />
                <Route path="notice/(:notice_id)"  component={require('pages/admin/Notice')}     title="发布通知"       />
                <Route path="auth_manage"          component={require('pages/admin/AuthManage')} title="认证管理"       />
                <Route path="auth_list"            component={require('pages/admin/AuthList')}   title="认证请求"       />
                <Route path="auth_fields"          component={require('pages/admin/AuthFields')} title="认证需填写字段" />
                <Route path="auth_show"            component={require('pages/admin/AuthShow')}   title="认证后可见字段" />
            </Route>

            {/*个人相关页面*/}
            <Route     path="user"                 component={require('pages/user/App')}>
                <Route path="index"                component={require('pages/user/Index')}       title="个人中心"       />
                <Route path="info"                 component={require('pages/user/Info')}        title="我的名片"       />
                <Route path="alumni"               component={require('pages/user/Alumni')}      title="我的校友录"     />
            </Route>

            <Route     path="*"                    component={require('pages/app/404')}          title="404"            />
        </Route>
    </Router>
), document.getElementById('app'));