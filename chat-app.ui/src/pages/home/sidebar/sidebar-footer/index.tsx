import { PersonIcon } from '@radix-ui/react-icons';
import withCommonState, { IWithCommonStateProps } from '@/components/HOC/withCommonState';
import { Label } from '@/components/ui/label';
import { useSelector } from 'react-redux';
import { selectLayoutState } from '@/store/reducers/layout/layout-selectors';


function SidebarFooter({ t, navigate }: IWithCommonStateProps) {
  const { sidebarState: { collapsed } } = useSelector(selectLayoutState());
  return (
    <div 
      className="w-full h-[56px] bg-[#FFFFFF22] flex flex-row justify-start items-center gap-2 px-3 text-white font-bold cursor-pointer hover:bg-[#FFFFFF44]"
      onClick={() => navigate('/find-users')}
    >
      {!collapsed && <PersonIcon />}
      <Label className="font-bold">{t('common.findUSers')}</Label>
    </div>
  );
}

export default withCommonState(SidebarFooter);
