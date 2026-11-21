import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/common/page-header";
import { ListingForm } from "@/components/sell/listing-form";
import { getMyProduct, getProductFiles } from "@/lib/seller";
import { SignInRequired } from "@/components/sell/sign-in-required";
import { getMockUser } from "@/lib/mock-auth";

export const metadata: Metadata = { title: "出品を編集する" };

export default async function EditListingPage({ params }: PageProps<"/[locale]/sell/manage/[id]">) {
  if (!await getMockUser()) return <SignInRequired title="出品を編集する" />;
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id < 1) notFound();
  const product = await getMyProduct(id);
  if (!product) notFound();
  const files = await getProductFiles(id).catch(() => []);
  return (
    <>
      <PageHeader title="出品を編集する" lead={product.name} />
      <section className="shell sell-section">
        <ListingForm product={product} files={files} />
      </section>
    </>
  );
}
