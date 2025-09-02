import { useEffect, useState } from "react";
import type { Client, WithTimestamps } from "@/features/os/types";
import { osStorage } from "@/lib/osStorage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Clients() {
  const [clients, setClients] = useState<WithTimestamps<Client>[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const reload = () => setClients(osStorage.listClients());

  useEffect(() => {
    reload();
  }, []);

  const add = () => {
    if (!name.trim()) return;
    osStorage.createClient({ id: "", name: name.trim(), phone: phone.trim() || undefined });
    setName("");
    setPhone("");
    reload();
  };

  const remove = (id: string) => {
    if (!confirm("Remover este cliente?")) return;
    osStorage.deleteClient(id);
    reload();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
        <div className="sm:col-span-2">
          <Label>Nome do cliente</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: João Silva" />
        </div>
        <div>
          <Label>Telefone (opcional)</Label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(63) 9 9999-0000" />
        </div>
        <div>
          <Button onClick={add}>Adicionar</Button>
        </div>
      </div>

      <div className="rounded-md border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Criado</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell>{c.phone || "-"}</TableCell>
                <TableCell>{new Date(c.createdAt).toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="destructive" onClick={() => remove(c.id)}>
                    Remover
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {clients.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  Nenhum cliente
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

