import React from 'react';
import { Form } from 'antd';
import _ from 'lodash';

const BASE_PROPERTY = ['form', 'name', 'component', 'children', 'noStyle'];

const FORM_ITEM_PROPERTY = [
  'colon',
  'extra',
  'hasFeedback',
  'help',
  'htmlFor',
  'label',
  'labelCol',
  'labelAlign',
  'required',
  'validateStatus',
  'wrapperCol'
];

const FORM_ITEM_OPTIONS = [
  'getValueFromEvent',
  'initialValue',
  'normalize',
  'preserve',
  'rules',
  'trigger',
  'validateFirst',
  'validateTrigger',
  'valuePropName'
];

const createElement = (component) => {
  if (typeof component === 'function') {
    return React.createElement(component);
  } else {
    return React.cloneElement(component);
  }
};

class RcForm extends React.Component {
  constructor(props) {
    super(props);
    this.actions = props.actions || {};
  }

  UNSAFE_componentWillMount() {
    this.$wapper = Form.create()(this.proxyRender);
  }

  // 这里可以接收到Form
  proxyRender = (props) => {
    _.assign(this.actions, props.form);

    return this.FormRender({
      Item: this.FormItem
    });
  };

  FormItem = (props) => {
    const { getFieldDecorator } = this.actions;

    const { name, children, component = children, noStyle, ...otherProps } = props;

    const formItemProps = _.pick(otherProps, FORM_ITEM_PROPERTY);
    const getFieldDecoratorOptions = _.pick(otherProps, FORM_ITEM_OPTIONS);

    const childProps = _.omit(otherProps, [
      ...BASE_PROPERTY,
      ...FORM_ITEM_PROPERTY,
      ...FORM_ITEM_OPTIONS
    ]);

    getFieldDecoratorOptions.initialValue = this.getInitalvalue()[name];

    const decorator = getFieldDecorator(name, getFieldDecoratorOptions);

    // 如果component和chilren 那么不需要create
    if (!component) {
      return null;
    }

    if (noStyle) {
      return decorator(createElement(component, childProps));
    }

    // noStyle 则不使用Form.item包裹
    return (
      <Form.Item {...formItemProps}>{decorator(createElement(component, childProps))}</Form.Item>
    );
  };

  formRender() {}

  render() {
    const { formProps = {}, props } = this;

    return <Form {...formProps}>{React.createElement(this.$wapper, props)}</Form>;
  }
}

export default RcForm;
