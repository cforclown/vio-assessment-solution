
import { ControllerRenderProps } from 'react-hook-form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { IMetadataField } from '@/utils/metadata';
import { Input } from '../ui/input';
import { getTextInputType } from './DynamicForm.service';

export interface IDynamicFormFieldItemInput {
  formField: ControllerRenderProps<any, any>,
  rawField: IMetadataField<any>,
  isEditing?: boolean
}

const convertToDateTimeLocalString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

function getInputTextValue(formField: ControllerRenderProps<any, any>, rawField: IMetadataField<any>) {
  if (!formField.value) {
    return formField.value;
  }

  const inputType = getTextInputType(rawField.type);
  if (inputType === 'datetime-local') {
    return convertToDateTimeLocalString(new Date(formField.value));
  }
  
  return formField.value;
}

function DynamicFormFieldItemInput({
  formField,
  rawField,
  isEditing
}: IDynamicFormFieldItemInput): JSX.Element | null {
  if (
    rawField.type.value === 'ID'
    || (rawField.type.noneditable === 'hide' && isEditing)
    || (rawField.type.noneditable === 'static' && isEditing)
  ) {
    return null;
  }

  const { type } = rawField;

  if (type.value === 'ENUM' && type.enum) {
    return (
      <Select {...formField}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={rawField.placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {type.enum.label && (
              <SelectLabel>
                {type.enum.label}
              </SelectLabel>
            )}
            {type.enum.options.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  return (
    <Input 
      { ...formField } 
      value={getInputTextValue(formField, rawField)}
      type={getTextInputType(rawField.type)} 
      placeholder={rawField.placeholder} 
    />
  );
}

export default DynamicFormFieldItemInput;
