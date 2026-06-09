import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export const BUDGET_PERIODS = [
  'weekly',
  'monthly',
  'quarterly',
  'yearly',
  'custom',
] as const;
export type BudgetPeriod = (typeof BUDGET_PERIODS)[number];

// ─── Embedded: spend entry ──────────────────────────────────────────────────
@Schema({ _id: true, timestamps: true })
export class SpendEntry {
  @Prop({ required: true, min: 0 })
  amount!: number;

  @Prop({ trim: true })
  label?: string;

  @Prop({ type: Date, default: () => new Date() })
  spentAt!: Date;
}
export const SpendEntrySchema = SchemaFactory.createForClass(SpendEntry);

export type BudgetDocument = HydratedDocument<Budget>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret: Record<string, unknown>) => {
      ret.id = ret._id?.toString();
      delete ret._id;
      return ret;
    },
  },
})
export class Budget {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  owner!: Types.ObjectId;

  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, trim: true })
  category!: string;

  // Optional presentation hint (hex), mirrors the dashboard category colors.
  @Prop({ trim: true })
  color?: string;

  @Prop({ required: true, min: 0 })
  amount!: number;

  @Prop({ min: 0, default: 0 })
  spent!: number;

  @Prop({ trim: true })
  linkedAccount?: string;

  @Prop({ type: String, enum: BUDGET_PERIODS, default: 'monthly' })
  period!: BudgetPeriod;

  @Prop({ default: true })
  autoRenew!: boolean;

  // Percentage of the budget at which to warn (e.g. 80).
  @Prop({ min: 0, max: 100, default: 80 })
  alertThreshold!: number;

  @Prop({ type: [String], default: [] })
  assignedTo!: string[];

  @Prop({ trim: true })
  notes?: string;

  @Prop({ type: Date })
  periodStart?: Date;

  @Prop({ type: Date })
  periodEnd?: Date;

  @Prop({ type: [SpendEntrySchema], default: [] })
  entries!: SpendEntry[];
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);

BudgetSchema.virtual('remaining').get(function (this: Budget) {
  return Math.max(0, +(this.amount - this.spent).toFixed(2));
});

BudgetSchema.virtual('progress').get(function (this: Budget) {
  if (this.amount <= 0) return 0;
  return Math.min(100, Math.round((this.spent / this.amount) * 100));
});

BudgetSchema.virtual('status').get(function (this: Budget) {
  if (this.spent > this.amount) return 'exceeded';
  const pct = this.amount > 0 ? (this.spent / this.amount) * 100 : 0;
  if (pct >= this.alertThreshold) return 'needs_attention';
  return 'on_track';
});
