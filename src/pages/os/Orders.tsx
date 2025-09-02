import { useMemo, useState, useEffect } from "react";
import type { WithTimestamps, ServiceOrder } from "@/features/os/types";
import { osStorage } from "@/lib/osStorage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { downloadCSV, toCSV } from "@/features/os/utils";

type OsItem = WithTimestamps<ServiceOrder> & { clientName?: string };

export default function Orders() {
  const [orders, setOrders] = useState<OsItem[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("");
  const [client, setClient] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const saveFilters = () => {
    const payload = { query, status, client, from, to, pageSize };
    try { localStorage.setItem("os.orders.filters", JSON.stringify(payload)); } catch {}
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem("os.orders.filters");
      if (raw) {
        const f = JSON.parse(raw);
        setQuery(f.query || "");
        setStatus(f.status || "");
        setClient(f.client || "");
        setFrom(f.from || "");
        setTo(f.to || "");
        setPageSize(f.pageSize || 10);
      }
    } catch {}
  }, []);

  const reload = () => {
    const os = osStorage.listOrders();
    const clients = osStorage.listClients();
    const withClient = os.map((o) => ({
      ...o,
      clientName: clients.find((c) => c.id === o.clientId)?.name,
    }));
    setOrders(withClient);
  };

  useEffect(() => {
    reload();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      const matchesQ = !q || [o.number, o.clientName, o.equipment, o.description]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
      const matchesStatus = !status || o.status === status;
      const matchesClient = !client || o.clientId === client;
      const f = from ? new Date(from).getTime() : 0;
      const t = to ? new Date(to).getTime() : Number.MAX_SAFE_INTEGER;
      const opened = new Date(o.openedAt).getTime();
      const matchesDate = opened >= f && opened <= t;
      return matchesQ && matchesStatus && matchesClient && matchesDate;
    });
  }, [orders, query, status, client, from, to]);

  useEffect(() => {
    saveFilters();
    setPage(1); // reset page when filters change
  }, [query, status, client, from, to, pageSize]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  const exportCsv = () => {
    const rows = filtered.map((o) => ({
      numero: o.number,
      cliente: o.clientName || o.clientId,
      status: o.status,
      prioridade: o.priority || "",
      abertura: new Date(o.openedAt).toLocaleString(),
      equipamento: o.equipment || "",
      descricao: o.description || "",
    }));
    const csv = toCSV(rows);
    downloadCSV("os_export.csv", csv);
  };

  const finalize = (id: string) => {
    osStorage.updateOrder(id, { status: "finalizada", closedAt: new Date().toISOString() });
    reload();
  };

  const remove = (id: string) => {
    if (!confirm("Remover esta O.S?")) return;
    osStorage.deleteOrder(id);
    reload();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Input
          placeholder="Buscar por número, cliente, equipamento..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex flex-wrap gap-2 items-center">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              {(["aberta","em_andamento","aguardando_peca","aguardando_aprovacao","finalizada","cancelada"] as const).map((s) => (
                <SelectItem key={s} value={s}>{s.replaceAll("_"," ")}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={client} onValueChange={setClient}>
            <SelectTrigger className="w-[200px]"><SelectValue placeholder="Cliente" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              {osStorage.listClients().map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          <Button variant="outline" onClick={exportCsv}>Exportar CSV</Button>
          <Button asChild>
            <Link to="/os/nova">Nova O.S</Link>
          </Button>
        </div>
      </div>

      <div className="rounded-md border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Abertura</TableHead>
              <TableHead>Equipamento</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-medium"><Link className="underline" to={`/os/${o.id}`}>{o.number}</Link></TableCell>
                <TableCell>{o.clientName || o.clientId}</TableCell>
                <TableCell className="capitalize">{o.status.replaceAll("_", " ")}</TableCell>
                <TableCell className="capitalize">{o.priority || "-"}</TableCell>
                <TableCell>{new Date(o.openedAt).toLocaleString()}</TableCell>
                <TableCell>{o.equipment || "-"}</TableCell>
                <TableCell className="text-right space-x-2">
                  {o.status !== "finalizada" && (
                    <Button size="sm" variant="secondary" onClick={() => finalize(o.id)}>
                      Finalizar
                    </Button>
                  )}
                  <Button size="sm" variant="destructive" onClick={() => remove(o.id)}>
                    Remover
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  Nenhuma O.S encontrada
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="text-muted-foreground">
          {filtered.length > 0 ? `Mostrando ${start + 1}-${Math.min(start + pageSize, filtered.length)} de ${filtered.length}` : "Sem resultados"}
        </div>
        <div className="flex items-center gap-2">
          <span>Tamanho:</span>
          <Select value={String(pageSize)} onValueChange={(v) => setPageSize(Number(v))}>
            <SelectTrigger className="w-[90px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {[10, 25, 50].map((n) => (
                <SelectItem key={n} value={String(n)}>{n}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" disabled={currentPage <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Anterior</Button>
            <span className="px-2">{currentPage}/{pageCount}</span>
            <Button variant="outline" size="sm" disabled={currentPage >= pageCount} onClick={() => setPage((p) => Math.min(pageCount, p + 1))}>Próxima</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
