// ─── Task / Project ───────────────────────────────────────────────────────────

export type Priority = "Low" | "Medium" | "High";

export type TaskStatus =
  | "To do"
  | "In progress"
  | "Under review"
  | "Completed"
  | "Overdue"
  | "Cancelled";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status?: TaskStatus;
  progress: number;
  progressColor?: string;
  date?: string;
  deadline?: string;
  budget?: string;
  assignees?: string[];
  comments?: number;
  image?: string;
  aiInsights?: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

// ─── User / Auth ──────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  role?: "admin" | "member" | "viewer";
  createdAt?: string;
}

// ─── API Response Envelopes ───────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

// ─── Clients ────────────────────────────────────────────────────────────────

export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateClientInput {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  address?: string;
}

export type UpdateClientInput = Partial<CreateClientInput>;

// ─── Invoices / Payments ──────────────────────────────────────────────────────

export type InvoiceStatus =
  | "draft"
  | "sent"
  | "viewed"
  | "partially_paid"
  | "paid"
  | "cancelled";

/** `status`, but resolving to "overdue" when past due with a balance. */
export type InvoiceDisplayStatus = InvoiceStatus | "overdue";

export type PaymentMethod =
  | "bank_transfer"
  | "card"
  | "cash"
  | "cheque"
  | "other";

export interface InvoiceLineItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoicePayment {
  id?: string;
  amount: number;
  method: PaymentMethod;
  reference?: string;
  paidAt: string;
  note?: string;
}

export interface InvoiceClientRef {
  clientId?: string;
  name: string;
  email?: string;
  address?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  client: InvoiceClientRef;
  projectName?: string;
  notes?: string;
  issueDate?: string;
  dueDate?: string;
  items: InvoiceLineItem[];
  taxRate: number;
  discount: number;
  subtotal: number;
  taxAmount: number;
  total: number;
  amountPaid: number;
  amountDue: number;
  status: InvoiceStatus;
  displayStatus: InvoiceDisplayStatus;
  payments: InvoicePayment[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateInvoiceInput {
  client: InvoiceClientRef;
  projectName?: string;
  notes?: string;
  issueDate?: string;
  dueDate?: string;
  items: InvoiceLineItem[];
  taxRate?: number;
  discount?: number;
}

export type UpdateInvoiceInput = Partial<CreateInvoiceInput>;

export interface RecordPaymentInput {
  amount: number;
  method?: PaymentMethod;
  reference?: string;
  paidAt?: string;
  note?: string;
}

export interface InvoiceListResult {
  items: Invoice[];
  total: number;
  page: number;
  pageSize: number;
}

export interface InvoiceSummary {
  count: number;
  totalBilled: number;
  totalPaid: number;
  outstanding: number;
  overdueAmount: number;
  overdueCount: number;
}

// ─── Budgets ──────────────────────────────────────────────────────────────────

export type BudgetPeriod =
  | "weekly"
  | "monthly"
  | "quarterly"
  | "yearly"
  | "custom";

export type BudgetStatus = "on_track" | "needs_attention" | "exceeded";

export interface BudgetSpendEntry {
  id?: string;
  amount: number;
  label?: string;
  spentAt: string;
}

export interface Budget {
  id: string;
  name: string;
  category: string;
  color?: string;
  amount: number;
  spent: number;
  remaining: number;
  progress: number;
  status: BudgetStatus;
  linkedAccount?: string;
  period: BudgetPeriod;
  autoRenew: boolean;
  alertThreshold: number;
  assignedTo: string[];
  notes?: string;
  periodStart?: string;
  periodEnd?: string;
  entries: BudgetSpendEntry[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBudgetInput {
  name: string;
  category: string;
  color?: string;
  amount: number;
  linkedAccount?: string;
  period?: BudgetPeriod;
  autoRenew?: boolean;
  alertThreshold?: number;
  assignedTo?: string[];
  notes?: string;
  periodStart?: string;
  periodEnd?: string;
}

export type UpdateBudgetInput = Partial<CreateBudgetInput>;

export interface RecordSpendInput {
  amount: number;
  label?: string;
  spentAt?: string;
}

export interface BudgetSummary {
  count: number;
  totalAllocated: number;
  totalSpent: number;
  remaining: number;
  exceeded: number;
  needsAttention: number;
}
