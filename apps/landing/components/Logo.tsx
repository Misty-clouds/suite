export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid h-7 w-7 place-items-center rounded-lg btn-gradient text-sm font-bold text-white">
        S
      </span>
      <span className="text-lg font-bold tracking-tight text-app-text">
        Suite
      </span>
    </span>
  );
}
