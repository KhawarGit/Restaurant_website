import { PalmLeaf } from "./Icons";

export function PageBanner({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
}) {
  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-forest-900 pb-14 pt-32">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgb(var(--c-forest-950) / 0.75), rgb(var(--c-forest-950) / 0.9)), url('${image}')`,
        }}
      />
      <div className="container-x relative">
        <span className="eyebrow text-gold">
          <PalmLeaf className="h-4 w-4" /> {eyebrow}
        </span>
        <h1 className="mt-4 font-serif text-4xl text-cream sm:text-5xl md:text-6xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-xl text-cream/70">{subtitle}</p>}
      </div>
    </section>
  );
}
