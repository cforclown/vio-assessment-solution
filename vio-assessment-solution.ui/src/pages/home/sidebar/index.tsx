import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Sidebar as ReactProSidebar } from 'react-pro-sidebar';
import { selectTheme } from '@/store/reducers/layout/theme-selectors';
import SidebarHeader from './sidebar-header';
import withUserContext, { IWithUserContext } from '@/components/HOC/withUserContext';
import SidebarFooter from './sidebar-footer';
import SidebarBody from './sidebar-body';

export interface ISidebar extends IWithUserContext {
  collapsed: boolean;
  hidden: boolean;
  onBreakpoint(onBreakpoint: boolean): void;
  onBackdropClick(): void;
  className?: string;
}

const Container = styled(ReactProSidebar)`
  background-color: ${props => props.theme.sidebar.bg};
  box-shadow: 1px 3px 6px #00000040;
`;

function Sidebar({ collapsed, onBreakpoint, onBackdropClick, hidden }: ISidebar): JSX.Element {
  const theme = useSelector(selectTheme());

  return (
    <Container 
      width="220px"
      collapsed={collapsed} 
      toggled={!hidden}
      onBreakPoint={onBreakpoint}
      onBackdropClick={onBackdropClick}
      breakPoint="sm"
      backgroundColor={theme.sidebar.bg}
    >
      <div className="h-screen flex flex-col justify-start items-start">
        <SidebarHeader collapsed={collapsed} />
        <SidebarBody />
        <SidebarFooter />
      </div>
    </Container>
  );
}

export default withUserContext(Sidebar);
