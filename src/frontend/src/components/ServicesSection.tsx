import { useEffect, useRef, useState } from "react";

const services = [
  {
    icon: "🎨",
    title: "Custom Restaurant Website Design",
    desc: "Unique, branded websites that reflect your restaurant's personality and attract your ideal customers.",
  },
  {
    icon: "📱",
    title: "Mobile-Friendly Websites",
    desc: "90% of customers search on mobile. Your website will look stunning on every screen size.",
  },
  {
    icon: "🍽️",
    title: "Digital Menu Setup",
    desc: "Easy-to-update digital menus that let customers browse your offerings before they even arrive.",
  },
  {
    icon: "💬",
    title: "WhatsApp Integration",
    desc: "One-tap WhatsApp button so customers can contact you instantly for reservations and orders.",
  },
  {
    icon: "📍",
    title: "Google Maps Integration",
    desc: "Help customers find you easily with embedded maps and location-based SEO optimization.",
  },
  {
    icon: "📝",
    title: "Contact Form Setup",
    desc: "Capture leads 24/7 with professional inquiry forms that send directly to your email.",
  },
  {
    icon: "🔍",
    title: "SEO-Ready Structure",
    desc: "Built to rank on Google so local customers searching for restaurants can find you first.",
  },
  {
    icon: "⚡",
    title: "Fast-Loading Pages",
    desc: "Optimized for speed so your customers never wait. Fast sites rank higher and convert better.",
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="section-padding bg-cream-dark">
      <div className="container-custom" ref={ref}>
        <div className="text-center mb-12">
          <div className="text-gold text-sm tracking-widest uppercase font-semibold mb-3">
            What I Offer
          </div>
          <h2 className="section-title">Services</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">
            Everything your restaurant needs to get found online and win more
            customers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`bg-cream rounded-xl p-6 border border-gold/20 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-default ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-2xl mb-4 group-hover:bg-gold/20 transition-colors">
                {s.icon}
              </div>
              <h3 className="font-serif font-bold text-brown-dark mb-2 text-base leading-snug">
                {s.title}
              </h3>
              <p className="text-brown-mid text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
