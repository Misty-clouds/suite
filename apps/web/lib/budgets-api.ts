import type {
  Budget,
  BudgetSummary,
  CreateBudgetInput,
  RecordSpendInput,
  UpdateBudgetInput,
} from "@suite/types";
import { api } from "./api";

/** Typed wrappers around the API's `/budgets` endpoints. */
export const budgetsApi = {
  async list(category?: string): Promise<Budget[]> {
    const qs = category ? `?category=${encodeURIComponent(category)}` : "";
    const res = await api.get<Budget[]>(`/budgets${qs}`);
    return res.data;
  },

  async get(id: string): Promise<Budget> {
    const res = await api.get<Budget>(`/budgets/${id}`);
    return res.data;
  },

  async summary(): Promise<BudgetSummary> {
    const res = await api.get<BudgetSummary>("/budgets/summary");
    return res.data;
  },

  async create(input: CreateBudgetInput): Promise<Budget> {
    const res = await api.post<Budget>("/budgets", input);
    return res.data;
  },

  async update(id: string, input: UpdateBudgetInput): Promise<Budget> {
    const res = await api.patch<Budget>(`/budgets/${id}`, input);
    return res.data;
  },

  async recordSpend(id: string, input: RecordSpendInput): Promise<Budget> {
    const res = await api.post<Budget>(`/budgets/${id}/spend`, input);
    return res.data;
  },

  async reset(id: string): Promise<Budget> {
    const res = await api.post<Budget>(`/budgets/${id}/reset`, {});
    return res.data;
  },

  async remove(id: string): Promise<void> {
    await api.del(`/budgets/${id}`);
  },
};
