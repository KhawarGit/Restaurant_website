import { PalmLeaf } from "./Icons";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
};

export function SectionHeading({ eyebrow, title, subtitle, align = "center", light = false }: Props) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className="eyebrow">
          <PalmLeaf className="h-4 w-4" />
          {eyebrow}
        </span>
      )}
      <h2 className={`mt-4 font-serif text-3xl leading-tight sm:text-4xl md:text-[2.75rem] ${light ? "text-cream" : "text-forest-900"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed ${light ? "text-cream/70" : "text-forest-900/65"}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
