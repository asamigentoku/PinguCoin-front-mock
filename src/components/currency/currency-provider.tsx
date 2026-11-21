"use client";

import { createContext, useContext, useMemo } from "react";

import type { ExchangeRatePayload as Payload } from "@/lib/api";
type CurrencyState = { rates: Record<string, number>; updatedAt: string | null; failed: boolean };
const CurrencyContext = createContext<CurrencyState>({ rates: {}, updatedAt: null, failed: false });

export function CurrencyProvider({ children, initialData }: { children: React.ReactNode; initialData: Payload | null }) {
  const value = useMemo<CurrencyState>(() => ({
    rates: initialData?.rates ?? {},
    updatedAt: initialData?.updatedAt ?? null,
    failed: false,
  }), [initialData]);
  return <CurrencyContext value={value}>{children}</CurrencyContext>;
}

export const useCurrency = () => useContext(CurrencyContext);
