"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import type { Client } from "@suite/types";
import { clientsApi } from "@/lib/clients-api";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: (client: Client) => void;
}

export default function AddClientModal({
  isOpen,
  onClose,
  onCreated,
}: AddClientModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const reset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setError(null);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Client name is required");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const client = await clientsApi.create({
        name: name.trim(),
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        address: address.trim() || undefined,
      });
      onCreated?.(client);
      reset();
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not add client");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-[#272727] bg-[#1a1a1a] px-3 py-2.5 text-[13px] text-white focus:border-zinc-500 focus:outline-none transition-colors";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="w-[480px] rounded-2xl bg-[#141414] p-6 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-[15px] font-medium text-white mb-1">
              Add new client
            </h2>
            <p className="text-[13px] text-zinc-500">
              Fill details below to add a new client
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto scrollbar-hide py-1">
          <div>
            <label className="mb-2 block text-[13px] text-zinc-300">
              Client name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-[13px] text-zinc-300">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-[13px] text-zinc-300">
              Phone number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-[13px] text-zinc-300">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={inputClass}
            />
          </div>

          {error && <p className="text-[12px] text-rose-400">{error}</p>}
        </div>

        <div className="mt-6 flex gap-3 pt-2">
          <button
            onClick={handleClose}
            className="flex-1 rounded-lg border border-[#272727] bg-transparent py-2.5 text-[13px] font-medium text-white hover:bg-[#1a1a1a] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-[13px] font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            Add and select
          </button>
        </div>
      </div>
    </div>
  );
}
