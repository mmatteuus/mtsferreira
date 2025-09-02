import { useMemo, useState, useEffect } from "react";
import type { WithTimestamps, ServiceOrder } from "@/features/os/types";
import { osStorage } from "@/lib/osStorage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { downloadCSV, toCSV } from "@/features/os/utils";
import { calcOrderTotal } from "@/features/os/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const [sortBy, setSortBy] = useState<"number" | "client" | "status" | "openedAt">("openedAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [paidFilter, setPaidFilter] = useState<"" | "paid" | "unpaid">("");

  const saveFilters = () => {
    const payload = { query, status, client, from, to, pageSize, sortBy, sortDir, paidFilter };
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
        if (f.sortBy) setSortBy(f.sortBy);
        if (f.sortDir) setSortDir(f.sortDir);
        if (f.paidFilter) setPaidFilter(f.paidFilter);
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
      const isPaid = Boolean(o.paid);
      const matchesPaid = !paidFilter || (paidFilter === "paid" ? isPaid : !isPaid);
      return matchesQ && matchesStatus && matchesClient && matchesDate && matchesPaid;
    });
  }, [orders, query, status, client, from, to]);

  useEffect(() => {
    saveFilters();
    setPage(1); // reset page when filters change
  }, [query, status, client, from, to, pageSize, paidFilter]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    const cmp = (a: OsItem, b: OsItem) => {
      let av: any = "";
      let bv: any = "";
      switch (sortBy) {
        case "number":
          av = a.number; bv = b.number; break;
        case "client":
          av = a.clientName || a.clientId; bv = b.clientName || b.clientId; break;
        case "status":
          av = a.status; bv = b.status; break;
        case "openedAt":
        default:
          av = a.openedAt; bv = b.openedAt; break;
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    };
    return arr.sort(cmp);
  }, [filtered, sortBy, sortDir]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * pageSize;
  const paged = sorted.slice(start, start + pageSize);

  const toggleSort = (key: typeof sortBy) => {
    if (sortBy === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortBy(key); setSortDir("asc"); }
  };

  const exportCsv = () => {
    const rows = filtered.map((o) => ({
      numero: o.number,
      cliente: o.clientName || o.clientId,
      status: o.status,
      prioridade: o.priority || "",
      abertura: new Date(o.openedAt).toLocaleString(),
      equipamento: o.equipment || "",
      descricao: o.description || "",
      pago: o.paid ? "sim" : "nao",
      valor_recebido: o.paymentReceived ?? "",
      forma_pagamento: o.paymentMethod || "",
    }));
    const csv = toCSV(rows);
    downloadCSV("os_export.csv", csv);
  };

  const markPaid = (id: string) => {
    const all = osStorage.listOrders();
    const o = all.find(x => x.id === id);
    if (!o) return;
    const now = new Date().toISOString();
    const received = typeof o.paymentReceived === 'number' ? o.paymentReceived! : calcOrderTotal(o);
    osStorage.updateOrder(id, {
      paid: true,
      paymentDate: now,
      paymentMethod: o.paymentMethod || 'dinheiro',
      paymentReceived: received,
    });
    reload();
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
          placeholder="Buscar por nÃºmero, cliente, equipamento..."
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
          <Select value={paidFilter} onValueChange={(v) => setPaidFilter(v as any)}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="Pagamento" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              <SelectItem value="paid">Pago</SelectItem>
              <SelectItem value="unpaid">Em aberto</SelectItem>
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
              <TableHead>
                <button className="inline-flex items-center gap-1" onClick={() => toggleSort("number")}>NÃºmero <ArrowUpDown className="h-3 w-3" /></button>
              </TableHead>
              <TableHead>
                <button className="inline-flex items-center gap-1" onClick={() => toggleSort("client")}>Cliente <ArrowUpDown className="h-3 w-3" /></button>
              </TableHead>
              <TableHead>
                <button className="inline-flex items-center gap-1" onClick={() => toggleSort("status")}>Status <ArrowUpDown className="h-3 w-3" /></button>
              </TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>
                <button className="inline-flex items-center gap-1" onClick={() => toggleSort("openedAt")}>Abertura <ArrowUpDown className="h-3 w-3" /></button>
              </TableHead>
              <TableHead>Equipamento</TableHead>
              <TableHead>Pagamento</TableHead>
              <TableHead className="text-right">AÃ§Ãµes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-medium"><Link className="underline" to={`/os/${o.id}`}>{o.number}</Link></TableCell>
                <TableCell>{o.clientName || o.clientId}</TableCell>
                <TableCell><StatusChip status={o.status} /></TableCell>
                <TableCell className="capitalize">{o.priority || "-"}</TableCell>
                <TableCell>{new Date(o.openedAt).toLocaleString()}</TableCell>
                <TableCell>{o.equipment || "-"}</TableCell>
                <TableCell>
                  {o.paid ? (
                    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">Pago</Badge>
                  ) : (
                    <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Em aberto</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {o.status !== "finalizada" && (
                    <Button size="sm" variant="secondary" onClick={() => finalize(o.id)}>
                      Finalizar
                    </Button>
                  )}
                  {!o.paid && (
                    <Button size="sm" variant="outline" onClick={() => markPaid(o.id)}>
                      Marcar pago
                    </Button>
                  )}
                  <Button size="sm" variant="destructive" onClick={() => setConfirmId(o.id)}>
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

      <AlertDialog open={Boolean(confirmId)} onOpenChange={(v) => { if (!v) setConfirmId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover O.S</AlertDialogTitle>
            <AlertDialogDescription>Tem certeza que deseja remover esta O.S? Esta ação não poderá ser desfeita.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (confirmId) { osStorage.deleteOrder(confirmId); setConfirmId(null); reload(); } }}>Remover</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
            <Button variant="outline" size="sm" disabled={currentPage >= pageCount} onClick={() => setPage((p) => Math.min(pageCount, p + 1))}>PrÃ³xima</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusChip({ status }: { status: ServiceOrder["status"] }) {
  const labelMap: Record<ServiceOrder["status"], string> = {
    aberta: "Aberta",
    em_andamento: "Em andamento",
    aguardando_peca: "Aguardando peça",
    aguardando_aprovacao: "Aguardando aprovação",
    finalizada: "Finalizada",
    cancelada: "Cancelada",
  };
  const colorMap: Record<ServiceOrder["status"], string> = {
    aberta: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
    em_andamento: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    aguardando_peca: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
    aguardando_aprovacao: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
    finalizada: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    cancelada: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  };
  return <Badge className={colorMap[status]}>{labelMap[status]}</Badge>;
}
