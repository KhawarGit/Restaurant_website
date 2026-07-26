// Background-image based photo that always keeps its frame even if the remote
// image fails to load — the tropical gradient shows through as a fallback.
export function Photo({
  src,
  alt,
  className = "",
  rounded = "rounded-2xl",
  overlay = false,
}: {
  src: string;
  alt: string;
  className?: string;
  rounded?: string;
  overlay?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden bg-gradient-to-br from-forest-700 to-forest-900 ${rounded} ${className}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-out will-change-transform hover:scale-105"
        style={{ backgroundImage: `url('${src}')` }}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-forest-900/10 to-transparent" />
      )}
    </div>
  );
}
