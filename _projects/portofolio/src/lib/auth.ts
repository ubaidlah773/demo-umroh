import crypto from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "./prisma";

const SECRET = process.env.AUTH_SECRET || "ahmad-ubai-portfolio-super-secret-2026-key";
const COOKIE_NAME = "portfolio_admin_token";

export interface SessionUser {
  id: string;
  username: string;
  email: string;
  name: string;
  role: string;
}

// Generate signed session token: header.payload.signature
export function createToken(payload: { id: string; username: string; role: string }): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days expiration
  const data = Buffer.from(JSON.stringify({ ...payload, exp })).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(`${header}.${data}`)
    .digest("base64url");

  return `${header}.${data}.${signature}`;
}

// Verify token signature and expiration
export function verifyToken(token: string): { id: string; username: string; role: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [header, data, signature] = parts;
    const expectedSignature = crypto
      .createHmac("sha256", SECRET)
      .update(`${header}.${data}`)
      .digest("base64url");

    if (signature !== expectedSignature) return null;

    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf-8"));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) return null;

    return payload;
  } catch {
    return null;
  }
}

// Get currently authenticated session user
export async function getSession(req?: any): Promise<SessionUser | null> {
  let token: string | undefined;

  try {
    const cookieStore = cookies();
    token = cookieStore.get(COOKIE_NAME)?.value;
  } catch {
    // cookies() might fail outside Next request context
  }

  if (!token && req) {
    const authHeader =
      req.headers?.get?.("authorization") || req.headers?.authorization;
    if (authHeader && typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

  if (!token) return null;

  const verified = verifyToken(token);
  if (!verified) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: verified.id },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
      },
    });
    return user;
  } catch {
    return null;
  }
}

// Cookie setter
export function setSessionCookie(
  response: NextResponse,
  token: string,
  isSecure: boolean = false
) {
  response.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: isSecure,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

// Clear cookie on logout
export function clearSessionCookie(response: NextResponse) {
  response.cookies.delete(COOKIE_NAME);
}
