import { UseFormReturn } from 'react-hook-form';
import { FormField } from '../ui/form';
import DynamicFormFieldItem from './DynamicFormFieldItem';
import { IMetadataField } from '@/utils/metadata';

export interface IDynamicFormField {
  form: UseFormReturn<any, any, undefined>;
  field: IMetadataField<any>;
}

function DynamicFormField({ form, field }: IDynamicFormField) {
  return (
    <FormField
      control={form.control}
      name={field.accessorKey!}
      render={(props) => (
        <DynamicFormFieldItem {...props} rawField={field} />
      )}
    />
  );
}

export default DynamicFormField;
