export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      }
    >
      <div className={align === "center" ? "" : "max-w-md"}>
        {eyebrow && (
          <span className="gradient-pill mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium text-app-text-muted">
            {eyebrow}
          </span>
        )}
        <h2 className="text-3xl font-bold tracking-tight text-app-text md:text-4xl">
          {title}
        </h2>
      </div>
      {description && (
        <p
          className={`text-app-text-muted ${
            align === "center" ? "mt-4" : "max-w-sm md:text-right"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
