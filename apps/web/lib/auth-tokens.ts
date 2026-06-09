/**
 * Token storage for the web app.
 *
 * - Access/refresh tokens live in localStorage and are sent as Bearer tokens
 *   by the SDK.
 * - A lightweight, non-sensitive `suite_authed` cookie mirrors "has a session"
 *   so Next.js middleware can gate navigation on the server/edge (it cannot
 *   read localStorage). The real token is still validated client-side.
 */

const ACCESS_KEY = "suite_access_token";
const REFRESH_KEY = "suite_refresh_token";

export const AUTH_COOKIE = "suite_authed";
// Matches the refresh-token lifetime (7d) so the gate cookie doesn't outlive
// the session it represents.
const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(REFRESH_KEY);
}

export function setTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACCESS_KEY, accessToken);
  window.localStorage.setItem(REFRESH_KEY, refreshToken);
  document.cookie = `${AUTH_COOKIE}=1; path=/; max-age=${AUTH_COOKIE_MAX_AGE}; samesite=lax`;
}

export function clearTokens(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ACCESS_KEY);
  window.localStorage.removeItem(REFRESH_KEY);
  document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0; samesite=lax`;
}
