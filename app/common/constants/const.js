/**
 * 项目约定常量
 * @version 170216 1.0
 */
'use strict';

import rules from './rules';

//一些接口类型约定
const app = {
    /*==================== 2.1.0 我的校友录列表 ====================*/
    //校友录创建状态
    alumni_list_status: {
        new    : 0, //第一步 创建
        auth   : 1, //第二步 设置必填选填字段
        show   : 2, //第三步 设置默认可见字段
        finish : 3, //完成
    },

    //某校友录对于我的关系
    alumni_list_type: {
        not_auth : 0, //等待认证
        my       : 1, //我创建的
        join     : 2, //我加入的
    },

    /*==================== 2.1.1 获取校友录基本信息 ====================*/
    //对于本校友录当前用户类型
    user_type: {
        super : 1, //超级管理员
        admin : 2, //管理员
        user  : 3, //普通成员
    },

    /*==================== 2.1.4 校友录用户详情 ====================*/
    //[type]某用户对于我的关系
    user_detail_type: {
        self        : -1, //自己
        black       : 0,  //黑名单
        can_change  : 1,  //可交换名片
        can_resolve : 2,  //可同意交换
        wait_change : 3,  //待同意交换
        can_cancel  : 4,  //可取消交换
    },

    //[status]用户是否在你的黑名单
    user_detail_status: {
        yes : -1,
        no  : 0,
    },

    //[is_creater]是否校友录创建者
    is_creater: {
        yes : 1,
        no  : 0,
    },

    //[is_manager]是否管理员
    is_manager: {
        yes: 1,
        no: 0,
    },

    /*==================== 2.1.10 设置或取消加入黑名单 ====================*/
    do_set_black_status: {
        yes: -1, //设为黑名单
        no: 0,   //取消黑名单
    },

    /*==================== 2.1.11 同意、拒绝或取消交换名片 ====================*/
    do_exchange_card_status: {
        resolve: 1, //同意
        reject: -1, //拒绝
        cancel: -2, //取消
    },

    /*====================  ====================*/
    //验证校友录的状态
    alumni_auth_status: {
        first   : -2, //首次
        reject  : -1, //被拒绝
        wait    : 0,  //待认证
        resolve : 1,  //已同意
    },

    //通知栏事件类型
    message_type: {
        notice : 1, //通知
        event  : 2, //活动
        alumni : 3, //校友录
        card   : 4, //交换名片
    },

    /*==================== 2.2.2 ====================*/
    //[2.2.2]是否允许加入校友录
    auth_status: {
        reject  : -1,
        resolve : 1,
    },

    /*====================  ====================*/
    //某用户交换名片状态
    exchange_status: {
        cancel  : -2,
        reject  : -1,
        resolve : 1,
    },

    //校友录加入状态
    join_status: {
        no   : 0, //未认证
        self : 1, //我创建的
        yes  : 2, //我加入的
    },
};

//主要功能，动态表单的字段
const form = {
    /**
     * 表单字段配置 
     * [字段名]: [名称，分组，排序，配置]
     * 配置 { 
     *    component : '表单使用的组件',
     *    config    : 'component的参数', //type 银行卡bankCard,手机号phone（此时最大长度固定为11,maxLength设置无效）,密码password, 数字number（尽量唤起数字键盘）
     *    rules     : 'Const.rules.genRules(这里的值, isRequired)',
     *    tel       : '是否能拨号，生成按钮调用拨号',
     *    format    : '显示值时是否调用Utils.getOptionLabel()',
     * }
     */
    fields: {
        headimgurl                : ['头像',         0, 0,   { component: 'Upload' }],
        real_name                 : ['真实姓名',     0, 10,  {}],
        mobile                    : ['手机号',       0, 20,  { config: { type: 'number' }, rules: 'mobile', tel: true }],
        nickname                  : ['昵称',         0, 25,  {}],
        area                      : ['地区',         0, 30,  {}],
        sex                       : ['性别',         0, 40,  { component: 'Picker', rules: 'picker', format: 'sex' }],

        birthday                  : ['生日',         1, 100, { component: 'DatePicker' }],
        wx_sn                     : ['微信号',       1, 110, { rules: 'wechat' }],
        qq                        : ['QQ',           1, 120, { config: { type: 'number' }, rules: 'number' }],
        email                     : ['邮箱',         1, 130, { rules: 'email'}],
        phone                     : ['座机',         1, 140, { tel: true }],
        address                   : ['住址',         1, 150, {}],
        zip_code                  : ['邮编',         1, 160, { config: { type: 'number' } }],
        household                 : ['户籍',         1, 170, {}],
        hobby                     : ['爱好',         1, 180, {}],
        emotion_status            : ['情感状态',     1, 190, { component: 'Picker', rules: 'picker', format: 'emotion_status' }],

        big_school_name           : ['名称',         2, 200, {}],
        attend_big_school_date    : ['入学年份',     2, 210, { component: 'DatePicker', config: { mode: 'year' } }],
        academy                   : ['学院',         2, 220, {}],
        major                     : ['专业',         2, 230, {}],
        big_class                 : ['班级',         2, 240, {}],

        middle_school_name        : ['名称',         3, 300, {}],
        attend_middle_school_date : ['入学年份',     3, 310, { component: 'DatePicker', config: { mode: 'year' } }],
        middle_type               : ['类型',         3, 320, { component: 'Picker', rules: 'picker', format: 'middle_type' }],
        middle_attend_grade       : ['年级',         3, 330, { component: 'Picker', rules: 'picker', format: 'middle_attend_grade' }],
        middle_class              : ['班级',         3, 340, {}],
        
        specialty                 : ['特长领域',     4, 400, {}],
        job_company               : ['工作单位',     4, 410, {}],
        job_address               : ['工作地址',     4, 420, {}],
        job_phone                 : ['工作电话',     4, 430, { tel: true }],
        job_work                  : ['工作职位',     4, 440, {}],
    },

    //表单字段分组信息
    fileds_group: {
        0: '基本',
        1: '个人',
        2: '大学',
        3: '中学',
        4: '职业',
    },
};

//动态表单的字段的选项
const option = {
    //性别
    sex: [{
        label: '男',
        value: '1',
    }, {
        label: '女',
        value: '2',
    }],

    //情感状态
    emotion_status: [{
        label: '单身',
        value: '1',
    }, {
        label: '有对象',
        value: '2',
    }, {
        label: '已婚',
        value: '3',
    }],

    //中学类型
    middle_type: [{
        label: '初中',
        value: '1',
    }, {
        label: '高中',
        value: '2',
    }],

    //中学入读年级
    middle_attend_grade: [{
        label: '初一',
        value: '1',
    }, {
        label: '初二',
        value: '2',
    }, {
        label: '初三',
        value: '3',
    }, {
        label: '高一',
        value: '4',
    }, {
        label: '高二',
        value: '5',
    }, {
        label: '高三',
        value: '6',
    }],

    //学院类型
    school_type: [{
        label: '大学',
        value: '1',
    }, {
        label: '中学',
        value: '0',
    }],

    //爱好
    hobby: [
        '篮球', '足球', '兵乓球', '网球', '排球', '羽毛球', '跑步', 
        '游泳', '健身', '军旗', '象棋', '五子棋', '跳棋', '围棋', 
        '登山', '徒步', '电影', '连续剧', '短剧', '戏剧', '歌剧', 
        '文学', '哲学', '经济', '政治', '小说', '动漫', '赋诗', 
        '书法', '写作', '表演', '音乐', '舞蹈'
    ],

    //特长
    specialty: [
        '制造', '批发和零售', '住宿和餐饮', '互联网', '软件和信息技术服务', '金融',
        '房地产', '租赁和商务服务', '教育', '卫生和社会工作', '文化、体育和娱乐业',
        '建筑', '公共管理', '社会保障和社会组织', '科学研究和技术服务', '水利、环境和公共设施管理',
        '居民服务、修理和其他服务', '电力、热力、燃气', '水生产和供应业', '农、林、牧、渔业', '采矿业',
        '交通运输、仓储和邮政业', '国际组织', '其他'
    ],
};

export default {
    ...app,
    ...form,
    ...option,

    /**
     * 在option里面查找对应中文
     * @version 170221 1.0
     * @param  {String} *key   option中对应key
     * @param  {String} *value 值
     * @return {String}
     */
    getOptionLabel(key, value) {
        if (!option[key]) return false;

        let label = '未知';

        option[key].forEach((item, idx) => {
            if (value == item.value) {
                label = item.label;
                return false;
            }
        });

        return label;
    },
};