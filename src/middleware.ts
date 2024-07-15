import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  
  const path = request.nextUrl.pathname; // ✨ Represents the current path we are on
  console.log("Path = ", path);

  const isPublicPath = path === "/login" || path === "/signup";
  const isRootPath = path === "/";

  const token = request.cookies.get("tweek_token")?.value || "";

  if(isRootPath){
    if(token){
      return  NextResponse.redirect(new URL('/home', request.nextUrl));
    }
  }

  if(isPublicPath && token){
    return NextResponse.redirect(new URL('/home', request.nextUrl));
  }

  if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/home",
    "/explore",
    ],
};
