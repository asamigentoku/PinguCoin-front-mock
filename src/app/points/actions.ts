"use server";

import { createPointTopUp } from "@/lib/shop";
import type { ExternalPaymentMethod } from "@/lib/shop";
import { getMockUser } from "@/lib/mock-auth";

export async function topUpPoints(amount: number, paymentMethod: ExternalPaymentMethod, attemptId: string): Promise<{ actionUrl?: string; error?: string }> {
  if (!await getMockUser()) return { error: "ログインが必要です。" };
  if (!Number.isInteger(amount) || amount < 100 || amount > 100000) return { error: "100〜100,000ポイントの範囲で指定してください。" };
  try {
    const payment = await createPointTopUp(amount, paymentMethod, attemptId);
    if (payment.action_url) return { actionUrl: payment.action_url };
    return payment.status === "succeeded" ? {} : { error: "決済認証を開始できませんでした。" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "チャージを開始できませんでした。" };
  }
}
