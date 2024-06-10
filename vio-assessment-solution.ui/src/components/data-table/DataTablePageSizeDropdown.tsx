import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
} from '../ui/dropdown-menu';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import { DATA_TABLE_DEFAULT_PAGE_SIZES } from './DataTable.service';
import { useTranslation } from 'react-i18next';

interface IDataTablePageSizeDropdown {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

function DataTablePageSizeDropdown({ label, value, onChange, className }: IDataTablePageSizeDropdown) {
  const { t } = useTranslation();

  return (
    <div  className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto whitespace-nowrap">
            {label ?? t('common.pageSizeWithValue', { value })} <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuRadioGroup value={value.toString()} onValueChange={(value) => onChange(+value) }>
            {DATA_TABLE_DEFAULT_PAGE_SIZES.map((size) => (
              <DropdownMenuRadioItem key={size} value={size.toString()}>
                {size}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DataTablePageSizeDropdown;
