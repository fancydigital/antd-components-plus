import Form from './Form';
import Item from './FormItem';
import useForm from './useFormHook';
export { default as FormInstance } from './FormInstance';

Form.Item = Item;

Form.useForm = useForm;

export default Form;
