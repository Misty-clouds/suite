/** Generic Suite "S" logo (matches the landing site). */
export function Logo({
  className = "",
  showText = true,
  size = 28,
}: {
  className?: string;
  showText?: boolean;
  size?: number;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className="grid shrink-0 place-items-center rounded-lg bg-gradient-to-b from-[#045DDF] to-[#0792F1] font-bold text-white"
        style={{ height: size, width: size, fontSize: Math.round(size * 0.5) }}
      >
        S
      </span>
      {showText && (
        <span className="text-lg font-bold tracking-tight text-white">
          Suite
        </span>
      )}
    </span>
  );
}
