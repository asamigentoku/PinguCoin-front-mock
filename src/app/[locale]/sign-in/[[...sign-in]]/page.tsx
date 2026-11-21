import { notFound } from "next/navigation";
import { MockAuthForm } from "@/components/auth/mock-auth-form";
import { routing, type AppLocale } from "@/i18n/routing";

export default async function SignInPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as AppLocale;
  if (!routing.locales.includes(locale)) notFound();
  return <MockAuthForm locale={locale} />;
}
