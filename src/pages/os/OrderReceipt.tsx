import { useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { osStorage } from "@/lib/osStorage";
import { calcOrderTotal, formatBRL } from "@/features/os/utils";

export default function OrderReceipt() {
  const { id } = useParams();
  const order = useMemo(() => osStorage.listOrders().find((o) => o.id === id), [id]);
  const client = useMemo(() => order && osStorage.listClients().find((c) => c.id === order.clientId), [order]);

  useEffect(() => {
    setTimeout(() => window.print(), 200);
  }, []);

  if (!order) return <div>O.S não encontrada</div>;

  const total = calcOrderTotal(order);

  return (
    <div className="p-6 print:p-0 bg-white">
      <style>{`@media print { .no-print { display: none } body { background: white } }`}</style>
      <div className="max-w-2xl mx-auto border border-black p-6 text-black">
        <div className="text-center">
          <h1 className="text-xl font-bold">Recibo</h1>
          <p className="text-sm">MtsFerreira - Engenheiro de Software</p>
        </div>
        <div className="mt-4 text-sm">
          <p><strong>Número:</strong> {order.number}</p>
          <p><strong>Data:</strong> {new Date().toLocaleString()}</p>
          <p><strong>Cliente:</strong> {client?.name || order.clientId}</p>
        </div>
        <p className="mt-4 text-sm">Recebi de {client?.name || order.clientId} a quantia de <strong>{formatBRL(total)}</strong> referente aos serviços/produtos descritos na O.S {order.number}.</p>
        <div className="mt-6 flex flex-col items-center">
          {order.customerSignatureDataUrl ? (
            <img src={order.customerSignatureDataUrl} alt="Assinatura" className="h-24 object-contain" />
          ) : (
            <div className="h-24" />
          )}
          <div className="w-full border-t border-black mt-2 pt-1 text-center text-sm">
            {client?.name || "Assinatura do cliente"}
          </div>
          {order.signedAt && <div className="text-xs mt-1">Assinado em {new Date(order.signedAt).toLocaleString()}</div>}
        </div>
        <div className="no-print mt-6 text-center">
          <button onClick={() => window.print()} className="px-4 py-2 border rounded">Imprimir</button>
        </div>
      </div>
    </div>
  );
}
