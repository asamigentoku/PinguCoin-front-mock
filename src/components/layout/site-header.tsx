import { Link } from "@/i18n/navigation";
import { SearchIcon } from "../ui/icons";
import { Brand } from "./brand";
import { CartButton } from "./cart-button";
import { LocaleSwitcher } from "./locale-switcher";
import { MainNav } from "./main-nav";
import { PointBalance } from "./point-balance";
import { getLocale, getTranslations } from "next-intl/server";
import { getMockUser } from "@/lib/mock-auth";
import { authCopy } from "@/lib/mock-auth-copy";
import { signOutMock } from "@/app/mock-auth-actions";
import type { AppLocale } from "@/i18n/routing";

export async function SiteHeader() {
  const t = await getTranslations("Navigation");
  const locale = await getLocale() as AppLocale;
  const user = await getMockUser();
  const copy = authCopy[locale];
  return (
    <header className="site-header">
      <div className="site-header-inner shell">
        <Brand />
        <MainNav />
        <div className="header-actions">
          {user && <PointBalance />}
          <Link className="header-icon-link" href="/products" aria-label={t("search")}><SearchIcon /></Link>
          {user ? <>
            <Link className="header-manage-link" href="/purchases">{t("purchases")}</Link>
            <Link className="header-manage-link" href="/sell/manage">{t("manage")}</Link>
            <details className="mock-user-menu">
              <summary className="mock-avatar" title={`${copy.signedInAs}: ${user.email}`}>{user.initials}</summary>
              <div className="mock-user-popover">
                <strong>{user.name}</strong><small>{user.email}</small>
                <form action={signOutMock}><input type="hidden" name="locale" value={locale} /><button type="submit">{copy.logout}</button></form>
              </div>
            </details>
          </> : <Link className="auth-link" href="/sign-in">{copy.signIn}</Link>}
          <CartButton />
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
