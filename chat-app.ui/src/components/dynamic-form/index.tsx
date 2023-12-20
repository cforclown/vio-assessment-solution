
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateFormDefaultValues, generateFormFields, generateFormSchema } from './DynamicForm.service';
import { IMetadataField } from '@/utils/metadata';
import { Form } from '../ui/form';
import { Button } from '../ui/button';

export interface IDynamicFormProps<T> {
  fields: IMetadataField<T>[];
  initialData?: T | null;
  onSubmitData: (data: Record<string, any>) => void;
}

function DynamicForm<T>({ fields, initialData, onSubmitData }: IDynamicFormProps<T>): JSX.Element {
  const formSchema = useMemo(() => generateFormSchema(fields), [fields]);
  
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ?? generateFormDefaultValues(fields),
  });

  const onSubmit = useCallback((values: zod.infer<typeof formSchema>) => {
    onSubmitData(values);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {generateFormFields(form, fields)}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default DynamicForm;
