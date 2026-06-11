import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TaxProfileDocument = HydratedDocument<TaxProfile>;

@Schema({
  collection: 'tax_profiles',
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret: Record<string, unknown>) => {
      ret.id = ret._id?.toString();
      delete ret._id;
      delete ret.owner;
      return ret;
    },
  },
})
export class TaxProfile {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true,
  })
  owner!: Types.ObjectId;

  // The full tax setup form (string fields keyed by name).
  @Prop({ type: Object, default: {} })
  data!: Record<string, string>;
}

export const TaxProfileSchema = SchemaFactory.createForClass(TaxProfile);
