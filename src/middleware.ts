import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  
  const token = request.cookies.get("jwt_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname === "/" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

   // Tambahkan Authorization Bearer ke setiap request
   const requestHeaders = new Headers(request.headers);
   requestHeaders.set("Authorization", `Bearer ${token}`);
 
   return NextResponse.next({
     request: {
       headers: requestHeaders,
     },
   });
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login|register|elogBanner.png).*)',
  ],
}