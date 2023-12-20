import DynamicForm, { IDynamicFormProps } from '../dynamic-form';
import { useAPI } from '@/hooks/useApi';
import { IAPIEndpoint } from '@/utils/call-api';
import { generateFormSkeleton } from '../dynamic-form/DynamicForm.service';
import { useMemo } from 'react';

export interface IEditFormProps<T> extends IDynamicFormProps<T> {
  getInitialDataEndpoint: IAPIEndpoint;
  getInitialDataReqBody?: Record<string, any>;
}

function EditForm<T>({
  getInitialDataEndpoint,
  getInitialDataReqBody,
  ...props
}: IEditFormProps<T>): JSX.Element {
  const { data, loading } = useAPI<T>(getInitialDataEndpoint, getInitialDataReqBody);

  const skeletons = useMemo(() => generateFormSkeleton(props.fields), [props.fields]);
  
  return (
    <>
      {loading || !data ? skeletons : (
        <DynamicForm<T>
          {...props}
          initialData={data}
        />
      )}
    </>
  );
}

export default EditForm; 
