import React, { PureComponent } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import PropsType from 'prop-types';
import RangePicker from './DatePickerRange';

export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';

const noop = () => {};

export default class DatePicker2 extends PureComponent {
  static PropsType = {
    // 是否返回moment类型的值，默认是false
    momentValue: PropsType.bool
  };

  /**
   *
   * @param {Moment} value
   */
  onChange = value => {
    const { onChange = noop, momentValue = false, format = DEFAULT_DATE_FORMAT } = this.props;
    if (momentValue === true) {
      onChange(value);
    } else {
      onChange(moment.isMoment(value) ? value.format(format) : value);
    }
  };
  render() {
    let { value, format = DEFAULT_DATE_FORMAT, ...props } = this.props;
    if (!moment.isMoment(value) && !_.isEmpty(value)) {
      value = moment(value);
    }

    return <DatePicker value={value} {...props} onChange={this.onChange} format={format} />;
  }
}

DatePicker2.RangePicker = RangePicker;
