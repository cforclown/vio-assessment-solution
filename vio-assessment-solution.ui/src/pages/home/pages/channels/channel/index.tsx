import { useSelector } from 'react-redux';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import Messages from './messages';
import ChatFormDummyContainer from './new-channel-temp';
import withUserContext from '@/components/HOC/withUserContext';
import Loader from '@/components/loader/Loader.style';
import useAction from '@/hooks/useAction';
import { selectChannelsState } from '@/store/reducers/channels/channels-selectors';
import { useEffect } from 'react';
import { selectMsgsState } from '@/store/reducers/messages/messages-selectors';
import { getMsgsAction } from '@/store/reducers/messages/messages-actions';
import { setSelectedChannelAction } from '@/store/reducers/channels/channels-actions';

function ChannelChat(): JSX.Element {
  const { channelId } = useParams();
  const channelsState = useSelector(selectChannelsState());
  const { loading: channelsLoading, channels, selectedChannel } = channelsState;
  const { state } = useLocation();
  const setSelectedChannel = useAction(setSelectedChannelAction);
  const getMsgs = useAction(getMsgsAction);
  const { msgs, loading: fetchingMsgs } = useSelector(selectMsgsState());

  // unmount
  useEffect(() => () => {
    setSelectedChannel(undefined);
  }, []);

  useEffect(() => {
    if (selectedChannel?.id === channelId) {
      return;
    }

    if (channelId === 'new' && state?.channel && state?.user) {
      setSelectedChannel(state.channel);
      return;
    }

    const channel = channels.find(c => c.id === channelId);
    if (channel) {
      setSelectedChannel(channel);
      getMsgs(channel.id);
    }
  }, [channelId, channels]);

  if (channelsLoading) {
    return (
      <Loader />
    );
  }

  if (
    !channelId ||
    (channelId !== 'new' && !channels.find(c=>c.id === channelId)) ||
    (channelId === 'new' && (!state?.channel || !state?.user))
  ) {
    return (
      <Navigate to="/"/>
    );
  }

  if (channelId === 'new') {
    return (
      <ChatFormDummyContainer recipient={state.user} /> 
    );
  }

  return (
    <Messages 
      channel={channelId}
      fetchingMsgs={fetchingMsgs}
      msgs={msgs}
    />
  );
}

export default withUserContext(ChannelChat);
