import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial } from "../backend.d";
import { useActor } from "../hooks/useActor";

const fallbackData: Testimonial[] = [
  {
    id: 1n,
    clientName: "Ramesh Babu",
    restaurantName: "Spice Garden",
    location: "Hyderabad, Telangana",
    quote:
      "Aswini built us a stunning website in just 5 days! Our online orders increased by 40% in the first month. Highly recommended for any restaurant owner.",
    rating: 5n,
    avatarUrl: "",
    sortOrder: 1n,
  },
  {
    id: 2n,
    clientName: "Lakshmi Devi",
    restaurantName: "Andhra Tadka",
    location: "Vijayawada, AP",
    quote:
      "We had no online presence before. Now customers find us on Google and WhatsApp us directly from the website. Best investment we made!",
    rating: 5n,
    avatarUrl: "",
    sortOrder: 2n,
  },
  {
    id: 3n,
    clientName: "Srinivas Rao",
    restaurantName: "Royal Biryani House",
    location: "Guntur, AP",
    quote:
      "Professional, fast, and very affordable. The website looks better than restaurants 10x our size. Our footfall has doubled since launching.",
    rating: 5n,
    avatarUrl: "",
    sortOrder: 3n,
  },
  {
    id: 4n,
    clientName: "Priya Sharma",
    restaurantName: "Coastal Flavours",
    location: "Visakhapatnam, AP",
    quote:
      "Aswini understood exactly what our restaurant needed. The mobile site is beautiful and our customers love ordering through it.",
    rating: 5n,
    avatarUrl: "",
    sortOrder: 4n,
  },
  {
    id: 5n,
    clientName: "Venkat Reddy",
    restaurantName: "Chai & Chaat Corner",
    location: "Tirupati, AP",
    quote:
      "3x more inquiries per week since our website went live. The investment paid back within the first week!",
    rating: 5n,
    avatarUrl: "",
    sortOrder: 5n,
  },
];

export default function TestimonialsSection() {
  const { actor } = useActor();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState<Testimonial[]>(fallbackData);
  const [current, setCurrent] = useState(0);
  const perPage = 2;

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
      .getTestimonials()
      .then((data) => {
        if (data.length > 0) setItems(data);
      })
      .catch(() => {});
  }, [actor]);

  const pages = Math.ceil(items.length / perPage);
  const next = useCallback(() => setCurrent((c) => (c + 1) % pages), [pages]);
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + pages) % pages),
    [pages],
  );

  useEffect(() => {
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [next]);

  const visibleItems = items.slice(
    current * perPage,
    current * perPage + perPage,
  );

  return (
    <section id="testimonials" className="section-padding bg-cream-dark">
      <div className="container-custom" ref={ref}>
        <div className="text-center mb-12">
          <div className="text-gold text-sm tracking-widest uppercase font-semibold mb-3">
            Client Reviews
          </div>
          <h2 className="section-title">What Restaurant Owners Say</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">
            Real results from real restaurant owners across India
          </p>
        </div>

        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {visibleItems.map((t) => (
              <div
                key={Number(t.id)}
                className="bg-cream rounded-2xl p-7 border border-gold/20 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: Number(t.rating) }).map((_, idx) => (
                    <Star
                      key={idx.toString()}
                      size={16}
                      className="fill-gold text-gold"
                    />
                  ))}
                </div>
                <p className="text-brown-mid leading-relaxed mb-5 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {t.clientName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-semibold text-brown-dark text-sm">
                      {t.clientName}
                    </div>
                    <div className="text-brown-mid text-xs">
                      {t.restaurantName} &bull; {t.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: pages }).map((_, idx) => (
                <button
                  type="button"
                  key={idx.toString()}
                  onClick={() => setCurrent(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === current ? "bg-gold" : "bg-gold/30"}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
