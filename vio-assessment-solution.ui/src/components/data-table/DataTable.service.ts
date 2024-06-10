import { ColumnDef } from '@tanstack/react-table';

export type IDataTableActionColumn = ColumnDef<any> & {
  label?: string;
}

export const DATA_TABLE_DEFAULT_PAGE_SIZES = [
  10,
  25,
  50,
  75,
  100,
];
