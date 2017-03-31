/**
 * 路由表 按需加载
 * @Date: 2017-03-28 22:42:00
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-29 00:17:29
 */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
//import 'whatwg-fetch';

ReactDOM.render((
    <Router history={hashHistory}>
        <Route         path="/"                    getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/app/Index')), 'app_index')}>
            <IndexRoute                            getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/user/Alumni')), 'user_alumni')}      title="我的校友录"     />

            {/*基本页面*/}
            <Route     path="add_alumni"           getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/index/AddAlumni')), 'add_alumni')}  title="新建校友录"     />
            <Route     path="result"               getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/app/Result')), 'app_result')}       title="处理结果"       />
               
            {/*基本页面 需校友录id*/}
            <Route     path="index/:alumni_id"     getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/index/App')), 'index_app')}>
                <Route path="index"                getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/index/Index')), 'index_index')}      title="校友录"         />
                <Route path="center"               getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/index/Center')), 'index_center')}     title="校友录中心"     />
                <Route path="notice_list"          getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/index/NoticeList')), 'index_notice_list')} title="通知"           />
                <Route path="notice/:notice_id"    getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/index/Notice')), 'index_notice')}     title="通知正文"       />
                <Route path="user_detail/:user_id" getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/index/UserDetail')), 'index_user_detail')} title="用户详情"       />
                <Route path="auth"                 getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/index/Auth')), 'index_auth')}       title="校友认证"       />
                <Route path="album"                getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/index/Album')), 'index_album')}      title="相册"           />
            </Route>

            {/*管理员相关页面*/}
            <Route     path="admin/:alumni_id"     getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/admin/App')), 'admin_app')}>
                <Route path="info"                 getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/admin/Info')), 'admin_info')}       title="基本信息"       />
                <Route path="list"                 getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/admin/List')), 'admin_list')}       title="管理员列表"     />
                <Route path="identity"             getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/admin/Identity')), 'admin_identity')}   title="身份管理"       />
                <Route path="notice/(:notice_id)"  getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/admin/Notice')), 'admin_notice')}     title="发布通知"       />
                <Route path="auth_manage"          getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/admin/AuthManage')), 'admin_auth_manage')} title="认证管理"       />
                <Route path="auth_list"            getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/admin/AuthList')), 'admin_auth_list')}   title="认证请求"       />
                <Route path="auth_fields"          getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/admin/AuthFields')), 'admin_auth_fields')} title="认证需填写字段" />
                <Route path="auth_show"            getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/admin/AuthShow')), 'admin_auth_show')}   title="认证后可见字段" />
            </Route>

            {/*个人相关页面*/}
            <Route     path="user"                 getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/user/App')), 'user_app')}>
                <Route path="index"                getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/user/Index')), 'user_index')}       title="个人中心"       />
                <Route path="info"                 getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/user/Info')), 'user_info')}        title="我的名片"       />
                <Route path="alumni"               getComponent={(nextState, cb) => require.ensure([], (require) => cb(null, require('pages/user/Alumni')), 'user_alumni')}      title="我的校友录"     />
            </Route>

            <Route     path="*"                    component={require('pages/app/404')}          title="404"            />
        </Route>
    </Router>
), document.getElementById('app'));