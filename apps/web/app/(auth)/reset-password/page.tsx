"use client";

import Link from "next/link";
import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";
import { ArrowLeft, Check } from "lucide-react";
import {
  AuthHeading,
  AuthField,
  AuthPasswordField,
  AuthButton,
} from "@/components/auth/fields";
import { authApi } from "@/lib/auth-api";

type Step = "email" | "code" | "password";

function errorMessage(err: unknown, fallback: string): string {
  return err instanceof Error ? err.message : fallback;
}

export default function ResetPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isCodeComplete = code.every((d) => d !== "");
  const isPasswordValid = password.length >= 8 && password === confirm;

  // ── Step 1: request a code ────────────────────────────────────────────────
  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEmailValid || submitting) return;
    setSubmitting(true);
    setEmailError("");
    try {
      await authApi.forgotPassword(email);
      // Always advance — the API never reveals whether the email exists.
      setStep("code");
    } catch (err) {
      setEmailError(errorMessage(err, "Something went wrong. Try again."));
    } finally {
      setSubmitting(false);
    }
  }

  // ── Step 2: verify the code ───────────────────────────────────────────────
  async function handleCodeSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isCodeComplete || submitting) return;
    setSubmitting(true);
    setCodeError("");
    try {
      await authApi.verifyResetCode(email, code.join(""));
      setStep("password");
    } catch (err) {
      setCodeError(errorMessage(err, "Invalid or expired code."));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResend() {
    if (submitting) return;
    setCodeError("");
    try {
      await authApi.forgotPassword(email);
    } catch {
      // ignore — resend is best effort
    }
  }

  // ── Step 3: set a new password ────────────────────────────────────────────
  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    setPasswordError("");
    try {
      await authApi.resetPassword(email, code.join(""), password);
      setSuccess(true);
    } catch (err) {
      setPasswordError(errorMessage(err, "Could not reset password."));
    } finally {
      setSubmitting(false);
    }
  }

  // ── OTP input helpers ─────────────────────────────────────────────────────
  function handleCodeChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);
    setCodeError("");
    if (digit && index < 5) inputRefs.current[index + 1]?.focus();
  }

  function handleCodeKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      if (code[index]) {
        const next = [...code];
        next[index] = "";
        setCode(next);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleCodePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;
    const next = Array(6).fill("");
    pasted.split("").forEach((ch, i) => (next[i] = ch));
    setCode(next);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  }

  if (success) {
    return <SuccessView />;
  }

  if (step === "email") {
    return (
      <EmailStep
        email={email}
        setEmail={setEmail}
        emailError={emailError}
        isEmailValid={isEmailValid}
        submitting={submitting}
        onSubmit={handleEmailSubmit}
      />
    );
  }

  if (step === "code") {
    return (
      <CodeStep
        email={email}
        code={code}
        codeError={codeError}
        isCodeComplete={isCodeComplete}
        submitting={submitting}
        inputRefs={inputRefs}
        onCodeChange={handleCodeChange}
        onCodeKeyDown={handleCodeKeyDown}
        onCodePaste={handleCodePaste}
        onResend={handleResend}
        onSubmit={handleCodeSubmit}
        onBack={() => {
          setStep("email");
          setCode(Array(6).fill(""));
          setCodeError("");
        }}
      />
    );
  }

  return (
    <PasswordStep
      password={password}
      confirm={confirm}
      setPassword={setPassword}
      setConfirm={setConfirm}
      passwordError={passwordError}
      isPasswordValid={isPasswordValid}
      submitting={submitting}
      onSubmit={handlePasswordSubmit}
      onBack={() => {
        setStep("code");
        setPasswordError("");
      }}
    />
  );
}

const backLinkClass =
  "flex items-center justify-center gap-1.5 text-[14px] text-[#6e7b82] transition-colors hover:text-[#dedede]";

// ── Step 1: Email ───────────────────────────────────────────────────────────
function EmailStep({
  email,
  setEmail,
  emailError,
  isEmailValid,
  submitting,
  onSubmit,
}: {
  email: string;
  setEmail: (v: string) => void;
  emailError: string;
  isEmailValid: boolean;
  submitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <AuthHeading
        title="Forgot your password?"
        subtitle="Enter your email to reset it"
      />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <AuthField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
          />
          {emailError && (
            <p className="text-[12px] text-[#FF8080]">{emailError}</p>
          )}
        </div>
        <AuthButton disabled={!isEmailValid || submitting}>
          {submitting ? "Sending…" : "Send code"}
        </AuthButton>
        <Link href="/login" className={backLinkClass}>
          <ArrowLeft size={16} />
          Back to login
        </Link>
      </div>
    </form>
  );
}

// ── Step 2: OTP Code ──────────────────────────────────────────────────────────
function CodeStep({
  email,
  code,
  codeError,
  isCodeComplete,
  submitting,
  inputRefs,
  onCodeChange,
  onCodeKeyDown,
  onCodePaste,
  onResend,
  onSubmit,
  onBack,
}: {
  email: string;
  code: string[];
  codeError: string;
  isCodeComplete: boolean;
  submitting: boolean;
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>;
  onCodeChange: (i: number, v: string) => void;
  onCodeKeyDown: (i: number, e: KeyboardEvent<HTMLInputElement>) => void;
  onCodePaste: (e: ClipboardEvent<HTMLInputElement>) => void;
  onResend: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}) {
  const otpClass =
    "h-12 w-full min-w-0 rounded-[6px] border border-[#222222] bg-[#1a1a1a] text-center text-lg font-medium text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors focus:border-[#3a3a3a] focus:outline-none caret-transparent";

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <AuthHeading
        title="Reset password"
        subtitle={`Enter the code sent to ${email}`}
      />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-medium text-[#dedede]">
            Enter code
          </label>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={code[i]}
                onChange={(e) => onCodeChange(i, e.target.value)}
                onKeyDown={(e) => onCodeKeyDown(i, e)}
                onPaste={onCodePaste}
                className={otpClass}
              />
            ))}
            <span className="shrink-0 select-none text-[#4e4e4e]">—</span>
            {[3, 4, 5].map((i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={code[i]}
                onChange={(e) => onCodeChange(i, e.target.value)}
                onKeyDown={(e) => onCodeKeyDown(i, e)}
                onPaste={onCodePaste}
                className={otpClass}
              />
            ))}
          </div>
          {codeError && <p className="text-[12px] text-[#FF8080]">{codeError}</p>}
          <button
            type="button"
            onClick={onResend}
            className="self-start text-[12px] text-[#6e7b82] transition-colors hover:text-[#dedede]"
          >
            Didn&apos;t get it? Resend code
          </button>
        </div>
        <AuthButton disabled={!isCodeComplete || submitting}>
          {submitting ? "Verifying…" : "Continue"}
        </AuthButton>
        <button type="button" onClick={onBack} className={backLinkClass}>
          <ArrowLeft size={16} />
          Back
        </button>
      </div>
    </form>
  );
}

// ── Step 3: New password ──────────────────────────────────────────────────────
function PasswordStep({
  password,
  confirm,
  setPassword,
  setConfirm,
  passwordError,
  isPasswordValid,
  submitting,
  onSubmit,
  onBack,
}: {
  password: string;
  confirm: string;
  setPassword: (v: string) => void;
  setConfirm: (v: string) => void;
  passwordError: string;
  isPasswordValid: boolean;
  submitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}) {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <AuthHeading
        title="Set a new password"
        subtitle="Choose a strong password you'll remember"
      />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <AuthPasswordField
            id="new-password"
            label="New password"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
          />
          <AuthPasswordField
            id="confirm-password"
            label="Confirm password"
            value={confirm}
            onChange={setConfirm}
            autoComplete="new-password"
          />
          {passwordError && (
            <p className="text-[12px] text-[#FF8080]">{passwordError}</p>
          )}
        </div>
        <AuthButton disabled={!isPasswordValid || submitting}>
          {submitting ? "Updating…" : "Update password"}
        </AuthButton>
        <button type="button" onClick={onBack} className={backLinkClass}>
          <ArrowLeft size={16} />
          Back
        </button>
      </div>
    </form>
  );
}

// ── Success state ─────────────────────────────────────────────────────────────
function SuccessView() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#045DDF]/30 bg-[#045DDF]/15 text-[#045DDF]">
        <Check size={26} />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-[18px] font-medium text-[#dedede]">
          Password updated!
        </h1>
        <p className="text-[14px] leading-[1.3] text-[#6e7b82]">
          Your password has been changed. You can now sign in with your new
          password.
        </p>
      </div>
      <Link
        href="/login"
        className="flex h-12 w-full items-center justify-center rounded-full bg-[#045DDF] text-[14px] font-medium text-white transition-colors hover:bg-[#034BBB]"
      >
        Back to login
      </Link>
    </div>
  );
}
