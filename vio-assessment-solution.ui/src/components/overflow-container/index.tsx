import {
  HTMLProps, LegacyRef, PropsWithChildren, forwardRef
} from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

interface IOverflowContainer extends HTMLProps<HTMLDivElement> {
  direction?: 'vertical' | 'horizontal'
  widthauto?: boolean;
  heightauto?: boolean;
  containerClassName?: string;
}

const Container = styled.div<IOverflowContainer>`
  ${(props) => (props.widthauto ? `
    width: auto;
    min-width: 240px;
  ` : `
    width: 100%;
  `)};
  height: ${(props) => (props.heightauto ? 'auto' : '100%')};
  overflow: hidden;
  position: relative;
  z-index: 10;
  
  .overflow-container {
    width: 100%;
    height: 100%;
    overflow: ${(props) => (props.direction === 'horizontal' ? 'auto hidden' : 'hidden auto')};
    scrollbar-color: #80808098 transparent;
    scrollbar-width: thin;
    
    position: relative;
    z-index: 10;

    display: flex;
    flex-direction: ${(props) => (props.direction === 'horizontal' ? 'row' : 'column')};
    align-items: flex-start;
  }
`;

function OverflowContainer({
  direction, children, containerClassName, className, ...props
}: PropsWithChildren<IOverflowContainer>, ref?: LegacyRef<HTMLDivElement>): JSX.Element {
  return (
    <Container className={containerClassName} direction={direction} widthauto={props.widthauto} heightauto={props.heightauto}>
      <div className={classNames('overflow-container', className)} {...props} ref={ref}>
        {children}
      </div>
    </Container>
  );
}

export default forwardRef(OverflowContainer);
