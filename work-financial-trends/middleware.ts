// middleware.ts
import { getToken } from "next-auth/jwt";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const protectedPaths = ["/dashBS", "/dashMO", "/bs", "/mo", "/profile"];
  const isPathProtected = protectedPaths?.some((path) => pathname == path);
  const res = NextResponse.next();
  const token = await getToken({ req });
  if (isPathProtected) {
    if (!token) {
      const url = new URL(`/`, req.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }
  return res;
}