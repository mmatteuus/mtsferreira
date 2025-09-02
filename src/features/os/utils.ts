import type { OrderItem, ServiceOrder } from "@/features/os/types";

export function calcItemTotal(item: OrderItem): number {
  const qty = Number(item.quantity) || 0;
  const price = Number(item.unitPrice) || 0;
  return Math.round(qty * price * 100) / 100;
}

export function calcOrderTotal(order: ServiceOrder): number {
  const itemsTotal = (order.items || []).reduce((sum, it) => sum + calcItemTotal(it), 0);
  const fees = Number(order.additionalFees || 0);
  const discount = Number(order.discount || 0);
  return Math.max(0, Math.round((itemsTotal + fees - discount) * 100) / 100);
}

export function formatBRL(value: number | undefined | null): string {
  const n = Number(value || 0);
  try {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n);
  } catch {
    return `R$ ${n.toFixed(2)}`;
  }
}

export function toCSV(rows: Record<string, any>[], headers?: string[]): string {
  if (!rows.length) return "";
  const keys = headers || Object.keys(rows[0]);
  const esc = (v: any) => {
    if (v === null || v === undefined) return "";
    const s = String(v);
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const head = keys.join(",");
  const body = rows.map((r) => keys.map((k) => esc(r[k])).join(",")).join("\n");
  return `${head}\n${body}`;
}

export function downloadCSV(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
