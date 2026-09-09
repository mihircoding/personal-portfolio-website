// A small square logo chip. Falls back to a monogram when there is no logo file.
export const LogoTile = ({ src, alt, name, className = "" }) => {
  if (src) {
    return (
      <img
        src={src}
        alt={alt || `${name} logo`}
        loading="lazy"
        className={`size-10 flex-shrink-0 rounded-md border border-border bg-white object-contain p-1 ${className}`}
      />
    );
  }

  const monogram = (name || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      aria-hidden="true"
      className={`flex size-10 flex-shrink-0 items-center justify-center rounded-md border border-border bg-muted font-mono text-[11px] font-medium text-muted-foreground ${className}`}
    >
      {monogram}
    </div>
  );
};
