import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE } from "@/lib/auth-tokens";

// Routes reachable without a session. Everything else requires auth.
const PUBLIC_PATHS = ["/login", "/register", "/reset-password"];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const isAuthed = req.cookies.has(AUTH_COOKIE);
  const isPublic = isPublicPath(pathname);

  // Block protected routes when there's no session — makes the dashboard
  // unreachable without signing in.
  if (!isAuthed && !isPublic) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.search = `?next=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(url);
  }

  // Keep signed-in users out of the auth screens.
  if (isAuthed && isPublic) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Run on everything except API routes, Next internals, and static assets.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|assets|fonts).*)",
  ],
};
