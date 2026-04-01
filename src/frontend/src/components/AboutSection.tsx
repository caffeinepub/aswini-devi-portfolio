import { useEffect, useRef, useState } from "react";

const skills = [
  "Restaurant Design",
  "Mobile-First",
  "SEO Optimized",
  "WhatsApp Integration",
  "Fast Delivery",
  "Andhra Pradesh",
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section-padding bg-cream">
      <div className="container-custom" ref={ref}>
        <div
          className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Portrait */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="w-72 h-80 rounded-2xl bg-gradient-to-br from-gold/30 via-brown-mid/20 to-brown-dark/40 flex items-center justify-center border border-gold/30 shadow-2xl">
                <div className="text-center">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-white text-4xl font-bold font-serif mx-auto mb-4 shadow-lg">
                    AD
                  </div>
                  <div className="text-brown-dark font-serif font-bold text-xl">
                    Aswini Devi
                  </div>
                  <div className="text-gold text-sm tracking-wide mt-1">
                    Restaurant Web Designer
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gold/10 rounded-full border border-gold/20" />
              <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-brown-mid/10 rounded-full border border-brown/20" />
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="text-gold text-sm tracking-widest uppercase font-semibold mb-3">
              About Me
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brown-dark mb-6 leading-tight">
              Restaurant Website Specialist from Andhra Pradesh
            </h2>
            <p className="text-brown-mid leading-relaxed mb-4">
              I'm Aswini Devi, a passionate web designer dedicated exclusively
              to helping restaurants across India build a strong online
              presence. Based in Andhra Pradesh, I understand the unique
              challenges and opportunities in the Indian restaurant industry.
            </p>
            <p className="text-brown-mid leading-relaxed mb-6">
              With 3+ years of experience, I've helped 50+ restaurants go from
              zero online presence to getting consistent customer inquiries
              through their website. My designs are mobile-first, fast-loading,
              and built to convert visitors into customers.
            </p>
            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-gold/10 text-brown-dark border border-gold/30 text-sm px-3 py-1 rounded-full font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="shimmer-btn text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:-translate-y-0.5 transition-transform"
            >
              Let's Work Together
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
