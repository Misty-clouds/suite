import type {
  CreateInvoiceInput,
  Invoice,
  InvoiceListResult,
  InvoiceStatus,
  InvoiceSummary,
  RecordPaymentInput,
  UpdateInvoiceInput,
} from "@suite/types";
import { api } from "./api";

export interface ListInvoicesParams {
  status?: InvoiceStatus;
  search?: string;
  page?: number;
  pageSize?: number;
}

/** Typed wrappers around the API's `/invoices` endpoints. */
export const invoicesApi = {
  async list(params: ListInvoicesParams = {}): Promise<InvoiceListResult> {
    const qs = new URLSearchParams();
    if (params.status) qs.set("status", params.status);
    if (params.search) qs.set("search", params.search);
    if (params.page) qs.set("page", String(params.page));
    if (params.pageSize) qs.set("pageSize", String(params.pageSize));
    const suffix = qs.toString() ? `?${qs.toString()}` : "";
    const res = await api.get<InvoiceListResult>(`/invoices${suffix}`);
    return res.data;
  },

  async get(id: string): Promise<Invoice> {
    const res = await api.get<Invoice>(`/invoices/${id}`);
    return res.data;
  },

  async summary(): Promise<InvoiceSummary> {
    const res = await api.get<InvoiceSummary>("/invoices/summary");
    return res.data;
  },

  async create(input: CreateInvoiceInput): Promise<Invoice> {
    const res = await api.post<Invoice>("/invoices", input);
    return res.data;
  },

  async update(id: string, input: UpdateInvoiceInput): Promise<Invoice> {
    const res = await api.patch<Invoice>(`/invoices/${id}`, input);
    return res.data;
  },

  async send(id: string): Promise<Invoice> {
    const res = await api.post<Invoice>(`/invoices/${id}/send`, {});
    return res.data;
  },

  async cancel(id: string): Promise<Invoice> {
    const res = await api.post<Invoice>(`/invoices/${id}/cancel`, {});
    return res.data;
  },

  async recordPayment(id: string, input: RecordPaymentInput): Promise<Invoice> {
    const res = await api.post<Invoice>(`/invoices/${id}/payments`, input);
    return res.data;
  },

  async markPaid(id: string): Promise<Invoice> {
    const res = await api.post<Invoice>(`/invoices/${id}/mark-paid`, {});
    return res.data;
  },

  async remove(id: string): Promise<void> {
    await api.del(`/invoices/${id}`);
  },
};
