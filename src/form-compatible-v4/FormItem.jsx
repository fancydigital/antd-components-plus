import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { Consumer } from './Form';

export default class FormItem extends Component {
  static propTypes = {
    colon: PropTypes.bool,
    help: PropTypes.element,
    label: PropTypes.element,
    name: PropTypes.string,
    validateStatus: PropTypes.string,
    required: PropTypes.bool,
    tooltip: PropTypes.element,
    noStyle: PropTypes.bool,
    labelAlign: PropTypes.oneOf(['left', 'right']),
    hidden: PropTypes.bool,
    // 附加属性
    editable: PropTypes.bool
  };
  render() {
    const {
      name,
      required,
      noStyle,
      rules,
      validateFirst = false,
      validateTrigger = 'onChange',
      normalize = (value) => value,
      preserve = false,
      trigger = 'onChange',
      valuePropName = 'value',
      children,
      hidden = false,
      editable = false,
      ...rest
    } = this.props;

    return (
      <Consumer>
        {({
          form,
          initialValues = {},
          wrapperCol,
          labelCol,
          colon,
          editable: formEditable = false
        }) => {
          let decorator;

          if (name) {
            decorator = form.getFieldDecorator(name, {
              rules,
              initialValue: initialValues[name],
              validateFirst,
              validateTrigger,
              normalize,
              preserve,
              trigger,
              valuePropName
            })(children);
          } else {
            decorator = children;
          }

          if (hidden) {
            return null;
          }

          if (editable === false || (editable === true && formEditable === false)) {
            decorator = form.getFieldValue(name);
          }

          if (noStyle) {
            return decorator;
          }

          return (
            <Form.Item
              colon={colon}
              wrapperCol={wrapperCol}
              labelCol={labelCol}
              {...rest}
              required={required}
            >
              {decorator}
            </Form.Item>
          );
        }}
      </Consumer>
    );
  }
}
