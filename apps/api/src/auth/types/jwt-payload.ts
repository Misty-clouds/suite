import { UserRole } from '../../users/schemas/user.schema';

export interface JwtPayload {
  /** User id (Mongo `_id`). */
  sub: string;
  email: string;
  role: UserRole;
}

/** Shape attached to `request.user` after the JWT guard runs. */
export interface AuthenticatedUser {
  userId: string;
  email: string;
  role: UserRole;
}
