import type { CookieOptions } from "express";

export const getCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
