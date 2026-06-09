import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export const INVOICE_STATUSES = [
  'draft',
  'sent',
  'viewed',
  'partially_paid',
  'paid',
  'cancelled',
] as const;
export type InvoiceStatus = (typeof INVOICE_STATUSES)[number];

export const PAYMENT_METHODS = [
  'bank_transfer',
  'card',
  'cash',
  'cheque',
  'other',
] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

// ─── Embedded: line item ────────────────────────────────────────────────────
@Schema({ _id: false })
export class LineItem {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, min: 0, default: 1 })
  quantity!: number;

  @Prop({ required: true, min: 0, default: 0 })
  unitPrice!: number;
}
export const LineItemSchema = SchemaFactory.createForClass(LineItem);

// ─── Embedded: client snapshot ──────────────────────────────────────────────
@Schema({ _id: false })
export class InvoiceClient {
  @Prop({ type: Types.ObjectId, ref: 'Client' })
  clientId?: Types.ObjectId;

  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ trim: true })
  email?: string;

  @Prop({ trim: true })
  address?: string;
}
export const InvoiceClientSchema = SchemaFactory.createForClass(InvoiceClient);

// ─── Embedded: payment ──────────────────────────────────────────────────────
@Schema({ _id: true, timestamps: true })
export class Payment {
  @Prop({ required: true, min: 0 })
  amount!: number;

  @Prop({ type: String, enum: PAYMENT_METHODS, default: 'bank_transfer' })
  method!: PaymentMethod;

  @Prop({ trim: true })
  reference?: string;

  @Prop({ type: Date, default: () => new Date() })
  paidAt!: Date;

  @Prop({ trim: true })
  note?: string;
}
export const PaymentSchema = SchemaFactory.createForClass(Payment);

export type InvoiceDocument = HydratedDocument<Invoice>;

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
export class Invoice {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  owner!: Types.ObjectId;

  @Prop({ required: true, trim: true })
  invoiceNumber!: string;

  @Prop({ type: InvoiceClientSchema, required: true })
  client!: InvoiceClient;

  @Prop({ trim: true })
  projectName?: string;

  @Prop({ trim: true })
  notes?: string;

  @Prop({ type: Date })
  issueDate?: Date;

  @Prop({ type: Date })
  dueDate?: Date;

  @Prop({ type: [LineItemSchema], default: [] })
  items!: LineItem[];

  // Percentage, e.g. 7 for GST 7%.
  @Prop({ min: 0, max: 100, default: 0 })
  taxRate!: number;

  // Flat discount applied to the subtotal.
  @Prop({ min: 0, default: 0 })
  discount!: number;

  // ─── Computed + persisted for sorting/filtering ─────────────────────────────
  @Prop({ min: 0, default: 0 })
  subtotal!: number;

  @Prop({ min: 0, default: 0 })
  taxAmount!: number;

  @Prop({ min: 0, default: 0 })
  total!: number;

  @Prop({ min: 0, default: 0 })
  amountPaid!: number;

  @Prop({
    type: String,
    enum: INVOICE_STATUSES,
    default: 'draft',
    index: true,
  })
  status!: InvoiceStatus;

  @Prop({ type: [PaymentSchema], default: [] })
  payments!: Payment[];
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);

// Outstanding balance.
InvoiceSchema.virtual('amountDue').get(function (this: Invoice) {
  return Math.max(0, +(this.total - this.amountPaid).toFixed(2));
});

// Display status surfaces "overdue" without mutating the stored lifecycle.
InvoiceSchema.virtual('displayStatus').get(function (this: Invoice) {
  const due = this.total - this.amountPaid;
  if (
    this.dueDate &&
    due > 0 &&
    (this.status === 'sent' ||
      this.status === 'viewed' ||
      this.status === 'partially_paid') &&
    this.dueDate.getTime() < Date.now()
  ) {
    return 'overdue';
  }
  return this.status;
});

// One invoice number per owner.
InvoiceSchema.index({ owner: 1, invoiceNumber: 1 }, { unique: true });
