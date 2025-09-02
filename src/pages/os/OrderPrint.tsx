import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { osStorage } from "@/lib/osStorage";
import { calcItemTotal, calcOrderTotal, formatBRL } from "@/features/os/utils";

export default function OrderPrint() {
  const { id } = useParams();
  const order = useMemo(() => osStorage.listOrders().find((o) => o.id === id), [id]);
  const client = useMemo(() => order && osStorage.listClients().find((c) => c.id === order.clientId), [order]);

  useEffect(() => {
    setTimeout(() => window.print(), 200);
  }, []);

  if (!order) return <div>O.S não encontrada</div>;

  const total = calcOrderTotal(order);

  return (
    <div className="p-6 print:p-0">
      <style>{`@media print { .no-print { display: none } body { background: white } }`}</style>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">{order.number}</h1>
        <p className="text-sm text-muted-foreground">Abertura: {new Date(order.openedAt).toLocaleString()}</p>
        <hr className="my-4" />
        <div className="text-sm">
          <p><strong>Cliente:</strong> {client?.name || order.clientId}</p>
          <p><strong>Equipamento:</strong> {order.equipment || '-'}</p>
          <p><strong>Técnico:</strong> {order.technician || '-'}</p>
          <p><strong>Status:</strong> {order.status.replaceAll('_',' ')}</p>
        </div>
        <h2 className="font-semibold mt-6 mb-2">Itens/Serviços</h2>
        <table className="w-full text-sm" cellPadding={4}>
          <thead>
            <tr className="text-left border-b">
              <th>Tipo</th>
              <th>Descrição</th>
              <th>Qtd</th>
              <th>Unitário</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {(order.items || []).map((it) => (
              <tr key={it.id} className="border-b">
                <td>{it.kind}</td>
                <td>{it.description}</td>
                <td>{it.quantity}</td>
                <td>{formatBRL(Number(it.unitPrice))}</td>
                <td>{formatBRL(calcItemTotal(it))}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-right text-sm">
          <p>Desconto: {formatBRL(order.discount || 0)}</p>
          <p>Outros: {formatBRL(order.additionalFees || 0)}</p>
          <p className="font-semibold">Total: {formatBRL(total)}</p>
        </div>
        <div className="no-print mt-6">
          <button onClick={() => window.print()} className="px-4 py-2 border rounded">Imprimir</button>
        </div>
      </div>
    </div>
  );
}
