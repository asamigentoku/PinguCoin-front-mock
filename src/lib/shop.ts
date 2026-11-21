import { addPointTransaction, mockStore } from "./mock-store";

export type PointTransaction = { id: number; amount: number; type: string; reason: string; balance_after: number; created_at: string; chain_sequence: number; previous_hash: string; transaction_hash: string };
export type PointSummary = { balance: number; transactions: PointTransaction[] };
export type ExternalPaymentMethod = "card" | "bank_transfer";
export type PaymentMethod = "point" | ExternalPaymentMethod;
export type Order = { id: number; user_id: number; product_id: number; quantity: number; unit_price: number; total_amount: number; payment_id: number; status: string; payment_method: PaymentMethod; currency: "POINT" | "JPY"; action_url?: string };
export type Payment = { id: number; amount: number; currency: string; status: string; purpose: string; action_url?: string };
export async function getPoints(): Promise<PointSummary> { return structuredClone(mockStore.points); }
export async function getOrders(): Promise<Order[]> { return structuredClone(mockStore.orders); }
export async function getOrder(id: number): Promise<Order> { const order = mockStore.orders.find((item) => item.id === id); if (!order) throw new Error("注文が見つかりません。"); return { ...order }; }
export async function createOrder(productId: number, quantity: number, paymentMethod: PaymentMethod, idempotencyKey: string): Promise<Order> {
  void idempotencyKey;
  const product = mockStore.products.find((item) => item.id === productId);
  if (!product) throw new Error("商品が見つかりません。");
  const total = product.price * quantity;
  if (paymentMethod === "point") { if (mockStore.points.balance < total) throw new Error("insufficient points"); addPointTransaction(-total, "debit", `${product.name}を購入`); }
  const order: Order = { id: mockStore.nextOrderId++, user_id: 1, product_id: productId, quantity, unit_price: product.price, total_amount: total, payment_id: 7000 + mockStore.nextOrderId, status: "paid", payment_method: paymentMethod, currency: paymentMethod === "point" ? "POINT" : "JPY" };
  mockStore.orders.push(order); return { ...order };
}
export async function waitForOrder(order: Order) { return order; }
export async function createPointTopUp(amount: number, paymentMethod: ExternalPaymentMethod, idempotencyKey: string): Promise<Payment> { void paymentMethod; void idempotencyKey; addPointTransaction(amount, "credit", "モック決済によるポイント追加"); return { id: Date.now(), amount, currency: "JPY", status: "succeeded", purpose: "point_topup" }; }
const messages: Record<string, string> = { "insufficient points": "ポイントが足りません。", "insufficient stock": "在庫がありません。" };
export const friendlyError = (error: unknown) => { const message = error instanceof Error ? error.message : ""; return messages[message] ?? (message || "購入に失敗しました。"); };
