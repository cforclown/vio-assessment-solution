import { Schema, Types } from 'mongoose';
import { IService, serviceStatuses } from 'vio-assessment-solution.contracts';

export interface IServiceDoc extends IService {
  _id: Types.ObjectId;
}

export const SERVICES_COLLECTION_NAME = 'services';

export const servicesModelSchema = new Schema<IServiceDoc>({
  name: { type: String },
  repoUrl: { type: String, required: true },
  status: { type: String, enum: serviceStatuses, default: 'pending' },
  containerId: { type: String, default: null },
  url: { type: String, default: null },
  desc: { type: String, default: null },
  createdBy: { type: Schema.Types.ObjectId, ref: 'users', required: true }
}, { timestamps: true });

// virtualize _id to id when doing query
servicesModelSchema.virtual('id').get(function () {
  return this._id.toString();
});

// Ensure virtual fields are serialised.
servicesModelSchema.set('toJSON', { virtuals: true });

// Ensure virtual fields are serialised.
servicesModelSchema.set('toObject', { virtuals: true });
