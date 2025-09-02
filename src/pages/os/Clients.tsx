import { useEffect, useState } from "react";
import type { Client, WithTimestamps } from "@/features/os/types";
import { osStorage } from "@/lib/osStorage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

export default function Clients() {
  const [clients, setClients] = useState<WithTimestamps<Client>[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);

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
                  <Button size="sm" variant="destructive" onClick={() => setConfirmId(c.id)}>
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
      <AlertDialog open={Boolean(confirmId)} onOpenChange={(v) => { if (!v) setConfirmId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover cliente</AlertDialogTitle>
            <AlertDialogDescription>Tem certeza que deseja remover este cliente? Esta ação não poderá ser desfeita.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (confirmId) { remove(confirmId); setConfirmId(null); } }}>Remover</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
