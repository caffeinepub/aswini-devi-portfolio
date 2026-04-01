import { ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PortfolioItem } from "../backend.d";
import { useActor } from "../hooks/useActor";

const fallbackItems: PortfolioItem[] = [
  {
    id: 1n,
    title: "Spice Garden",
    cuisine: "South Indian",
    description:
      "A vibrant website for a traditional South Indian restaurant in Hyderabad featuring digital menu and table booking.",
    imageUrl: "",
    projectUrl: "#",
    sortOrder: 1n,
  },
  {
    id: 2n,
    title: "Royal Biryani House",
    cuisine: "Mughlai",
    description:
      "Premium landing page for a biryani specialist showcasing signature dishes with WhatsApp ordering integration.",
    imageUrl: "",
    projectUrl: "#",
    sortOrder: 2n,
  },
  {
    id: 3n,
    title: "Coastal Flavours",
    cuisine: "Seafood",
    description:
      "Elegant seafood restaurant site with animated gallery, daily specials section, and Google Maps integration.",
    imageUrl: "",
    projectUrl: "#",
    sortOrder: 3n,
  },
  {
    id: 4n,
    title: "Andhra Tadka",
    cuisine: "Andhra Cuisine",
    description:
      "Bold and spicy branding site for a local Andhra restaurant with interactive menu and customer reviews.",
    imageUrl: "",
    projectUrl: "#",
    sortOrder: 4n,
  },
  {
    id: 5n,
    title: "Chai & Chaat Corner",
    cuisine: "Street Food",
    description:
      "Fun, colorful website for a chaat and street food stall with delivery info and Instagram feed integration.",
    imageUrl: "",
    projectUrl: "#",
    sortOrder: 5n,
  },
];

function getImageUrl(item: PortfolioItem): string {
  if (item.imageUrl && item.imageUrl !== "") return item.imageUrl;
  const num = Number(item.id);
  if (num >= 1 && num <= 5)
    return `/assets/generated/portfolio${num}.dim_800x500.jpg`;
  return "/assets/generated/portfolio1.dim_800x500.jpg";
}

export default function PortfolioSection() {
  const { actor } = useActor();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState<PortfolioItem[]>(fallbackItems);

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
      .getPortfolioItems()
      .then((data) => {
        if (data.length > 0) setItems(data);
      })
      .catch(() => {});
  }, [actor]);

  return (
    <section id="portfolio" className="section-padding bg-cream">
      <div className="container-custom" ref={ref}>
        <div className="text-center mb-12">
          <div className="text-gold text-sm tracking-widest uppercase font-semibold mb-3">
            My Work
          </div>
          <h2 className="section-title">Sample Designs</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">
            A showcase of restaurant websites I've designed for clients across
            Andhra Pradesh and beyond
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={Number(item.id)}
              className={`group relative bg-white rounded-2xl overflow-hidden border border-gold/20 shadow-sm hover:shadow-xl transition-all duration-400 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-52">
                <img
                  src={getImageUrl(item)}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-brown-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="flex items-center gap-2 text-white font-semibold border border-white/60 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                    <ExternalLink size={16} /> View Project
                  </span>
                </div>
              </div>
              {/* Content */}
              <div className="p-5">
                <span className="inline-block bg-gold/10 text-gold-dark text-xs font-semibold px-3 py-1 rounded-full mb-3 border border-gold/20">
                  {item.cuisine}
                </span>
                <h3 className="font-serif font-bold text-brown-dark text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-brown-mid text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            type="button"
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="shimmer-btn text-white font-semibold px-8 py-3.5 rounded-xl shadow-md hover:-translate-y-0.5 transition-transform"
          >
            Get Your Restaurant Website
          </button>
        </div>
      </div>
    </section>
  );
}
