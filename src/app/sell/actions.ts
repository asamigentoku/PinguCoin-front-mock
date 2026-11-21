"use server";

import { revalidatePath } from "next/cache";
import { validateListing, type ListingInput, type ListingStatus } from "@/lib/listing";
import { mockStore } from "@/lib/mock-store";
import { getMyProduct, getProductFiles, type ProductFile } from "@/lib/seller";
import { getMockUser } from "@/lib/mock-auth";

export type ActionResult<T = null> = { ok: true; data: T } | { ok: false; error: string };
export type UploadTargets = { image: { blobEndpoint: string; container: string; mainImagePrefix: string; sasToken: string }; files: { blobEndpoint: string; container: string; pathPrefix: string; sasToken: string } };
async function run<T>(task: () => T | Promise<T>): Promise<ActionResult<T>> { try { if (!await getMockUser()) throw new Error("ログインが必要です。"); return { ok: true, data: await task() }; } catch (error) { return { ok: false, error: error instanceof Error ? error.message : "処理に失敗しました。" }; } }
function refresh(id?: number) { revalidatePath("/sell/manage"); revalidatePath("/products"); revalidatePath("/purchases"); if (id) revalidatePath(`/products/${id}`); }
function patchProduct(id: number, input: ListingInput) { const product = mockStore.products.find((item) => item.id === id && item.userId === 1); if (!product) throw new Error("商品が見つかりません。"); Object.assign(product, { ...input, name: input.name.trim(), updatedAt: new Date().toISOString() }); }

export async function createListing(input: ListingInput): Promise<ActionResult<{ productId: number }>> {
  const invalid = validateListing(input); if (invalid) return { ok: false, error: invalid };
  return run(() => { const id = mockStore.nextProductId++; const timestamp = new Date().toISOString(); mockStore.products.push({ id, userId: 1, imageUrl: "", createdAt: timestamp, updatedAt: timestamp, ...input, name: input.name.trim() }); refresh(); return { productId: id }; });
}
export async function updateListing(id: number, input: ListingInput): Promise<ActionResult> { const invalid = validateListing(input); if (invalid) return { ok: false, error: invalid }; return run(() => { patchProduct(id, input); refresh(id); return null; }); }
export async function setListingStatus(id: number, status: ListingStatus): Promise<ActionResult> { return run(async () => { const product = await getMyProduct(id); if (!product) throw new Error("商品が見つかりません。"); if (status === "available" && (await getProductFiles(id)).length === 0) throw new Error("公開するには商品ファイルをアップロードしてください。"); patchProduct(id, { name: product.name, description: product.description, categoryId: product.categoryId, price: product.price, status }); refresh(id); return null; }); }
export async function deleteListing(id: number): Promise<ActionResult> { return run(() => { const index = mockStore.products.findIndex((item) => item.id === id && item.userId === 1); if (index < 0) throw new Error("商品が見つかりません。"); mockStore.products.splice(index, 1); mockStore.files = mockStore.files.filter((file) => file.productId !== id); refresh(id); return null; }); }
export async function prepareUploads(productId: number): Promise<ActionResult<UploadTargets>> { return run(() => ({ image: { blobEndpoint: "mock://upload", container: "images", mainImagePrefix: `${productId}/`, sasToken: "mock" }, files: { blobEndpoint: "mock://upload", container: "files", pathPrefix: `${productId}/`, sasToken: "mock" } })); }
export async function confirmMainImage(productId: number, fileUrl: string, previousUrl?: string): Promise<ActionResult> { void fileUrl; void previousUrl; return run(() => { const product = mockStore.products.find((item) => item.id === productId); if (!product) throw new Error("商品が見つかりません。"); product.imageUrl = "/mock-product.svg"; refresh(productId); return null; }); }
export type UploadedFileInfo = { originalFilename: string; contentType: string; fileSize: number; sortOrder: number };
export async function confirmProductFile(productId: number, _fileUrl: string, info: UploadedFileInfo): Promise<ActionResult<ProductFile>> { return run(() => { const file = { id: mockStore.nextFileId++, productId, ...info }; mockStore.files.push(file); refresh(productId); return file; }); }
export async function removeProductFile(assetId: number): Promise<ActionResult> { return run(() => { const index = mockStore.files.findIndex((file) => file.id === assetId); if (index < 0) throw new Error("ファイルが見つかりません。"); mockStore.files.splice(index, 1); refresh(); return null; }); }
