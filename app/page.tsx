import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Problems } from "@/components/sections/Problems";
import { Solutions } from "@/components/sections/Solutions";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Newsletter } from "@/components/sections/Newsletter";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Problems />
      <Solutions />
      <Services />
      <Testimonials />
      <Newsletter />
      <CTA />
    </>
  );
}
