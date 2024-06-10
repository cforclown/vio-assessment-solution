import { SizeBreakpoints, sizeBreakpointToValue } from '@/utils/common';
import { USER_AVATAR_BASE_URL } from '@/utils/environment';
import { useCallback } from 'react';
import styled from 'styled-components';

export interface IUserAvatarProps {
  src?: string;
  size: SizeBreakpoints | number;
  className?: string;
}

const Container = styled.div<{ size: SizeBreakpoints | number; }>`
  display: block;
  width: ${(props) => sizeBreakpointToValue(props.size)}px;
  height: ${(props) => sizeBreakpointToValue(props.size)}px;
  border-radius: 50%;
  padding: 0;
  img {
    width: ${(props) => sizeBreakpointToValue(props.size)}px;
    height: ${(props) => sizeBreakpointToValue(props.size)}px;
    border-radius: 50%;
    border: none;
    object-fit: cover;

    font-size: 0;
  }
  svg {
    position: absolute;
    left: 0;
    top: 0;
  }
  h6 {
    margin: 0;
    font-size: ${(props) => sizeBreakpointToValue(props.size) / 2}px;
  }
`;

const UserAvatar = ({ src, className, size }: IUserAvatarProps): JSX.Element => {
  const errorHandler = useCallback((event: React.SyntheticEvent<HTMLImageElement, Event>): void => {
    event.currentTarget.src = '/images/default-avatar.png';
  }, []);

  return (
    <Container className={className} size={size}>
      <img
        src={src ? `${USER_AVATAR_BASE_URL}/${src}` : '/images/default-avatar.png'}
        alt="/images/default-avatar.png"
        onError={errorHandler}
      />
    </Container>
  );
};

export default UserAvatar;
