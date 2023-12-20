import withUserContext, { IWithUserContext } from '@/components/HOC/withUserContext';
import { Label } from '@/components/ui/label';
import UserAvatar from '@/components/user-avatar';

export interface ISidebarHeaderProps extends IWithUserContext {
  collapsed: boolean;
}

function SidebarHeader({ collapsed, userContext: { user } }: ISidebarHeaderProps): JSX.Element {
  return (
    <div className="w-full h-[68px] bg-[#FFFFFF22] flex flex-row justify-center items-center gap-2">
      <div className="cursor-pointer">
        <UserAvatar src={user.avatar} size="lg" />
      </div>
      {!collapsed && (
        <div className="flex flex-col justify-center items-start">
          <Label className="text-white font-bold text-ellipsis overflow-hidden max-w-[132px]">{user.fullname}</Label>
          <Label className="text-white text-ellipsis overflow-hidden py-1 max-w-[132px]">{user.email}</Label>
        </div>
      )}
    </div>
  );
}

export default withUserContext(SidebarHeader);
