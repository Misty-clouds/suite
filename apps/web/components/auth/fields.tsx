"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function AuthHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-[18px] font-medium leading-none text-[#dedede]">
        {title}
      </h1>
      <p className="text-[14px] leading-[1.1] text-[#6e7b82]">{subtitle}</p>
    </div>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}

const fieldClass =
  "w-full rounded-[6px] border border-[#222222] bg-[#1a1a1a] px-3.5 text-[14px] text-white placeholder:text-[#6b7280] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors focus:border-[#3a3a3a] focus:outline-none";

export function AuthField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
}: FieldProps) {
  return (
    <div className="flex w-full flex-col gap-1">
      <label htmlFor={id} className="text-[14px] font-medium text-[#dedede]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`${fieldClass} h-[46px]`}
      />
    </div>
  );
}

export function AuthPasswordField({
  id,
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
}: Omit<FieldProps, "type">) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex w-full flex-col gap-1">
      <label htmlFor={id} className="text-[14px] font-medium text-[#dedede]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`${fieldClass} h-[46px] pr-11`}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6e7b82] transition-colors hover:text-white"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}

export function AuthButton({
  children,
  disabled,
  type = "submit",
}: {
  children: React.ReactNode;
  disabled?: boolean;
  type?: "submit" | "button";
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`flex h-12 w-full items-center justify-center rounded-full text-[14px] font-medium transition-all ${
        disabled
          ? "cursor-not-allowed bg-[#393939] text-[#6e7b82]"
          : "bg-[#045DDF] text-white hover:bg-[#034BBB]"
      }`}
    >
      {children}
    </button>
  );
}
