export default {
    //Common
    add_alumni        : ()                         => `/add_alumni/`,                                   //创建校友录
    result            : ()                         => `/result/`,                                       //结果页

    //Index
    index             : ({ alumni_id })            => `/index/${alumni_id}/index/`,                     //校友录
    center            : ({ alumni_id })            => `/index/${alumni_id}/center/`,                    //校友录中心
    notice_list       : ({ alumni_id })            => `/index/${alumni_id}/notice_list/`,               //通知
    notice            : ({ alumni_id, notice_id }) => `/index/${alumni_id}/notice_list/${notice_id}/`,  //通知正文
    user_detail       : ({ alumni_id, user_id })   => `/index/${alumni_id}/user_detail/${user_id}/`,    //用户详情
    share             : ({ alumni_id })            => `/index/${alumni_id}/share/`,                     //#todo
    album             : ({ alumni_id })            => `/index/${alumni_id}/album/`,                     //#todo
    auth              : ({ alumni_id })            => `/index/${alumni_id}/auth/`,                      //校友认证

    //Admin
    admin_info        : ({ alumni_id })            => `/admin/${alumni_id}/info/`,                      //基本信息
    admin_list        : ({ alumni_id })            => `/admin/${alumni_id}/list/`,                      //管理员列表
    admin_identity    : ({ alumni_id })            => `/admin/${alumni_id}/identity/`,                  //身份管理
    admin_notice      : ({ alumni_id, notice_id }) => `/admin/${alumni_id}/notice/${notice_id}/`,       //发布通知
    admin_auth_manage : ({ alumni_id })            => `/admin/${alumni_id}/auth_manage/`,               //认证管理
    admin_auth_list   : ({ alumni_id })            => `/admin/${alumni_id}/auth_list/`,                 //认证请求
    admin_auth_fields : ({ alumni_id })            => `/admin/${alumni_id}/auth_fields/`,               //认证需填写字段
    admin_auth_show   : ({ alumni_id })            => `/admin/${alumni_id}/auth_show/`,                 //认证后可见字段

    //User
    user_center       : ()                         => `/user/index/`,                                   //个人中心
    user_info         : ()                         => `/user/info/`,                                    //我的名片
    user_alumni       : ()                         => `/user/alumni/`,                                  //我的校友录
    user_cards        : ()                         => `/user/cards/`,                                   //名片库
    user_blacklist    : ()                         => `/user/blacklist/`,                               //黑名单
};