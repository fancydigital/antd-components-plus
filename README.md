# antd-components-plus
> 对Antd组件进行二次封装和扩展，对业务系统更加友好

## Install 
```js
npm install antd-components-plus 
 // or
yarn add antd-components-plus
```

## Usage

Select
```js
import {
    Select
} from 'antd-components-plus'

export default ()=>{
    return <div>
        <Select  dataSource={{0:'开始',1:'进行中',1:'暂停'}}/>
        <Select  dataSource={[{key:'0',label:'有效'},{key:'1',label:'无效'}]}/>
        <Select  dataSource={[{userid:'0',name:'abel'},{userid:'1',name:'Li Lei'}]} 
            fieldNames={{key:'userid',label:'name'}}/>
    </div>
}
```
属性说明
| 属性名     | 说明                                                                          | 类型     | 默认值                                                                                                                         |
| ---------- | ----------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| dataSource | 可选项                                                                        | object   | array                                                                                                                          | -     |
| fieldNames | 字段映射                                                                      | object   | { label: 'label', key: 'key', value: 'key' }                                                                                   |
| getOption  | 自定义option                                                                  | funciton | optiom => ({   label: optiom[fieldNames.label], key: optiom[fieldNames.key],value: optiom[fieldNames.value ,fieldNames.key] }) |
| allOption  | 添加全部选项，可以通过传递对象覆盖全部选项的设置 `{ key: '', label: '全部' }` | Boolean  | Object                                                                                                                         | false |

DatePickerRange
```js
import {
    DatePicker
} from 'antd-components-plus'

const { RangePicker } = DatePicker;

export default (filterValue)=>{
    return <div>
        <DatePicker defaultValue={filterValue.start_date}/>
        <RangePicker names={['start_date', 'end_date']} defaultValue={[filterValue.start_date, filterValue.end_date]} />
        <RangePicker defaultValue={[filterValue.start_date, filterValue.end_date]} />
    </div>
}

```
属性说明   
| 属性名      | 说明                                                                                                                                                 | 类型    | 默认值 |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------ |
| value       | 对value会自动进行修正，无需关注值是否有效。只需在dateRange传入数组，如果是dataRange，传入的value，两个值都会*undefined*，则会将值整体改为*undefined* | any     | -      |
| momentValue | 默认将datepicker的值改为string，添加此参数则返回`moment`对象                                                                                         | boolean | false  |
| names       | 方便后续使用，可以将返回值改为对象，按照数据传递的顺序赋值，仅 `RangePicker` 拥有                                                                    | array   | -      |