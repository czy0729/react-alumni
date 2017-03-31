/**
 * AppSwipeActionItem 整合SwipeAction和List.Item，在有效的item左右添加了色边
 * @version 170212 1.0
 */
import React from 'react';
import classNames from 'classnames';
import { SwipeAction, List } from 'antd-mobile';
import './index.less';

const prefixCls = 'components__app-swipe-action-item';

const AppSwipeActionItem = (props) => {
    const { left, right, disabled, style, className, children, ...other } = props;

    return disabled
      ? <List.Item 
            className={classNames(prefixCls, className)}
              style={style}
              {...other}
          >
              {children}
          </List.Item>

      : <SwipeAction
              className={classNames(prefixCls, className)}
              autoClose
            left={left}
            right={right}
            disabled={disabled}
        >
            <List.Item
                style={{
                    borderRight: right && `.06rem solid ${right[0].style.backgroundColor}`,
                    borderLeft: left && `.06rem solid ${left[left.length - 1].style.backgroundColor}`,
                    ...style,
                }}
                {...other}
            >
                {children}
            </List.Item>
        </SwipeAction>;
};

export default AppSwipeActionItem;