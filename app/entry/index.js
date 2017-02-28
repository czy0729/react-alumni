/**
 * 入口
 * @version 170120 1.0
 */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import 'whatwg-fetch';

ReactDOM.render((
	<Router history={hashHistory}>
		<Route         path="/"                    component={require('pages/app/Index')}>
			<Route     path=":alumni_id"           component={require('pages/index/App')}>
				<IndexRoute                        component={require('pages/index/Index')}       title="我的校友录"     />
				<Route path="center"               component={require('pages/index/Center')}      title="校友录中心"     />
				<Route path="notice_list"          component={require('pages/index/NoticeList')}  title="通知"           />
				<Route path="notice/:notice_id"    component={require('pages/index/Notice')}      title="通知正文"       />
				<Route path="user_detail/:user_id" component={require('pages/index/UserDetail')}  title="用户详情"       />
			</Route>
			<Route     path=":alumni_id/admin"     component={require('pages/admin/App')}>
				<Route path="info"                 component={require('pages/admin/Info')}        title="基本信息"       />
				<Route path="list"                 component={require('pages/admin/List')}        title="管理员列表"     />
				<Route path="identity"             component={require('pages/admin/Identity')}    title="身份管理"       />
				<Route path="notice/:notice_id"    component={require('pages/admin/Notice')}      title="发布通知"       />
				<Route path="auth_manage"          component={require('pages/admin/AuthManage')}  title="认证管理"       />
				<Route path="auth_list"            component={require('pages/admin/AuthList')}    title="认证请求"       />
				<Route path="auth_fields"          component={require('pages/admin/AuthFields')}  title="认证需填写字段" />
				<Route path="auth_show"            component={require('pages/admin/AuthShow')}    title="认证后可见字段" />
			</Route>
		</Route>
	</Router>
), document.getElementById('app'));