import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PricingPackage } from "../backend.d";
import { useActor } from "../hooks/useActor";

const fallbackPackages: PricingPackage[] = [
  {
    id: 1n,
    name: "Starter",
    price: "\u20b98,999",
    description: "Perfect for small restaurants just getting started online",
    features: [
      "5-Page Website",
      "Mobile Responsive",
      "Contact Form",
      "Google Maps",
      "WhatsApp Button",
      "1 Month Support",
    ],
    highlighted: false,
    ctaText: "Get Started",
    sortOrder: 1n,
  },
  {
    id: 2n,
    name: "Professional",
    price: "\u20b914,999",
    description: "Ideal for growing restaurants wanting more features",
    features: [
      "10-Page Website",
      "Digital Menu",
      "SEO Optimized",
      "Photo Gallery",
      "Reservation Form",
      "3 Months Support",
      "Google Analytics",
    ],
    highlighted: true,
    ctaText: "Most Popular",
    sortOrder: 2n,
  },
  {
    id: 3n,
    name: "Premium",
    price: "\u20b924,999",
    description: "Complete online presence for established restaurants",
    features: [
      "Unlimited Pages",
      "Online Ordering",
      "Blog/News Section",
      "Customer Reviews",
      "Priority SEO",
      "WhatsApp Automation",
      "6 Months Support",
    ],
    highlighted: false,
    ctaText: "Go Premium",
    sortOrder: 3n,
  },
];

export default function PricingSection() {
  const { actor } = useActor();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [packages, setPackages] = useState<PricingPackage[]>(fallbackPackages);

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

  useEffect(() => {
    if (!actor) return;
    actor
      .getPricingPackages()
      .then((data) => {
        if (data.length > 0) setPackages(data);
      })
      .catch(() => {});
  }, [actor]);

  return (
    <section id="pricing" className="section-padding bg-cream">
      <div className="container-custom" ref={ref}>
        <div className="text-center mb-12">
          <div className="text-gold text-sm tracking-widest uppercase font-semibold mb-3">
            Packages
          </div>
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">
            Choose the package that fits your restaurant. No hidden fees, no
            surprises.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {packages.map((pkg, i) => (
            <div
              key={Number(pkg.id)}
              className={`relative rounded-2xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                pkg.highlighted
                  ? "bg-brown-dark border-2 border-gold shadow-xl shadow-gold/20"
                  : "bg-white border border-gold/20 shadow-sm hover:shadow-lg"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {pkg.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                  MOST POPULAR
                </div>
              )}
              <div className="mb-6">
                <div
                  className={`text-sm font-semibold tracking-widest uppercase mb-2 ${pkg.highlighted ? "text-gold" : "text-gold-dark"}`}
                >
                  {pkg.name}
                </div>
                <div
                  className={`font-serif text-4xl font-bold mb-2 ${pkg.highlighted ? "text-white" : "text-brown-dark"}`}
                >
                  {pkg.price}
                </div>
                <p
                  className={`text-sm ${pkg.highlighted ? "text-white/70" : "text-brown-mid"}`}
                >
                  {pkg.description}
                </p>
              </div>
              <ul className="space-y-3 flex-1 mb-7">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check size={16} className="text-gold shrink-0" />
                    <span
                      className={`text-sm ${pkg.highlighted ? "text-white/90" : "text-brown-mid"}`}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 ${
                  pkg.highlighted
                    ? "shimmer-btn text-white shadow-md"
                    : "border-2 border-gold text-gold-dark hover:bg-gold hover:text-white"
                }`}
              >
                {pkg.ctaText}
              </button>
            </div>
          ))}
        </div>
        <p className="text-center text-brown-mid text-sm mt-8">
          All prices in INR. Contact me for custom packages.
        </p>
      </div>
    </section>
  );
}
