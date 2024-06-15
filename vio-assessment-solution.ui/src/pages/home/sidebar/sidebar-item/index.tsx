import { matchPath, useNavigate } from 'react-router-dom';
import { MenuItem } from 'react-pro-sidebar';
import styled from 'styled-components';
import { Label } from '@/components/ui/label';

const Container = styled.div`
  color: ${({ theme }) => theme.sidebar.itemTextColor};

  > label {
    max-width: 132px;
    text-overflow: ellipsis;
    overflow: hidden;

    &.last-msg {
      color: ${({ theme }) => theme.sidebar.itemTextColor}bb;
    }
  }
`;

interface ISidebarItemProps {
  label: string;
  path?: string;
}

export default function SidebarItem({ 
  label: title,
  path
}: ISidebarItemProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <MenuItem 
      active={!!path && !!matchPath(`/${path}/*`, location.pathname)} 
      onClick={() => path && navigate(path)}
    >
      <div className="relative flex flex-row justify-start items-center gap-2">
        <Container className="flex flex-col justify-center items-start gap-1">
          <Label className="font-bold">{title}</Label>
        </Container>
      </div>
    </MenuItem>
  );
}
