import styled from 'styled-components';
import StyledSpinner from '../spinner/Spinner.style';
import { LoaderBase } from './Loader';

const Loader = styled(LoaderBase)`
  width: 100%; 
  height: 100%;
  background: ${({ withOverlay, overlayColor }) => withOverlay ? overlayColor ?? '#ffffff8a' : 'transparent'};

  position: absolute;
  left: 0;
  top: 0;

  ${StyledSpinner} {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
  }
`;
Loader.displayName = 'Loader';

export default Loader;
