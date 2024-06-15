import { selectTheme } from '@/store/reducers/layout/theme-selectors';
import { Menu, menuClasses } from 'react-pro-sidebar';
import { useSelector } from 'react-redux';
import SidebarItem from '../sidebar-item';
import OverflowContainer from '@/components/overflow-container';
import { sidebarItems } from '../sidebar-items';

function SidebarBody() {
  const theme = useSelector(selectTheme());

  return (
    <OverflowContainer>
      <Menu 
        className="w-full" 
        menuItemStyles={{
          button: {
            height: 48,
            color: theme.sidebar.textColor,
            backgroundColor: theme.sidebar.bg,
            padding: '0 12px',
            '&:hover': {
              color: theme.sidebar.itemActiveTextColor,
              backgroundColor: theme.sidebar.itemActiveBg,
            },
            [`&.${menuClasses.active}`]: {
              color: theme.sidebar.itemActiveTextColor,
              backgroundColor: theme.sidebar.itemActiveBg,
            },
          },
        }}
      >
        {sidebarItems.map((item) => (
          <SidebarItem 
            key={item.id} 
            label={item.label} 
            path={item.path} 
          />
        ))}
      </Menu>
    </OverflowContainer>
  );
}

export default SidebarBody;
