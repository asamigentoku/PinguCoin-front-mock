"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { MOCK_SESSION_COOKIE, mockUsers } from "@/lib/mock-auth";

function localeOf(value: FormDataEntryValue | null): AppLocale { return routing.locales.includes(value as AppLocale) ? value as AppLocale : "ja"; }

export async function signInMock(formData: FormData) {
  const locale = localeOf(formData.get("locale"));
  const account = String(formData.get("account") ?? "");
  if (!mockUsers.some((user) => user.id === account)) redirect(`/${locale}/sign-in`);
  (await cookies()).set(MOCK_SESSION_COOKIE, account, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
  redirect(`/${locale}`);
}

export async function signOutMock(formData: FormData) {
  const locale = localeOf(formData.get("locale"));
  (await cookies()).delete(MOCK_SESSION_COOKIE);
  redirect(`/${locale}/sign-in`);
}
