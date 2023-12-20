import { useState, useCallback, useMemo } from 'react';
import {
  ColumnFiltersState, 
  PaginationState, 
  SortingState, 
  VisibilityState, 
  flexRender, 
  getCoreRowModel, 
  getFilteredRowModel, 
  getPaginationRowModel, 
  getSortedRowModel, 
  useReactTable 
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DataTableColumnsDropdown from './DataTableColumnsDropdown';
import DataTableSimpleFilter from './DataTableSimpleFilter';
import { DATA_TABLE_DEFAULT_PAGE_SIZES, IDataTableActionColumn } from './DataTable.service';
import DataTablePageSizeDropdown from './DataTablePageSizeDropdown';
import { IPaginationResponse, IPaginationSort, EPaginationSortOrders } from '@/utils/exploration/pagination';
import { IMetadataField } from '@/utils/metadata';

interface IDataTableProps<T> {
  columns: IMetadataField<T>[];
  data: T[];
  isClientPagination?: boolean;
  pagination?: IPaginationResponse;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
  onPageSizeChange?: (size: number) => void;
  onSortChange?: (sort: IPaginationSort) => void;
  filterField?: string;
  filterValue?: string;
  onFilterChange?: (query: string) => void;
  actionColumn?: IDataTableActionColumn;
}

function DataTable<T>({ 
  columns: cols, 
  data, 
  filterField, 
  filterValue,
  isClientPagination,
  pagination,
  onNextPage,
  onPreviousPage,
  onPageSizeChange,
  onSortChange,
  onFilterChange,
  actionColumn
}: IDataTableProps<T>) {
  const columns = useMemo(() => [...cols, actionColumn] as IMetadataField<T>[], [ cols, actionColumn]) ;

  // PAGINATION VARIABLES (client pagination)-----------------------------------------------------
  const [clientPagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: DATA_TABLE_DEFAULT_PAGE_SIZES[1],
  });
  // --------------------------------------------------------------------------

  // SORTING VARIABLES (client pagination) -----------------------------------------------------
  const [sorting, setSorting] = useState<SortingState>((!isClientPagination && pagination) ? [{
    id: pagination.sort.by,
    desc: pagination.sort.order === EPaginationSortOrders.DESC
  }] : []);
  // -------------------------------------------------------------------------------------------

  // FILTER VARIABLES (client pagination) ----------------------------------------
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // -----------------------------------------------------------------------------

  // COLUMN VISIBILITY -----------------------------------------------------------
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  // -----------------------------------------------------------------------------

  // SELECTION (comin soon) -----------------------------
  const [rowSelection, setRowSelection] = useState({});
  // ----------------------------------------------------

  const table = useReactTable({
    columns,
    data,
    // PAGINATION CONFIG ----------------------------------------------------------------------------
    getPaginationRowModel: (!isClientPagination && pagination) ? undefined : getPaginationRowModel(),
    onPaginationChange: (!isClientPagination && pagination) ? undefined : setPagination,
    pageCount: (!isClientPagination && pagination) ? pagination.pageCount : undefined,
    manualPagination: !!(!isClientPagination && pagination),
    // ----------------------------------------------------------------------------------------------
    // SORT CONFIG --------------------------------------------------------------------------------------
    onSortingChange: (!isClientPagination && pagination && onSortChange) 
      ? (sort: any) => onSortChange({
        by: sort()[0].id ?? columns[0].accessorKey,
        order: sort()[0]?.desc ? EPaginationSortOrders.DESC : EPaginationSortOrders.ASC
      }) 
      : setSorting,
    getSortedRowModel: getSortedRowModel(),
    //---------------------------------------------------------------------------------------------------
    onColumnFiltersChange: (!isClientPagination && pagination && onFilterChange) 
      ? (filter: any) => onFilterChange(filter()?.[0]?.value ?? '') 
      : setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: (!isClientPagination && pagination) ? pagination.limit : clientPagination.pageSize
      }
    },
    state: {
      sorting: (!isClientPagination && pagination) ? [{
        id: pagination.sort.by,
        desc: pagination.sort.order === EPaginationSortOrders.DESC
      }] : sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: (!isClientPagination && pagination) ? {
        pageIndex: pagination.page - 1,
        pageSize: pagination.limit,
      } : clientPagination
    }
  });

  const getTableColumnDef = useCallback(() => {
    const cols = table.getAllColumns();
    return cols.map(col => {
      const colDef = columns.find(c => c.accessorKey === col.id);
      return Object.assign({ ...col }, {
        columnDef: {
          label: colDef?.label ?? col.id
        }
      });
    });
  }, [ table ]);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-start sm:justify-between items-end sm:itens-center py-4 gap-2">
        {filterField && (
          <DataTableSimpleFilter
            value={filterValue}
            onChange={onFilterChange}
            column={table.getColumn(filterField ?? '')}
            placeholder="Filter..."
          />
        )}
        <div className="flex flex-row gap-2">
          <DataTableColumnsDropdown columns={getTableColumnDef()} />
          <DataTablePageSizeDropdown
            value={(!isClientPagination && pagination && onPageSizeChange) ? pagination.limit : table.getState().pagination.pageSize} 
            onChange={(!isClientPagination && pagination && onPageSizeChange) ? onPageSizeChange : table.setPageSize}
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Page
          {' '}
          {(!isClientPagination && pagination) ? pagination.page : table.getState().pagination.pageIndex + 1}
          {' of '}
          {(!isClientPagination && pagination) ? pagination.pageCount : table.getPageCount()}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => (!isClientPagination && pagination && onPreviousPage) ? onPreviousPage() : table.previousPage()}
            disabled={(!isClientPagination && pagination) ? pagination.page === 1 : !table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => (!isClientPagination && pagination && onNextPage) ? onNextPage() : table.nextPage()}
            disabled={!isClientPagination && pagination ? pagination.page === pagination.pageCount : !table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

export default DataTable;
