import { CaretSortIcon } from '@radix-ui/react-icons';
import { IMetadataField } from '@/utils/metadata';
import { Button } from '@/components/ui/button';
import { IService } from 'vio-assessment-solution.contracts';

export const servicesFields: IMetadataField<IService>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    label: 'Name',
    header: ({ column }) => (
      <div className="text-start">
        <Button
          variant="ghost"
          className="text-start"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div>{row.getValue('name')}</div>
    ),
    type: {
      value: 'STRING',
      required: true
    }
  },
  {
    id: 'repoUrl',
    accessorKey: 'repoUrl',
    label: 'Repository URL',
    header: ({ column }) => (
      <div className="text-start">
        <Button
          variant="ghost"
          className="text-start"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Repository URL
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div>{row.getValue('repoUrl')}</div>
    ),
    type: {
      value: 'STRING',
      required: true
    }
  },
  {
    id: 'desc',
    accessorKey: 'desc',
    label: 'Description',
    header: () => <div className="text-start">Description</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('desc')}</div>,
    type: {
      value: 'STRING'
    }
  },
  {
    id: 'status',
    accessorKey: 'status',
    label: 'Status',
    header: () => <div className="text-start">Status</div>,
    cell: ({ row }) => <div className="text-left capitalize">{row.getValue('status')}</div>,
    type: {
      value: 'STRING',
      noneditable: 'hide'
    }
  }
];
