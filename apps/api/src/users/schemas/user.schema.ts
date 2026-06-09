import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserRole = 'admin' | 'member' | 'viewer';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret: Record<string, unknown>) => {
      ret.id = ret._id?.toString();
      delete ret._id;
      delete ret.password;
      delete ret.refreshTokenHash;
      delete ret.resetCodeHash;
      delete ret.resetCodeExpires;
      delete ret.resetCodeAttempts;
      return ret;
    },
  },
})
export class User {
  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  })
  email!: string;

  // Never returned by default — must be explicitly `.select('+password')`.
  @Prop({ required: true, select: false })
  password!: string;

  @Prop({ trim: true })
  name?: string;

  @Prop()
  avatarUrl?: string;

  @Prop({
    type: String,
    enum: ['admin', 'member', 'viewer'],
    default: 'member',
  })
  role!: UserRole;

  // Hash of the currently-valid refresh token; cleared on logout.
  @Prop({ type: String, select: false, default: null })
  refreshTokenHash?: string | null;

  // ─── Password reset (OTP) ───────────────────────────────────────────────────
  @Prop({ type: String, select: false, default: null })
  resetCodeHash?: string | null;

  @Prop({ type: Date, select: false, default: null })
  resetCodeExpires?: Date | null;

  @Prop({ type: Number, select: false, default: 0 })
  resetCodeAttempts!: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
