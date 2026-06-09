"use client";

import Link from "next/link";
import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { AuthHeading, AuthField, AuthButton } from "@/components/auth/fields";

type Step = "email" | "code";

// Dummy email that "exists" in the system
const DUMMY_EMAIL = "cloudstech@gmail.com";

export default function ResetPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [codeError, setCodeError] = useState("");
  const [success, setSuccess] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isCodeComplete = code.every((d) => d !== "");

  // ── Step 1: Email submit ──────────────────────────────────────────────────
  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEmailValid) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (email.toLowerCase() !== DUMMY_EMAIL) {
      setEmailError("No account found with that email address.");
      return;
    }
    setEmailError("");
    setStep("code");
  }

  // ── Step 2: OTP input helpers ─────────────────────────────────────────────
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
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = Array(6).fill("");
    pasted.split("").forEach((ch, i) => (next[i] = ch));
    setCode(next);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  }

  function handleCodeSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isCodeComplete) {
      setCodeError("Please enter all 6 digits.");
      return;
    }
    if (code.join("") !== "123456") {
      setCodeError("Invalid code. Please try again.");
      return;
    }
    setCodeError("");
    setSuccess(true);
  }

  if (success) {
    return (
      <SuccessView
        onBack={() => {
          setStep("email");
          setEmail("");
          setCode(Array(6).fill(""));
          setSuccess(false);
        }}
      />
    );
  }

  if (step === "email") {
    return (
      <EmailStep
        email={email}
        setEmail={setEmail}
        emailError={emailError}
        isEmailValid={isEmailValid}
        onSubmit={handleEmailSubmit}
      />
    );
  }

  return (
    <CodeStep
      email={email}
      code={code}
      codeError={codeError}
      isCodeComplete={isCodeComplete}
      inputRefs={inputRefs}
      onCodeChange={handleCodeChange}
      onCodeKeyDown={handleCodeKeyDown}
      onCodePaste={handleCodePaste}
      onSubmit={handleCodeSubmit}
      onBack={() => {
        setStep("email");
        setCode(Array(6).fill(""));
        setCodeError("");
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
  onSubmit,
}: {
  email: string;
  setEmail: (v: string) => void;
  emailError: string;
  isEmailValid: boolean;
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
          {emailError && <p className="text-[12px] text-[#FF8080]">{emailError}</p>}
        </div>
        <AuthButton disabled={!isEmailValid}>Continue</AuthButton>
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
  inputRefs,
  onCodeChange,
  onCodeKeyDown,
  onCodePaste,
  onSubmit,
  onBack,
}: {
  email: string;
  code: string[];
  codeError: string;
  isCodeComplete: boolean;
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>;
  onCodeChange: (i: number, v: string) => void;
  onCodeKeyDown: (i: number, e: KeyboardEvent<HTMLInputElement>) => void;
  onCodePaste: (e: ClipboardEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}) {
  const otpClass =
    "h-12 w-full min-w-0 rounded-[6px] border border-[#222222] bg-[#1a1a1a] text-center text-lg font-medium text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors focus:border-[#3a3a3a] focus:outline-none caret-transparent";

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <AuthHeading title="Reset password" subtitle={`Enter the code sent to ${email}`} />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-medium text-[#dedede]">Enter code</label>
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
          <p className="text-[12px] text-[#4e4e4e]">
            Hint: the dummy code is{" "}
            <span className="font-medium text-[#6e7b82]">123456</span>
          </p>
        </div>
        <AuthButton disabled={!isCodeComplete}>Continue</AuthButton>
        <button type="button" onClick={onBack} className={backLinkClass}>
          <ArrowLeft size={16} />
          Back
        </button>
      </div>
    </form>
  );
}

// ── Success state ─────────────────────────────────────────────────────────────
function SuccessView({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#045DDF]/30 bg-[#045DDF]/15 text-[#045DDF]">
        <Check size={26} />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-[18px] font-medium text-[#dedede]">Code verified!</h1>
        <p className="text-[14px] leading-[1.3] text-[#6e7b82]">
          Your identity has been confirmed. You can now set a new password.
        </p>
      </div>
      <div className="flex w-full flex-col gap-4">
        <Link
          href="/login"
          className="flex h-12 w-full items-center justify-center rounded-full bg-[#045DDF] text-[14px] font-medium text-white transition-colors hover:bg-[#034BBB]"
        >
          Set new password
        </Link>
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-1.5 text-[14px] text-[#6e7b82] transition-colors hover:text-[#dedede]"
        >
          <ArrowLeft size={16} />
          Back to login
        </button>
      </div>
    </div>
  );
}
