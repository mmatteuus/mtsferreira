import type { Client, ServiceOrder, WithTimestamps } from "@/features/os/types";

const CLIENTS_KEY = "os.clients";
const ORDERS_KEY = "os.orders";

function read<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

function write<T>(key: string, value: T[]) {
  localStorage.setItem(key, JSON.stringify(value));
}

function uid(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}${Date.now()
    .toString(36)
    .slice(-4)}`;
}

export const osStorage = {
  // Clients
  listClients(): WithTimestamps<Client>[] {
    return read<WithTimestamps<Client>>(CLIENTS_KEY);
  },
  createClient(data: Client): WithTimestamps<Client> {
    const now = new Date().toISOString();
    const item: WithTimestamps<Client> = {
      ...data,
      id: data.id || uid("cli"),
      createdAt: now,
      updatedAt: now,
    };
    const list = osStorage.listClients();
    list.push(item);
    write(CLIENTS_KEY, list);
    return item;
  },
  updateClient(id: string, patch: Partial<Client>): WithTimestamps<Client> | null {
    const list = osStorage.listClients();
    const idx = list.findIndex((c) => c.id === id);
    if (idx < 0) return null;
    const updated = { ...list[idx], ...patch, updatedAt: new Date().toISOString() };
    list[idx] = updated;
    write(CLIENTS_KEY, list);
    return updated;
  },
  deleteClient(id: string) {
    const list = osStorage.listClients().filter((c) => c.id !== id);
    write(CLIENTS_KEY, list);
  },

  // Orders
  listOrders(): WithTimestamps<ServiceOrder>[] {
    return read<WithTimestamps<ServiceOrder>>(ORDERS_KEY);
  },
  createOrder(data: ServiceOrder): WithTimestamps<ServiceOrder> {
    const now = new Date().toISOString();
    const item: WithTimestamps<ServiceOrder> = {
      ...data,
      id: data.id || uid("os"),
      items: data.items || [],
      timeline: data.timeline || [],
      attachments: data.attachments || [],
      createdAt: now,
      updatedAt: now,
    };
    const list = osStorage.listOrders();
    list.push(item);
    write(ORDERS_KEY, list);
    return item;
  },
  updateOrder(id: string, patch: Partial<ServiceOrder>): WithTimestamps<ServiceOrder> | null {
    const list = osStorage.listOrders();
    const idx = list.findIndex((o) => o.id === id);
    if (idx < 0) return null;
    const updated = {
      ...list[idx],
      ...patch,
      items: patch.items ?? list[idx].items ?? [],
      timeline: patch.timeline ?? list[idx].timeline ?? [],
      attachments: patch.attachments ?? list[idx].attachments ?? [],
      updatedAt: new Date().toISOString(),
    };
    list[idx] = updated;
    write(ORDERS_KEY, list);
    return updated;
  },
  deleteOrder(id: string) {
    const list = osStorage.listOrders().filter((o) => o.id !== id);
    write(ORDERS_KEY, list);
  },
};

// Seed helper to provide initial demo data on first load
export function seedIfEmpty() {
  const hasClients = osStorage.listClients().length > 0;
  const hasOrders = osStorage.listOrders().length > 0;
  if (hasClients && hasOrders) return;

  const c1 = osStorage.createClient({ id: "cli_demo_1", name: "João Silva", phone: "(63) 9 9999-0001" });
  const c2 = osStorage.createClient({ id: "cli_demo_2", name: "ACME Ltda", phone: "(63) 9 9999-0002", document: "12.345.678/0001-90" });

  osStorage.createOrder({
    id: "os_demo_1",
    number: "OS-0001",
    clientId: c1.id,
    equipment: "Notebook Dell Inspiron",
    description: "Não liga. Possível fonte/placa.",
    status: "aberta",
    priority: "alta",
    openedAt: new Date().toISOString(),
    technician: "Mateus",
  });

  osStorage.createOrder({
    id: "os_demo_2",
    number: "OS-0002",
    clientId: c2.id,
    equipment: "Servidor HP",
    description: "Troca de HD e reinstalação.",
    status: "em_andamento",
    priority: "media",
    openedAt: new Date().toISOString(),
    technician: "Mateus",
  });
}
