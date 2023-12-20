import { Schema, Types } from 'mongoose';
import Joi from 'joi';
import { USERS_COLLECTION_NAME } from '..';

export interface IMessage {
  _id: Types.ObjectId;
  id: string;
  channel: Types.ObjectId;
  sender: Types.ObjectId;
  text: string;
  read?: boolean;
  createdAt: Date;
  updatedAt?: Date;
  archived?: boolean;
}

export interface IMessageRes extends Omit<IMessage, '_id' | 'channel' | 'sender' | 'createdAt' | 'updatedAt'> {
  _id: string;
  channel: string;
  sender: string;
  createdAt: string;
  updatedAt?: string;
}

export const messagesSchema = new Schema<IMessage>({
  channel: {
    type: Schema.Types.ObjectId,
    required: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: USERS_COLLECTION_NAME,
    required: true
  },
  text: { type: String, required: true },
  read: { type: Boolean, default: false },
  archived: { type: Boolean, default: false }
}, { timestamps: true });

// virtualize _id to id when doing query
messagesSchema.virtual('id').get(function () {
  return this._id.toString();
});

// Ensure virtual fields are serialised.
messagesSchema.set('toJSON', {
  virtuals: true
});

export interface IStartConversationReq {
  receiver: string;
  text: string;
};

export const startConversationReqSchema = Joi.object<IStartConversationReq>({
  receiver: Joi.string().required(),
  text: Joi.string().required()
});

export interface ISendMsgReq {
  text: string;
};

export const sendMsgReqSchema = Joi.object<ISendMsgReq>({
  text: Joi.string().required()
});

export type IEditMsgReq = ISendMsgReq

export const editMsgPayloadSchema = Joi.object<IEditMsgReq>({
  text: Joi.string().required()
});

export const messagesSwagger = {
  startConversation: {
    type: 'object',
    properties: {
      receiver: { type: 'string', required: true },
      text: { type: 'string', required: true }
    }
  },
  sendMsg: {
    type: 'object',
    properties: {
      text: { type: 'string', required: true }
    }
  },
  editMsg: {
    type: 'object',
    properties: {
      text: { type: 'string' }
    }
  }
};
