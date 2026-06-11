import { api } from "./api";

export const taxApi = {
  async get(): Promise<Record<string, string> | null> {
    const res = await api.get<{ data: Record<string, string> | null }>(
      "/tax/profile",
    );
    return res.data.data;
  },
  async save(data: Record<string, string>): Promise<void> {
    await api.patch("/tax/profile", { data });
  },
};
