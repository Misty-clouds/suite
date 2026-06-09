"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AuthHeading,
  AuthField,
  AuthPasswordField,
  AuthButton,
} from "@/components/auth/fields";
import { useAuth } from "@/components/auth/AuthProvider";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 8;
  const isFormValid =
    fullName.trim().length > 0 && isEmailValid && isPasswordValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      await register(fullName.trim(), email, password);
      // New accounts go through onboarding first.
      router.replace("/onboarding");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account");
      setSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <AuthHeading
        title="Create Account"
        subtitle="Fill in your details to get started"
      />

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <AuthField
            id="fullName"
            label="Full name"
            value={fullName}
            onChange={setFullName}
            autoComplete="name"
          />
          <AuthField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
          />
          <AuthPasswordField
            id="password"
            label="Password"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
          />
          {error && <p className="text-[12px] text-[#FF8080]">{error}</p>}
        </div>

        <AuthButton disabled={!isFormValid || submitting}>
          {submitting ? "Creating account…" : "Sign up"}
        </AuthButton>

        <p className="flex gap-1 text-[14px] leading-[1.1] text-[#6e7b82]">
          Already have an account?
          <Link href="/login" className="font-medium text-[#dedede]">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
