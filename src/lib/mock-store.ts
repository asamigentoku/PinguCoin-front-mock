import type { ProductFile } from "./seller";
import type { Order, PointSummary, PointTransaction } from "./shop";
import type { Product } from "./types";

type MockStore = { products: Product[]; files: ProductFile[]; orders: Order[]; points: PointSummary; nextProductId: number; nextFileId: number; nextOrderId: number; nextTransactionId: number };
const now = "2026-11-21T09:00:00+09:00";
const products: Product[] = [
  { id: 101, userId: 1, categoryId: 1, name: "ペンギンの夜空 壁紙セット", description: "デスクトップとスマートフォン向けの高解像度壁紙12枚セットです。", imageUrl: "/products/101.png", price: 480, status: "available", createdAt: now, updatedAt: now },
  { id: 102, userId: 2, categoryId: 2, name: "シンプル家計簿テンプレート", description: "毎日の支出を迷わず記録できる、使いやすい家計簿テンプレートです。", imageUrl: "/products/102.png", price: 650, status: "available", createdAt: now, updatedAt: now },
  { id: 103, userId: 3, categoryId: 3, name: "作業用チルBGMパック", description: "動画や配信にも使える、ループ対応の落ち着いたBGMを収録しています。", imageUrl: "/products/103.png", price: 900, status: "available", createdAt: now, updatedAt: now },
  { id: 104, userId: 1, categoryId: 4, name: "画像リサイズミニツール", description: "複数画像のサイズをまとめて整えるための小さなデスクトップツールです。", imageUrl: "/products/104.png", price: 1200, status: "available", createdAt: now, updatedAt: now },
  { id: 105, userId: 4, categoryId: 1, name: "海のいきもの アイコン集", description: "SNSや資料で使える、やさしい色合いのアイコン40点です。", imageUrl: "/products/105.png", price: 520, status: "available", createdAt: now, updatedAt: now },
  { id: 106, userId: 1, categoryId: 2, name: "企画書スライドキット", description: "企画の流れを整理しやすいプレゼンテーション用テンプレートです。", imageUrl: "/products/106.png", price: 780, status: "draft", createdAt: now, updatedAt: now },
  { id: 107, userId: 5, categoryId: 3, name: "ゲーム向け効果音20選", description: "決定、キャンセル、通知など、UIに使いやすい短い効果音セットです。", imageUrl: "/products/107.png", price: 360, status: "available", createdAt: now, updatedAt: now },
  { id: 108, userId: 1, categoryId: 4, name: "集中タイマー", description: "集中時間と休憩時間をシンプルに管理できるタイマーです。", imageUrl: "/products/108.png", price: 300, status: "available", createdAt: now, updatedAt: now },
];
const files: ProductFile[] = products.map((product, index) => ({ id: 1001 + index, productId: product.id, originalFilename: `${product.name}.zip`, contentType: "application/zip", fileSize: 1_200_000 + index * 180_000, sortOrder: 1 }));
const firstTransaction: PointTransaction = { id: 1, amount: 5000, type: "credit", reason: "モック用ウェルカムポイント", balance_after: 5000, created_at: now, chain_sequence: 1, previous_hash: "mock", transaction_hash: "mock-1" };
function initialStore(): MockStore { return { products: structuredClone(products), files: structuredClone(files), orders: [{ id: 5001, user_id: 1, product_id: 103, quantity: 1, unit_price: 900, total_amount: 900, payment_id: 7001, status: "paid", payment_method: "point", currency: "POINT" }], points: { balance: 5000, transactions: [firstTransaction] }, nextProductId: 109, nextFileId: 1100, nextOrderId: 5002, nextTransactionId: 2 }; }
const globals = globalThis as typeof globalThis & { __pinguCoinMockStore?: MockStore };
export const mockStore = globals.__pinguCoinMockStore ??= initialStore();
export function addPointTransaction(amount: number, type: string, reason: string) {
  mockStore.points.balance += amount;
  const id = mockStore.nextTransactionId++;
  mockStore.points.transactions.unshift({ id, amount, type, reason, balance_after: mockStore.points.balance, created_at: new Date().toISOString(), chain_sequence: id, previous_hash: "mock", transaction_hash: `mock-${id}` });
}
