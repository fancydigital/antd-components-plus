import React, { PureComponent } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import PropsType from 'prop-types';
import { DEFAULT_DATE_FORMAT } from './index';
import isPlainObject from 'lodash/isPlainObject';

const { RangePicker } = DatePicker;
const noop = () => {};

/**
 * <RangePicker 
 *  value={['2020-10-10','2020-10-10']} 
*   onChange={(value)=>{
        // ['2020-10-10','2020-10-10']
 *  }}
 * />
 * 
 * <RangePicker
 *   value={['2020-10-10','2020-10-12']} 
 *   names={['start_date','end_date']}
 *   onChange={(value)=>{
        // {state_date:'2020-10-10',end_date:'2020-10-12'}
 *  }}
 *
 * <RangePicker
 *   value={['2020-10-10','2020-10-10']} 
 *   names={['start_date','end_date']}
 *   momentValue
 *   onChange={(value)=>{
        // {state_date: Moment,end_date: Moment}
 *  }}
 */
export default class DatePickerRange extends PureComponent {
  static PropsType = {
    // 是否返回moment类型的值，默认是false
    momentValue: PropsType.bool,
    // 用于daterange将值重新保存到对象。 ['start_date','end_date'] => {'state_date':'','end_date':''}
    names: PropsType.array
  };

  /**
   *
   * @param {Array} value
   */
  onChange = (value) => {
    const {
      onChange = noop,
      momentValue = false,
      names,
      format = DEFAULT_DATE_FORMAT
    } = this.props;
    if (momentValue === true || value.length === 0) {
      onChange(value);
    } else {
      const valuesString = [value[0].format(format), value[1].format(format)];
      if (Array.isArray(names) && names.length === 2) {
        onChange({
          [names[0]]: valuesString[0],
          [names[1]]: valuesString[1]
        }); // {'state_date':'2020-10-10','end_date':'2020-10-12'}
      } else {
        onChange(valuesString); // ['2020-10-10','2020-10-12']
      }
    }
  };

  render() {
    let { value, defaultValue, names, format = DEFAULT_DATE_FORMAT, ...props } = this.props;
    if (isPlainObject(value)) {
      // 按照names取值
      if (Array.isArray(names) && names.length === 2) {
        value = [value[names[0]], value[names[1]]];
      } else {
        console.error('Value is Object type ,but names is missing');
        value = undefined;
      }
    }

    if (Array.isArray(value) && value.length === 2) {
      if (value[0] === undefined && value[1] === undefined) {
        value = undefined;
      } else {
        value = [moment(value[0]), moment(value[1])];
      }
    }
    return <RangePicker {...props} value={value} onChange={this.onChange} format={format} />;
  }
}
