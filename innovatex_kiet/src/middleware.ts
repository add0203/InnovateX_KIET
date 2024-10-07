import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {
  // Get the current path
  const path = request.nextUrl.pathname;

  // Define public paths
  const isPublicPath =
    path === "/users/login" ||
    path === "/users/signup" ||
    path === "/users/verifyemail";

  // Get the token from cookies
  const token = request.cookies.get("token")?.value || "";

  // If the user is not logged in and trying to access a protected path, redirect to /users/login
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/users/login", request.url));
  }

  // If the user is logged in (token exists) and tries to access public paths, redirect to /
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow access to all other paths if the user is logged in
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/users/login",
    "/users/signup",
    "/users/verifyemail",
    "/users/profile",
    "/dashboard",
    "/feeds",
    "/messages",
    "/notification",
    "/settings/account",
    "/settings/privacy",
    "/users/me",
    "/about",
    // Add any other protected routes here
  ],
};
