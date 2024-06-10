import { ColumnDef } from '@tanstack/react-table';

export const IMetadataFieldTypeNames = [ 'ID', 'STRING', 'NUMBER', 'EMAIL', 'PASSWORD', 'ENUM', 'DATE', 'DATETIME', 'PERCENT' ] as const;
export type IMetadataFieldTypes = typeof IMetadataFieldTypeNames[number];
export const isMetadataFieldType = (type: string): type is IMetadataFieldTypes => !!IMetadataFieldTypeNames.find((t) => t === type);

export interface IMetadataFieldTypeEnum {
  label?: string;
  options: {
    id: string;
    label: string;
  }[];
}

export interface IMetadataFieldType {
  value: IMetadataFieldTypes;
  enum?: IMetadataFieldTypeEnum; // for ENUM

  /**
   * 'static' => it expect default values in IMetadataFieldType.default
   * can't be changed on create or edit
   * only visible on create (disabled)
   * see the usage on Users.tsx
   *
   * 'hide' => the field will not be visible on create or edit. this value should be applied to 'id' field that generated on item creation (on backend side)
   */
  noneditable?: 'static' | 'hide' | boolean;

  required?: boolean;
  default?: any;
}

export type IMetadataField<T> = ColumnDef<T> & {
  label?: string;
  accessorKey?: string;
  type: IMetadataFieldType;
  placeholder?: string;
  desc?: string;
}
