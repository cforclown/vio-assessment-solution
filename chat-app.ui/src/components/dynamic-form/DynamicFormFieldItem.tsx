import { IMetadataField } from '@/utils/metadata';
import { ControllerFieldState, ControllerRenderProps, UseFormStateReturn } from 'react-hook-form';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '../ui/form';
import DynamicFormFieldItemInput from './DynamicFormFieldItemInput';


export interface IDynamicFormFieldItem {
  field: ControllerRenderProps<any, any>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<any>;
  rawField: IMetadataField<any>;
  isEditing?: boolean;
}

function DynamicFormFieldItem({ field, rawField, isEditing }: IDynamicFormFieldItem): JSX.Element {
  return (
    <FormItem>
      <FormLabel className="font-bold">{rawField.label}</FormLabel>
      <FormControl>
        <DynamicFormFieldItemInput formField={field} rawField={rawField} isEditing={isEditing} />
      </FormControl>
      {rawField.desc && (
        <FormDescription>
          {rawField.desc}
        </FormDescription>
      )}
      <FormMessage />
    </FormItem>
  );
}

export default DynamicFormFieldItem;
