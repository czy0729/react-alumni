'use strict';

import React from 'react';
import { List, Icon } from 'antd-mobile';

const Detail = (props) => {
    const { detail } = props;

    const _detail = { ...detail };

    delete _detail.nickname;
    delete _detail.headimgurl;

    return (
        <div>
            {Utils.generateFieldsConfig(_detail).map((item, index) => (
                <List 
                    key={Const.fileds_group[index]}
                    renderHeader={() => <div>{Const.fileds_group[index]}</div>}
                >
                    {item.map((i, idx) => {
                        const is_hidden = i[1] == '(交换名片后可见)'; //是否隐藏
                        const is_format = i[5] && i[5].format;        //是否需要取中文值
                        const is_tel    = i[5] && i[5].tel;           //是否显示打电话图标

                        return (
                            <List.Item
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
                                {!is_hidden && is_tel && i[1] && <Icon className="pull-right text-default" type={require('common/svg/mobile.svg')} />}
                            </List.Item>
                        );
                    })}
                </List>
            ))}
        </div>
    );
};

export default Detail;