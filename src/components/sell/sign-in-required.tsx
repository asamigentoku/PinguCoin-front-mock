import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { getLocale } from "next-intl/server";
import { authCopy } from "@/lib/mock-auth-copy";
import type { AppLocale } from "@/i18n/routing";

export async function SignInRequired({ title }: { title: string }) {
  const copy = authCopy[await getLocale() as AppLocale];
  return (
    <>
      <PageHeader title={title} />
      <section className="shell sell-section">
        <EmptyState title={copy.required} body={copy.requiredBody} href="/sign-in" action={copy.signIn} />
      </section>
    </>
  );
}
