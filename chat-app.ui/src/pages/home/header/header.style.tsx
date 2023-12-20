import styled from 'styled-components';
import HeaderBase from './header';


const Header = styled(HeaderBase)`
  width: 100%;
  height: 66px;  /* should be same as sidebar header height */
  
  background-color: ${(props) => props.theme.header.bg};

  margin: 0;
  padding: 0rem 1rem;

  color: ${(props) => props.theme.header.textColor};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  box-shadow: 1px 3px 6px ${(props) => props.theme.header.bg}40;

  .header-left {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
  }

  .header-center {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .header-right {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  .header-sidebar-toggle-btn {
    border: 1px solid ${(props) => props.theme.header.textColor};
    border-radius: 4px;
    padding: 4px 8px;

    cursor: pointer;

    visibility: visible;

    transition: all 0.2s ease-in-out;
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -ms-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
  }
  .header-sidebar-toggle-btn-hidden {
    visibility: collapse;
  }
  .header-sidebar-toggle-btn:hover {
    box-shadow: 0px 0px 4px ${(props) => props.theme.header.textColor}cc;
  }
`;
Header.displayName = 'Header';

export default Header;
