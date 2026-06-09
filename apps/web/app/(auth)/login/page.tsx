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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = isEmailValid && password.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    // TODO: call auth API; on success, enter the dashboard.
    router.push("/");
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <AuthHeading title="Welcome Back!" subtitle="Enter your info to continue" />

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
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
            autoComplete="current-password"
          />
          <Link
            href="/reset-password"
            className="self-end text-[12px] text-[#6e7b82] transition-colors hover:text-[#dedede]"
          >
            Forgot password?
          </Link>
        </div>

        <AuthButton disabled={!isFormValid}>Sign in</AuthButton>

        <p className="flex gap-1 text-[14px] leading-[1.1] text-[#6e7b82]">
          Don&apos;t have an account?
          <Link href="/register" className="font-medium text-[#dedede]">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
}
