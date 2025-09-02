import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { osStorage } from "@/lib/osStorage";
import type { Priority, ServiceOrder } from "@/features/os/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const schema = z.object({
  clientId: z.string().min(1, "Selecione um cliente"),
  equipment: z.string().optional(),
  description: z.string().optional(),
  priority: z.enum(["baixa", "media", "alta", "urgente"]).optional(),
  technician: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

function nextNumber(): string {
  const orders = osStorage.listOrders();
  const numbers = orders
    .map((o) => o.number)
    .map((n) => Number(n.replace(/\D/g, "")))
    .filter((n) => !Number.isNaN(n));
  const max = numbers.length ? Math.max(...numbers) : 0;
  const next = (max + 1).toString().padStart(4, "0");
  return `OS-${next}`;
}

export default function NewOrder() {
  const navigate = useNavigate();
  const clients = useMemo(() => osStorage.listClients(), []);
  const number = useMemo(() => nextNumber(), []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormValues) => {
    const order: ServiceOrder = {
      id: "",
      number,
      clientId: data.clientId,
      equipment: data.equipment,
      description: data.description,
      status: "aberta",
      priority: data.priority as Priority | undefined,
      technician: data.technician,
      openedAt: new Date().toISOString(),
    };
    osStorage.createOrder(order);
    navigate("/os");
  };

  return (
    <form className="space-y-6 max-w-2xl" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Número</Label>
          <Input value={number} readOnly />
        </div>
        <div>
          <Label>Cliente</Label>
          <Select onValueChange={(v) => setValue("clientId", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um cliente" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.clientId && (
            <p className="text-sm text-destructive mt-1">{errors.clientId.message}</p>
          )}
        </div>
        <div className="sm:col-span-2">
          <Label>Equipamento</Label>
          <Input placeholder="Ex: Notebook Dell" {...register("equipment")} />
        </div>
        <div className="sm:col-span-2">
          <Label>Descrição do problema/serviço</Label>
          <Textarea rows={4} placeholder="Detalhes..." {...register("description")} />
        </div>
        <div>
          <Label>Prioridade</Label>
          <Select onValueChange={(v) => setValue("priority", v as any)}>
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
          <Input placeholder="Responsável" {...register("technician")} />
        </div>
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>Salvar</Button>
        <Button type="button" variant="outline" onClick={() => navigate("/os")}>Cancelar</Button>
      </div>
    </form>
  );
}

