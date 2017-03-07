export default {
    //Index
    add_alumni        : ()                         => `/add_alumni/`,
    index             : ({ alumni_id })            => `/${alumni_id}/index/`,                            //我的校友录
    center            : ({ alumni_id })            => `/${alumni_id}/center/`,                     //校友录中心
    notice_list       : ({ alumni_id })            => `/${alumni_id}/notice_list/`,                //通知
    notice            : ({ alumni_id, notice_id }) => `/${alumni_id}/notice_list/${notice_id}/`,   //通知正文
    user_detail       : ({ alumni_id, user_id })   => `/${alumni_id}/user_detail/${user_id}/`,     //用户详情
    share             : ({ alumni_id })            => `/${alumni_id}/share/`,
    album             : ({ alumni_id })            => `/${alumni_id}/album/`,
    auth              : ({ alumni_id })            => `/${alumni_id}/auth/`,
    
    //User
    user              : ()                         => `/user/`,
    user_alumni       : ()                         => `/user/alumni/`,                             //我的校友录

    //Admin
    admin_info        : ({ alumni_id })            => `/${alumni_id}/admin/info/`,
    admin_list        : ({ alumni_id })            => `/${alumni_id}/admin/list/`,
    admin_identity    : ({ alumni_id })            => `/${alumni_id}/admin/identity/`,
    admin_notice      : ({ alumni_id, notice_id }) => `/${alumni_id}/admin/notice/${notice_id}/`,
    admin_auth_manage : ({ alumni_id })            => `/${alumni_id}/admin/auth_manage/`,
    admin_auth_list   : ({ alumni_id })            => `/${alumni_id}/admin/auth_list/`,
    admin_auth_fields : ({ alumni_id })            => `/${alumni_id}/admin/auth_fields/`,
    admin_auth_show   : ({ alumni_id })            => `/${alumni_id}/admin/auth_show/`,
};