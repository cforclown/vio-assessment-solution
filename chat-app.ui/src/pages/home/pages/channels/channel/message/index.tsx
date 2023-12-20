import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';

export interface IChatMsg {
  text: string;
  isFromYou?: boolean;
}

const ChatBubble = styled.div<Omit<IChatMsg, 'text'>>`
  position: relative;
  max-width: 50%;
  background-color: ${({ isFromYou, theme }) => isFromYou ? `${theme.colors.primary}99` : '#E8E8E8'};
  border-radius: 6px 6px ${({ isFromYou }) => isFromYou ? '0 6px' : '6px 0'};
  color: ${({ isFromYou, theme }) => isFromYou ? 'white' : theme.colors.dark};
  text-wrap: wrap;
  word-wrap: break-word;
  display: inline-block;
  text-align: left;

  &:${({ isFromYou }) => isFromYou ? 'after' : 'before'}{
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: ${({ isFromYou }) => isFromYou ? 'auto' : '0px'};
    right: ${({ isFromYou }) => isFromYou ? '0px' : 'auto'};
    bottom: -8px;
    border: 4px solid;
    border-color: ${({ isFromYou, theme }) => {
    if (isFromYou) {
      return `${theme.colors.primary}99 ${theme.colors.primary}99 transparent transparent`;
    }
        
    return '#E8E8E8 transparent transparent #E8E8E8';
  }};
  }
`;

function Message({ text, isFromYou }: IChatMsg) {
  return (
    <div className={twMerge('w-full flex', isFromYou ? 'justify-end' : 'justify-start')}>
      <ChatBubble className="px-4 py-2" isFromYou={isFromYou}>
        {text}
      </ChatBubble>
    </div>
  );
}

export default Message;
