import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Select } from 'antd';
import PropsType from 'prop-types';

/**
 * 内置option转化逻辑 同时支持object和array
 * 如果类型为object则自动将object key转化成option key。object value转化成 label
 * @param {Array|Object} collection
 * @param {Function} callback
 *
 * @example
 *
 * map({1:'a',2:'b'})  => {key:1,label:'a'}
 *
 * * map([{1:'a'},{2:'b'}])  => {key:1,label:'a'} {key:2,label:'b'}
 */
const map = (collection, callback) => {
  let fn = callback;
  if (_.isPlainObject(collection)) {
    fn = (label, key) =>
      callback({
        key,
        label
      });
  }
  return _.map(collection, fn);
};

const getAllOption = (allOption) => {
  if (allOption === false) {
    return null;
  } else {
    if (allOption === true) {
      allOption = { key: '', label: '全部' };
    }
    return (
      <Select.Option key={`${allOption.key}`} value={`${allOption.key}`}>
        {allOption.label}
      </Select.Option>
    );
  }
};

/**
 * select 增强版本
 * 增加dataSrouce字段 用于自动渲染options
 *
 * @param  {Array|Object} dataSource
 * @param  {Object} fieldNames default:{label:'label',key:'key'} 字段名称转换
 * @param  {Object|Boolean} allOption default: false。 支持对象{key:'',label:'全部'} 用于在option中增加一个全部选项
 * @param  {Function} getOption 返回值 {String|ReactElment|ReactNode}
 */

export default class Select2 extends PureComponent {
  constructor(props) {
    super(props);
  }

  static PropsType = {
    fieldNames: PropsType.object,
    allOption: PropsType.oneOfType(PropsType.bool, PropsType.object),
    getOption: PropsType.func,
    fieldNames: PropsType.object
  };

  render() {
    const {
      dataSource,
      fieldNames = { label: 'label', key: 'key', value: 'key' },
      allOption = false,
      getOption = (optiom) => ({
        label: optiom[fieldNames.label],
        key: optiom[fieldNames.key],
        value: optiom[fieldNames.value || fieldNames.key]
      }),
      mode,
      allowClear = !!mode, // mode有值则默认支持清空
      ...selectProps
    } = this.props;

    return (
      <Select style={{ width: '100%' }} mode={mode} allowClear={allowClear} {...selectProps}>
        {getAllOption(allOption)}
        {map(dataSource, (option) => {
          let { label, key, value = key, ...optionProps } = getOption(option);
          key = _.isUndefined(key) ? value : key;

          return (
            <Select.Option {...optionProps} key={key} value={value}>
              {label}
            </Select.Option>
          );
        })}
      </Select>
    );
  }
}

Select2.Option = Select.Option;
