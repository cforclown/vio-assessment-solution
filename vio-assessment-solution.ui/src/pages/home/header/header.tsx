import { useDispatch } from 'react-redux';
import { DotsVerticalIcon, RowsIcon } from '@radix-ui/react-icons';
import withUserContext, { IWithUserContext } from '@/components/HOC/withUserContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { deleteUserContext } from '@/store/reducers/user-context';

interface IHeaderProps extends IWithUserContext{
  showSidebarToggler: boolean;
  onToggleSidebar: ()=>void;
  className?: string;
}

const HeaderBase = ({ 
  showSidebarToggler, 
  onToggleSidebar, 
  t,
  className
}: IHeaderProps): JSX.Element => {
  const dispatch = useDispatch();

  const onToggleSidebarClick = (): void => {
    if (!onToggleSidebar) return;
    onToggleSidebar();
  };

  const logout = () => {
    dispatch(deleteUserContext());
  };

  return (
    <div className={className}>
      <div className="header-left">
        {showSidebarToggler && (
          <div className="header-sidebar-toggle-btn" onClick={onToggleSidebarClick}>
            <RowsIcon className="h-[24px]" />
          </div>
        )}
      </div>
      <div className="header-center" />
      <div className="header-right" >
        <DropdownMenu>
          <DropdownMenuTrigger>
            <DotsVerticalIcon className="w-[28px] h-[28px]" />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>
              {t('common.account')}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              {t('common.profile')}
            </DropdownMenuItem>
            <DropdownMenuItem>
              {t('common.settings')}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={logout}>
              {t('common.logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default withUserContext(HeaderBase);
