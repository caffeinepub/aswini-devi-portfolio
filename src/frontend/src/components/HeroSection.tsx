import { useEffect, useRef } from "react";

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-20 scale-110"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1920x1080.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-brown-dark/70" />

      {/* Content */}
      <div className="relative z-10 container-custom text-center py-32">
        {/* Location badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-up">
          <span className="text-gold">📍</span>
          <span className="text-white/90 text-sm tracking-wide">
            Andhra Pradesh, India
          </span>
        </div>

        <h1
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          I Build Beautiful Websites for Restaurants That{" "}
          <span className="text-gradient-gold">Bring More Customers</span>
        </h1>

        <p
          className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-up"
          style={{ animationDelay: "0.25s" }}
        >
          Helping restaurant owners across India get found online and attract
          more customers every day
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <button
            type="button"
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="shimmer-btn text-white font-bold text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-gold/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            Get Your Website Today
          </button>
          <button
            type="button"
            onClick={() =>
              document
                .querySelector("#portfolio")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="border-2 border-white/60 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
          >
            View Sample Designs
          </button>
        </div>

        {/* Stats */}
        <div
          className="flex flex-wrap justify-center gap-6 mt-16 animate-fade-up"
          style={{ animationDelay: "0.6s" }}
        >
          {[
            { value: "50+", label: "Restaurants Served" },
            { value: "5★", label: "Average Rating" },
            { value: "7 Days", label: "Fast Delivery" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4"
            >
              <div className="text-gold text-2xl font-bold font-serif">
                {stat.value}
              </div>
              <div className="text-white/80 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/60 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-white/40" />
      </div>
    </section>
  );
}
