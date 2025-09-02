export type Client = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  document?: string; // CPF/CNPJ
  address?: string;
  notes?: string;
};

export type OrderStatus =
  | "aberta"
  | "em_andamento"
  | "aguardando_peca"
  | "aguardando_aprovacao"
  | "finalizada"
  | "cancelada";

export type Priority = "baixa" | "media" | "alta" | "urgente";

export type OrderItemKind = "peca" | "servico";

export type OrderItem = {
  id: string;
  kind: OrderItemKind;
  description: string;
  quantity: number;
  unitPrice: number;
};

export type TimelineEntry = {
  id: string;
  at: string; // ISO
  type: "status" | "nota";
  message: string;
};

export type Attachment = {
  id: string;
  name: string;
  mime: string;
  dataUrl: string; // base64
  addedAt: string; // ISO
};

export type ServiceOrder = {
  id: string;
  number: string; // número OS legível
  clientId: string;
  equipment?: string;
  description?: string;
  status: OrderStatus;
  priority?: Priority;
  openedAt: string; // ISO date
  closedAt?: string; // ISO date
  items?: OrderItem[];
  discount?: number; // valor absoluto
  additionalFees?: number; // extras
  total?: number; // pode ser calculado ao salvar
  technician?: string;
  notes?: string;
  timeline?: TimelineEntry[];
  attachments?: Attachment[];
  customerSignatureDataUrl?: string; // assinatura do cliente (base64)
  signedAt?: string; // data da assinatura
};

export type WithTimestamps<T> = T & { createdAt: string; updatedAt: string };
