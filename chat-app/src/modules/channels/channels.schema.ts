import { Document, Schema, Types } from 'mongoose';
import Joi from 'joi';
import { IMessage, IUserRes, messagesSchema, USERS_COLLECTION_NAME } from '..';

export enum EChannelRoles {
  OWNER='owner',
  ADMIN='admin',
  MEMBER='member'
}

export interface IChannelUserRole {
  user: Types.ObjectId;
  role: EChannelRoles;
}

export interface IChannelUserRoleRes {
  user: string;
  role: EChannelRoles;
}

export const channelTypes = ['dm', 'group'] as const;
export type ChannelsTypes = typeof channelTypes[number];
export const isValidChannelType = (channelType: string): channelType is ChannelsTypes => channelTypes.includes(channelType as ChannelsTypes);

export interface IChannel {
  _id: Types.ObjectId;
  id: string;
  name?: string; // only when type==='group'
  type: ChannelsTypes;
  desc?: string;
  users: Types.ObjectId[];
  roles?: IChannelUserRole[]; //  undefined if type==='dm'
  messages: IMessage[];
  createdAt?: Date;
  updatedAt?: Date;
  archived?: boolean;
}

export type IChannelDoc = Document<IChannel>

export interface IChannelRes extends Omit<IChannel, '_id' | 'users' | 'roles' | 'messages'> {
  _id: string;
  users: IUserRes[];
  roles?: IChannelUserRoleRes[]; //  undefined if type==='dm'
  unreadMessages?: number;
  lastMessage?: string;
}

export type ICreateDmChannelReq = {
  type: 'dm',
  users: [Types.ObjectId, Types.ObjectId],
};

export type ICreateGroupChannelReq = {
  type: 'group',
  users: Types.ObjectId[],
  roles: IChannelUserRole,
};

export type IUpdateChannelReq = {
  id: string,
  name?: string,
  desc?: string,
  users?: string[],
  roles?: {
    user: string,
    role: EChannelRoles,
  }[],
};

export const CHANNELS_COLLECTION_NAME = 'channels';

export const channelsSchema = new Schema<IChannel>({
  name: { type: String },
  type: {
    type: String,
    enum: [...channelTypes],
    required: false,
    default: 'dm'
  },
  desc: { type: String, default: null },
  users: {
    type: [{
      type: Types.ObjectId,
      ref: USERS_COLLECTION_NAME
    }],
    required: true
  },
  roles: {
    type: [{
      user: {
        type: Types.ObjectId,
        ref: USERS_COLLECTION_NAME,
        required: true
      },
      role: {
        type: String,
        enum: EChannelRoles,
        default: EChannelRoles.MEMBER
      }
    }],
    default: null
  },
  messages: { type: [messagesSchema], default: [] },
  archived: { type: Boolean, default: false }
}, { timestamps: true });

// virtualize _id to id when doing query
channelsSchema.virtual('id').get(function () {
  return this._id.toString();
});

// Ensure virtual fields are serialised.
channelsSchema.set('toJSON', {
  virtuals: true
});

// Ensure virtual fields are serialised.
channelsSchema.set('toObject', {
  virtuals: true
});

export interface ICreateGroupReq {
  name: string;
  desc?: string;
  users: string[];
  roles: {
    user: string,
    role: EChannelRoles,
  }[];
}

export const createGroupReqSchema = Joi.object<ICreateGroupReq>({
  name: Joi.string().required(),
  desc: Joi.string().allow('').default(null),
  users: Joi.array().items(Joi.string()).required(),
  roles: Joi.array().items(Joi.object({
    user: Joi.string().required(),
    role: Joi.string().allow(EChannelRoles).required()
  })).required()
});

export interface IUpdateGroupReq {
  name?: string;
  desc?: string;
  roles?: {
    user: string,
    role: EChannelRoles,
  }[];
}

export const updateGroupReqSchema = Joi.object<IUpdateGroupReq>({
  name: Joi.string(),
  desc: Joi.string(),
  roles: Joi.array().items(Joi.object({
    user: Joi.string().required(),
    role: Joi.string().allow(EChannelRoles).required()
  }))
});

export const channelsSwagger = {
  createGroup: {
    type: 'object',
    properties: {
      name: { type: 'string', required: true },
      desc: { type: 'date' },
      users: { type: 'array', items: 'string', required: true },
      roles: {
        type: 'object',
        properties: {
          user: { type: 'string', required: true },
          role: { type: 'string', enum: ['owner', 'admin', 'member'], required: true }
        }
      }
    }
  },
  upgradeGroup: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      desc: { type: 'string' },
      roles: {
        type: 'object',
        properties: {
          user: { type: 'string', required: true },
          role: { type: 'string', enum: ['owner', 'admin', 'member'], required: true }
        }
      }
    }
  }
};
