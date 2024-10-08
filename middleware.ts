import acceptLanguage from "accept-language";
import { NextRequest, NextResponse } from "next/server";
import { fallbackLng, languages, cookieName } from "./app/i18n/settings";

acceptLanguage.languages(languages);

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get(cookieName);
  const lng = cookie
    ? acceptLanguage.get(cookie.value)
    : acceptLanguage.get(request.headers.get("Accept-Language")) || fallbackLng;
  const session = request.cookies.get("session")?.value;
  const pathname = request.nextUrl.pathname;

  const protectedRoutes = [
    "/checkout",
    `/${lng}/checkout`,
    "/admin",
    `/${lng}/admin`,
    "/profile",
    `/${lng}/profile`,
  ];

  if (!session && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL(`/${lng}/login`, request.url));
  }

  if (session) {
    if (pathname === `/${lng}/login` || pathname === `/${lng}/signup`)
      return NextResponse.redirect(new URL(`/${lng}`, request.url));
    if (pathname === `/${lng}/profile`) {
      return NextResponse.redirect(
        new URL(`/${lng}/profile/home`, request.url)
      );
    }
    if (pathname === `/${lng}/admin`) {
      return NextResponse.redirect(new URL(`/${lng}/admin/home`, request.url));
    }
  }

  if (
    !languages.some((loc) => pathname.startsWith(`/${loc}`)) &&
    !pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(new URL(`/${lng}${pathname}`, request.url));
  }

  const referer = request.headers.get("referer");
  if (referer) {
    const refererUrl = new URL(referer);
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/search",
    "/signup",
    "/login",
    "/checkout/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|profilepic.webp|robots.txt|sitemap.xml|sw.js|site.webmanifest|fonts|images|assets|invoices|products|icons|webhooks/stripe).*)",
  ],
};
