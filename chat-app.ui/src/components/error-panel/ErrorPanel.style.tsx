import styled from 'styled-components';
import { ErrorPanelBase } from './ErrorPanel';

const ErrorPanel = styled(ErrorPanelBase)`
  position: absolute;
  left: 50%;
  top: 50%;

  font-weight: bold;

  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
`;
ErrorPanel.displayName = 'ComingSoon';

export default ErrorPanel;
