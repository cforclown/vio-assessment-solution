import { IMetadataField } from '@/utils/metadata';
import { Label } from '../ui/label';
import { IAPIEndpoint } from '@/utils/call-api';
import { useAPI } from '@/hooks/useApi';
import { Button } from '../ui/button';
import { LoaderBase } from '../loader/Loader';
import Page404 from '@/pages/404';
import H2 from '../typography/h2';

export interface IDataDetails<T> {
  title: string;
  endpoint: IAPIEndpoint;
  fields: IMetadataField<T>[];
  onEditClick?: () => void;
}

function DataDetails<T>({ title, endpoint, fields, onEditClick }: IDataDetails<T>): JSX.Element {
  const { data, loading } = useAPI<T>(endpoint);

  if (!data && !loading) {
    return ( <Page404 fullscreen code={404}  msg="Page not found" /> );
  }

  if (loading) {
    return ( <LoaderBase /> );
  }

  return (
    <>
      <div className="flex flex-row justify-between align-center mb-8">
        <H2>{title ?? 'Untitled'}</H2>
        {onEditClick && (
          <Button 
            size="sm" 
            onClick={() => onEditClick()}
          >
            Edit
          </Button>
        )}
      </div>
      {fields.filter(f => f.accessorKey).map((field, i) => (
        <div key={i} className="flex flex-col gap-[8px] mb-4">
          <Label className="font-bold text-[18px]">{field.label}</Label>
          <Label>{(data as any)[field.accessorKey!]}</Label>
        </div>
      ))}
    </>
  );
}

export default DataDetails;
