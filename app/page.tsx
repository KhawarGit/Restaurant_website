import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Cuisines } from "@/components/sections/Cuisines";
import { Featured } from "@/components/sections/Featured";
import { Deals } from "@/components/sections/Deals";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Reserve } from "@/components/sections/Reserve";
import { Location } from "@/components/sections/Location";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Cuisines />
      <Featured />
      <Deals />
      <Gallery />
      <Testimonials />
      <Reserve />
      <Location />
    </>
  );
}
