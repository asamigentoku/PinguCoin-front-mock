import { mockStore } from "./mock-store";
import type { Product } from "./types";

export type ProductFile = { id: number; productId: number; originalFilename: string; contentType: string; fileSize: number; sortOrder: number };
export async function getMyProducts(): Promise<Product[]> { return mockStore.products.filter((product) => product.userId === 1).sort((a, b) => b.id - a.id).map((product) => ({ ...product })); }
export async function getMyProduct(id: number): Promise<Product | null> { return (await getMyProducts()).find((product) => product.id === id) ?? null; }
export async function getProductFiles(productId: number): Promise<ProductFile[]> { return mockStore.files.filter((file) => file.productId === productId).sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id).map((file) => ({ ...file })); }
