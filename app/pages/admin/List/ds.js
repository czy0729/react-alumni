export default {
    section: [{
        title: '超级管理员',
        filter: (item) => item.is_creater == Const.is_creater.yes,
    }, {
        title: '普通管理员',
        filter: (item) => item.is_creater == Const.is_creater.no,
    }],
};