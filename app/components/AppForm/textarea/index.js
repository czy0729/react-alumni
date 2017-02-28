/**
 * AppForm.Textarea
 * @version 170203 1.0
 * @version 170215 1.1 [+]emoji
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import { TextareaItem } from 'antd-mobile';
import EmojiPicker from '../../EmojiPicker';
import _utils from '../_utils';
import './index.less';

const prefixCls = 'components__app-form__textarea';

export default class AppFormTextarea extends React.Component {
    constructor() {
        super();

        this.state = {
            selectionStart: -1,
        };
        Utils.binds(this, ['handleFocus', 'handleBlur', 'appendEmoji']);
    }

    componentDidMount() {
        //TextareaItem是stateless component，无法使用ref，只能使用dom操作
        this.$textarea = document.querySelector(`.${prefixCls}__textarea_emoji textarea`);
    }

    handleFocus(e) {
        this.refs.emojiPicker.hide();
    }

    //因为微信不能使用execomm来处理复制粘贴
    //所以只能在textarea onBlur时记住光标位置以改变value来appnend emoji
    handleBlur(e) {
        this.setState({
            selectionStart: this.$textarea.selectionStart,
        });
    }

    //通过props.form去改变formItem的值
    appendEmoji(emoji) {
        const { form, name } = this.props;
        let { selectionStart } = this.state;

        const value = form.getFieldValue(name) || '';

        //假如从来没onBlur过，在最后append
        if (selectionStart == -1) selectionStart = value.length;

        form.setFieldsValue({
            [name]: Utils.strInsert(value, emoji, selectionStart),
        });

        this.setState({
            selectionStart: selectionStart + emoji.length,
        });
    }

    renderTextarea() {
        const { 
            form, option, initialValue,
            name, title,
            emoji,
            className, ...other
        } = this.props;

        return (
            <TextareaItem
                {...form.getFieldProps(name, {
                    initialValue,
                    option,
                })}
                className={classNames(prefixCls, className, {
                    [`${prefixCls}__textarea_emoji`]: emoji,
                })}
                title={_utils.getLabelDecorator(option)(title)}
                placeholder={`请输入${title}`}
                rows={4}
                count={100}
                clear
                onFocus={emoji ? this.handleFocus : undefined}
                onBlur={emoji ? this.handleBlur : undefined}
                {...other}
            />
        );
    }

    render() {
        const { emoji } = this.props;

        if (emoji) {
            return (
                <div className={`${prefixCls}_emoji`}>
                    {this.renderTextarea()}
                    <EmojiPicker
                        ref="emojiPicker"
                        onPick={this.appendEmoji}
                        onHide={() => this.$textarea.focus()}
                    />
                </div>
            );

        } else {
            return this.renderTextarea();
        }
    }
};