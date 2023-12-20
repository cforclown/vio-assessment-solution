import DynamicForm, { IDynamicFormProps } from '../dynamic-form';

export interface ICreateFormProps<T> extends IDynamicFormProps<T> {}

function CreateForm<T>(props: ICreateFormProps<T>): JSX.Element {
  return (
    <DynamicForm<T> {...props} />
  );
}

export default CreateForm; 
