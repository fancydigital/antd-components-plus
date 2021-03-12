import React, { Component, createContext } from 'react';
import { Form as AntdForm, Row } from 'antd';
import PropTypes from 'prop-types';
export const { Provider, Consumer } = createContext({});

const noop = () => {};

function wrappedForm() {
  class WrappedForm extends Component {
    static Consumer = Consumer;

    constructor(props) {
      super(props);
      this.WrapperForm = AntdForm.create({
        onValuesChange: this.props.onValuesChange
      })(Form);
    }

    render() {
      const { forwardedRef, children, ...rest } = this.props;

      return (
        <this.WrapperForm ref={forwardedRef} {...rest}>
          {this.props.children}
        </this.WrapperForm>
      );
    }
  }

  function forwardRef(props, ref) {
    return <WrappedForm {...props} forwardedRef={ref} />;
  }

  forwardRef.displayName = 'WrapperForm';

  return React.forwardRef(forwardRef);
}

export default wrappedForm();

class Form extends Component {
  static propTypes = {
    colon: PropTypes.bool,
    form: PropTypes.element,
    initialValues: PropTypes.object,
    layout: PropTypes.oneOf(['horizontal', 'vertical', 'inline']),
    labelCol: PropTypes.object,
    wrapperCol: PropTypes.object,
    onFinish: PropTypes.func,
    onFinishFailed: PropTypes.func,
    onValuesChange: PropTypes.func
  };
  handleSubmit = e => {
    const { onFinish = noop, onFinishFailed = noop, form } = this.props;

    e.preventDefault();

    form.validateFieldsAndScroll((errors, values) => {
      if (errors) {
        onFinishFailed(values, errors);
      } else {
        onFinish(values);
      }
    });
    return false;
  };
  render() {
    const { initialValues, wrapperCol, labelCol, colon, children, layout, form } = this.props;
    return (
      <AntdForm
        onSubmit={this.handleSubmit}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        layout={layout}
      >
        <Provider
          value={{
            form: form,
            initialValues,
            labelCol,
            colon: colon,
            wrapperCol
          }}
        >
          {children}
        </Provider>
      </AntdForm>
    );
  }
}
