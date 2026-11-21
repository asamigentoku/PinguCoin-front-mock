import type { AppLocale } from "@/i18n/routing";
import { authCopy } from "@/lib/mock-auth-copy";
import { mockUsers } from "@/lib/mock-auth";
import { signInMock } from "@/app/mock-auth-actions";

export function MockAuthForm({ locale }: { locale: AppLocale }) {
  const copy = authCopy[locale];
  return (
    <section className="mock-auth shell">
      <div className="form-card mock-auth-card">
        <h1>{copy.title}</h1>
        <p>{copy.lead}</p>
        <div className="mock-account-list">
          {mockUsers.map((user) => (
            <form action={signInMock} key={user.id}>
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="account" value={user.id} />
              <button className="mock-account-button" type="submit">
                <span className="mock-avatar" aria-hidden="true">{user.initials}</span>
                <span><strong>{user.name}</strong><small>{user.email} · {user.role}</small></span>
                <span aria-hidden="true">›</span>
              </button>
            </form>
          ))}
        </div>
      </div>
    </section>
  );
}
