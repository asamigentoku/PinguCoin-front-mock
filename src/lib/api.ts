import { mockStore } from "./mock-store";
import type { Product } from "./types";

export type RestOptions = { retry?: boolean };
export type ExchangeRatePayload = { base: "JPY"; rates: Record<string, number>; updatedAt: string };
export async function getProducts(): Promise<Product[]> { return mockStore.products.filter((product) => product.status !== "draft").map((product) => ({ ...product })); }
export async function getProduct(id: number): Promise<Product | null> { const product = mockStore.products.find((item) => item.id === id && item.status !== "draft"); return product ? { ...product } : null; }
export async function getExchangeRates(): Promise<ExchangeRatePayload> { return { base: "JPY", rates: { USD: 0.0065, EUR: 0.0057, GBP: 0.0050, CNY: 0.046 }, updatedAt: "2026-11-21T09:00:00+09:00" }; }
