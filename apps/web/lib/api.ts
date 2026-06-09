import { createClient } from "@suite/sdk";
import { getAccessToken } from "./auth-tokens";

/**
 * Shared API client for the web app. Reads the access token from storage on
 * every request so it always sends the current Bearer token.
 *
 * 401 handling (token expiry / refresh) is coordinated by AuthProvider, so we
 * intentionally don't redirect here.
 */
export const api = createClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  getToken: () => getAccessToken(),
});
