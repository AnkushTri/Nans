type PlaceholderImageProps = { label: string; className?: string };

export function PlaceholderImage({ label, className = "" }: PlaceholderImageProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center bg-gradient-to-br from-rose-200 to-amber-200 font-mono text-xs uppercase tracking-widest text-ink/60 ${className}`}
    >
      {label}
    </div>
  );
}
