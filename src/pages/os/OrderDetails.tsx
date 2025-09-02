import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { osStorage } from "@/lib/osStorage";
import type { Attachment, OrderItem, ServiceOrder, TimelineEntry } from "@/features/os/types";
import { calcItemTotal, calcOrderTotal } from "@/features/os/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SignaturePad from "@/pages/os/SignaturePad";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const clients = useMemo(() => osStorage.listClients(), []);
  const [order, setOrder] = useState<ServiceOrder | null>(null);

  useEffect(() => {
    const o = osStorage.listOrders().find((x) => x.id === id);
    if (!o) return;
    // Ensure default arrays
    setOrder({ ...o, items: o.items || [], timeline: o.timeline || [], attachments: o.attachments || [] });
  }, [id]);

  if (!order) {
    return (
      <div className="space-y-3">
        <p>O.S não encontrada.</p>
        <Button asChild>
          <Link to="/os">Voltar</Link>
        </Button>
      </div>
    );
  }

  const setField = <K extends keyof ServiceOrder>(key: K, value: ServiceOrder[K]) => {
    setOrder((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const addItem = () => {
    const item: OrderItem = { id: crypto.randomUUID(), kind: "servico", description: "", quantity: 1, unitPrice: 0 };
    setOrder((prev) => (prev ? { ...prev, items: [...(prev.items || []), item] } : prev));
  };

  const updateItem = (i: number, patch: Partial<OrderItem>) => {
    setOrder((prev) => {
      if (!prev) return prev;
      const items = [...(prev.items || [])];
      items[i] = { ...items[i], ...patch } as OrderItem;
      return { ...prev, items };
    });
  };

  const removeItem = (i: number) => {
    setOrder((prev) => {
      if (!prev) return prev;
      const items = [...(prev.items || [])];
      items.splice(i, 1);
      return { ...prev, items };
    });
  };

  const addNote = (message: string) => {
    if (!message.trim()) return;
    const entry: TimelineEntry = { id: crypto.randomUUID(), at: new Date().toISOString(), type: "nota", message };
    setOrder((prev) => (prev ? { ...prev, timeline: [...(prev.timeline || []), entry] } : prev));
  };

  const updateStatus = (status: ServiceOrder["status"]) => {
    const entry: TimelineEntry = { id: crypto.randomUUID(), at: new Date().toISOString(), type: "status", message: status };
    setOrder((prev) => (prev ? { ...prev, status, timeline: [...(prev.timeline || []), entry] } : prev));
  };

  const uploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const reads = await Promise.all(
      Array.from(files).map(
        (f) =>
          new Promise<Attachment>((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () =>
              resolve({
                id: crypto.randomUUID(),
                name: f.name,
                mime: f.type || "application/octet-stream",
                dataUrl: String(fr.result || ""),
                addedAt: new Date().toISOString(),
              });
            fr.onerror = reject;
            fr.readAsDataURL(f);
          })
      )
    );
    setOrder((prev) => (prev ? { ...prev, attachments: [...(prev.attachments || []), ...reads] } : prev));
  };

  const total = calcOrderTotal(order);

  const save = () => {
    osStorage.updateOrder(order.id, { ...order, total });
    navigate(`/os`);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{order.number}</h2>
          <p className="text-sm text-muted-foreground">Abertura: {new Date(order.openedAt).toLocaleString()}</p>
        </div>
        <div className="space-x-2">
          <Button variant="outline" asChild>
            <Link to={`/os/${order.id}/print`} target="_blank">Imprimir</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to={`/os/${order.id}/recibo`} target="_blank">Recibo</Link>
          </Button>
          <Button onClick={save}>Salvar</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Cliente</Label>
              <Select value={order.clientId} onValueChange={(v) => setField("clientId", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={order.status} onValueChange={(v) => updateStatus(v as ServiceOrder["status"]) }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["aberta","em_andamento","aguardando_peca","aguardando_aprovacao","finalizada","cancelada"] as const).map((s) => (
                    <SelectItem key={s} value={s}>{s.replaceAll("_"," ")}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Prioridade</Label>
              <Select value={order.priority || undefined} onValueChange={(v) => setField("priority", v as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Opcional" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="urgente">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Técnico</Label>
              <Input value={order.technician || ""} onChange={(e) => setField("technician", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <Label>Equipamento</Label>
              <Input value={order.equipment || ""} onChange={(e) => setField("equipment", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <Label>Descrição</Label>
              <Textarea rows={3} value={order.description || ""} onChange={(e) => setField("description", e.target.value)} />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Itens / Serviços</h3>
              <Button size="sm" onClick={addItem}>Adicionar item</Button>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-2 text-sm text-muted-foreground">Tipo</div>
              <div className="col-span-6 text-sm text-muted-foreground">Descrição</div>
              <div className="col-span-1 text-sm text-muted-foreground">Qtd</div>
              <div className="col-span-2 text-sm text-muted-foreground">Unitário</div>
              <div className="col-span-1 text-sm text-muted-foreground text-right">Total</div>
            </div>
            {(order.items || []).map((it, i) => (
              <div key={it.id} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-2">
                  <Select value={it.kind} onValueChange={(v) => updateItem(i, { kind: v as any })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="servico">Serviço</SelectItem>
                      <SelectItem value="peca">Peça</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-6">
                  <Input value={it.description} onChange={(e) => updateItem(i, { description: e.target.value })} />
                </div>
                <div className="col-span-1">
                  <Input type="number" value={it.quantity} onChange={(e) => updateItem(i, { quantity: Number(e.target.value) })} />
                </div>
                <div className="col-span-2">
                  <Input type="number" value={it.unitPrice} onChange={(e) => updateItem(i, { unitPrice: Number(e.target.value) })} />
                </div>
                <div className="col-span-1 text-right">
                  R$ {calcItemTotal(it).toFixed(2)}
                </div>
                <div className="col-span-12 text-right">
                  <Button size="sm" variant="destructive" onClick={() => removeItem(i)}>Remover</Button>
                </div>
              </div>
            ))}

            <div className="grid grid-cols-12 gap-2 border-t pt-4">
              <div className="col-span-8" />
              <div className="col-span-2 text-right self-center">Desconto</div>
              <div className="col-span-2">
                <Input type="number" value={order.discount || 0} onChange={(e) => setField("discount", Number(e.target.value))} />
              </div>

              <div className="col-span-8" />
              <div className="col-span-2 text-right self-center">Outros</div>
              <div className="col-span-2">
                <Input type="number" value={order.additionalFees || 0} onChange={(e) => setField("additionalFees", Number(e.target.value))} />
              </div>

              <div className="col-span-8" />
              <div className="col-span-2 text-right font-semibold self-center">Total</div>
              <div className="col-span-2 font-semibold self-center text-right">R$ {total.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Assinatura do cliente</h3>
            {order.customerSignatureDataUrl ? (
              <div className="space-y-2">
                <img src={order.customerSignatureDataUrl} alt="Assinatura" className="border bg-white rounded max-w-full" />
                <div className="text-sm text-muted-foreground">
                  {order.signedAt ? `Assinado em ${new Date(order.signedAt).toLocaleString()}` : null}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" onClick={() => setOrder({ ...order, customerSignatureDataUrl: undefined, signedAt: undefined })}>Remover</Button>
                </div>
              </div>
            ) : (
              <SignaturePad onSave={(data) => setOrder({ ...order, customerSignatureDataUrl: data, signedAt: new Date().toISOString() })} />
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Linha do tempo</h3>
            <NoteBox onAdd={addNote} />
            <ul className="mt-4 space-y-2">
              {(order.timeline || []).slice().reverse().map((t) => (
                <li key={t.id} className="text-sm">
                  <span className="text-muted-foreground">[{new Date(t.at).toLocaleString()}]</span> {t.type === 'status' ? 'Status:' : 'Nota:'} {t.message}
                </li>
              ))}
              {(order.timeline || []).length === 0 && (
                <li className="text-sm text-muted-foreground">Sem eventos ainda</li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Anexos</h3>
            <input type="file" multiple onChange={(e) => uploadFiles(e.target.files)} />
            <div className="grid grid-cols-2 gap-2 mt-3">
              {(order.attachments || []).map((a) => (
                <a key={a.id} href={a.dataUrl} target="_blank" rel="noreferrer" className="text-sm underline">
                  {a.name}
                </a>
              ))}
              {(order.attachments || []).length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhum anexo</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NoteBox({ onAdd }: { onAdd: (msg: string) => void }) {
  const [msg, setMsg] = useState("");
  return (
    <div className="flex gap-2">
      <Input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Adicionar nota" />
      <Button onClick={() => { onAdd(msg); setMsg(""); }}>Adicionar</Button>
    </div>
  );
}
