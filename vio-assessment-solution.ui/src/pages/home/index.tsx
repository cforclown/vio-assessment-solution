import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { collapseSidebar, hideSidebar, setIsSM, showSidebar, uncollapseSidebar } from '@/store/reducers/layout';
import Header from './header/header.style';
import Content from './content';
import { selectTheme } from '@/store/reducers/layout/theme-selectors';
import { selectLayoutState } from '@/store/reducers/layout/layout-selectors';
import { MD_BREAKPOINT, SM_BREAKPOINT } from '@/utils/common';
import Sidebar from './sidebar';
import withUserContext, { IWithUserContext } from '@/components/HOC/withUserContext';

interface IHome extends IWithUserContext {
  className?:string
}

function Home({ className }: IHome): JSX.Element {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme());
  const layoutState = useSelector(selectLayoutState());

  useEffect(() => {
    window.addEventListener('resize', onresize);
    onresize();

    // UNMOUNT
    return () => {
      window.removeEventListener('resize', onresize);
    };
  }, [layoutState.isSm]);

  const onresize = useCallback(() => {
    const currentWidth = window.innerWidth;
    setSidebarCollapsed(currentWidth <= MD_BREAKPOINT);
    if (currentWidth <= SM_BREAKPOINT && !layoutState.isSm) {
      setLayoutIsSM(true);
    } else if (currentWidth > SM_BREAKPOINT && layoutState.isSm) {
      setLayoutIsSM(false);
    }
  }, [layoutState.isSm]);

  const setLayoutIsSM = (isSM: boolean): void => {
    dispatch(setIsSM(isSM));
  };

  const setSidebarCollapsed = (collapsed: boolean): void => {
    dispatch(collapsed ? collapseSidebar() : uncollapseSidebar());
  };

  const setSidebarHidden = (hide: boolean): void => {
    dispatch(hide ? hideSidebar() : showSidebar());
  };

  return (
    <div 
      className={twMerge(
        className, 
        'relative flex flex-row justify-start items-start w-screen h-screen overflow-hidden',
        `bg-${theme.bg}`)
      }
    >
      <Sidebar 
        collapsed={layoutState.isSm ? false : layoutState.sidebarState.collapsed} 
        hidden={layoutState.sidebarState.hidden} 
        onBreakpoint={setSidebarHidden} 
        onBackdropClick={() => setSidebarHidden(true)} 
      />

      <div className="relative h-full w-full flex flex-col justify-start items-center">
        <Header 
          showSidebarToggler={!!layoutState.sidebarState.hidden} 
          onToggleSidebar={() => setSidebarHidden(false)} 
        />
        <Content />
      </div>
    </div>
  );
}

export default withUserContext(Home);
