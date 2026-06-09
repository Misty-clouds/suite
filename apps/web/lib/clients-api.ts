import type { Client, CreateClientInput, UpdateClientInput } from "@suite/types";
import { api } from "./api";

/** Typed wrappers around the API's `/clients` endpoints. */
export const clientsApi = {
  async list(search?: string): Promise<Client[]> {
    const qs = search ? `?search=${encodeURIComponent(search)}` : "";
    const res = await api.get<Client[]>(`/clients${qs}`);
    return res.data;
  },

  async create(input: CreateClientInput): Promise<Client> {
    const res = await api.post<Client>("/clients", input);
    return res.data;
  },

  async update(id: string, input: UpdateClientInput): Promise<Client> {
    const res = await api.patch<Client>(`/clients/${id}`, input);
    return res.data;
  },

  async remove(id: string): Promise<void> {
    await api.del(`/clients/${id}`);
  },
};
