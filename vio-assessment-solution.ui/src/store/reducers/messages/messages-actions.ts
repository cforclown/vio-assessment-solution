import { ISendMsgPayload } from '@/pages/home/pages/channels/channels.service';
import { IReducerAction } from '@/utils/common';
import { createAction } from '@reduxjs/toolkit';

export const getMsgsAction = createAction('getMsgsAction');

export const onMsgAction = createAction('onMsgAction');

export const sendMsgAction = createAction<IReducerAction<ISendMsgPayload>>('sendMsgAction');
