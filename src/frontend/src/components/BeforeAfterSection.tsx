import { useEffect, useRef, useState } from "react";

const before = [
  "Invisible online — no website",
  "Losing customers to competitors",
  "No way to show your menu online",
  "Zero credibility to new customers",
  "Missing out on Google searches",
];

const after = [
  "Found on Google by local customers",
  "Professional brand that builds trust",
  "Digital menu always accessible",
  "24/7 customer inquiries via website",
  "More tables booked, more revenue",
];

const stats = [
  { value: "3x", label: "More Customer Inquiries" },
  { value: "#1", label: "Google Visibility" },
  { value: "24/7", label: "Online Presence" },
  { value: "7 Days", label: "Website Delivered" },
];

export default function BeforeAfterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding bg-brown-dark relative overflow-hidden">
      {/* Decorative bg */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #B7923C 0%, transparent 50%), radial-gradient(circle at 80% 50%, #B7923C 0%, transparent 50%)",
        }}
      />

      <div className="container-custom relative z-10" ref={ref}>
        <div className="text-center mb-12">
          <div className="text-gold text-sm tracking-widest uppercase font-semibold mb-3">
            The Difference
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white uppercase tracking-widest mb-4">
            Before vs After
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto mb-6 rounded-full" />
          <p className="text-white/70 max-w-xl mx-auto">
            See how a professional restaurant website transforms your business
          </p>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-6 mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Before */}
          <div className="bg-white/5 border border-red-400/30 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 text-xl">
                ❌
              </div>
              <h3 className="text-white font-serif font-bold text-xl">
                Without a Website
              </h3>
            </div>
            <ul className="space-y-3">
              {before.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                  <span className="text-white/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="bg-gold/10 border border-gold/40 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xl">
                ✨
              </div>
              <h3 className="text-white font-serif font-bold text-xl">
                With Your Website
              </h3>
            </div>
            <ul className="space-y-3">
              {after.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-gold mt-0.5 shrink-0">✓</span>
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats row */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center bg-white/5 border border-gold/20 rounded-xl p-5"
            >
              <div className="text-gold text-3xl font-bold font-serif">
                {stat.value}
              </div>
              <div className="text-white/70 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
