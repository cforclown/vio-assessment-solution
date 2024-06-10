import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField as FormFieldComponent, FormItem, FormMessage } from '@/components/ui/form';
import { InputHTMLAttributes } from 'react';

export interface IFormFieldProps {
  name: string;
  form: UseFormReturn<any, any, undefined>;
  Component: React.ComponentType<InputHTMLAttributes<HTMLInputElement>>;
  componentProps?: InputHTMLAttributes<HTMLInputElement>;
}

function FormField({ name, form, Component, componentProps }: IFormFieldProps): JSX.Element {
  return (
    <FormFieldComponent
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Component {...componentProps} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormField;
