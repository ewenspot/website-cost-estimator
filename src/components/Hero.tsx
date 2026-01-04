import { ScrollReveal } from "./ui/ScrollReveal";

function Hero() {
  return (
    <div>
      <ScrollReveal className="text-background text-4xl md:text-7xl mt-16 text-center">
        Website Cost <span className="text-cyan-400">Estimator</span>.
      </ScrollReveal>
      <ScrollReveal
        textFormat="p"
        delay={100}
        className="text-muted text-sm md:text-lg mt-4 text-center"
      >
        Estimate your website cost in seconds.
      </ScrollReveal>
    </div>
  );
}

export default Hero;
