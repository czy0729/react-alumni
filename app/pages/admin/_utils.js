export default {
	//根据api和Const.fields的配置构造表单配置
	generateFieldsConfig(data) {
		delete data._loaded;

        //先把api返回的配置对象转成数组
        const configData = [];
        for (let key in data) {
            /*
                [
                    '0 配置字段',
                    '1 是否必填或选填值 | 是否可见字段',
                    '2 字段名称',
                    '3 表单分组标识',
                    '4 表单字段排序标识',
                    '5 其他'
                ]
                ['is_need(is_show)_mobile', '1', '手机号', 0, 20, { type: 'tel' }]
            */
            const fieldValue = Const.fields[key.replace('is_need_', '').replace('is_show_', '')];

            fieldValue && configData.push([
                key,
                data[key],
                ...fieldValue,
            ]);
        }

        //根据Const.fields对数组进行排序和分组
        const groupData = [];
        configData
            .sort((a, b) => a[4] - b[4])
            .forEach((item, idx) => {
                if (!groupData[item[3]]) groupData[item[3]] = [];

                groupData[item[3]].push(item);
            });

        return groupData;
	}
};