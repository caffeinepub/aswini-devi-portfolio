import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-cream shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("#hero")}
            className="flex items-center gap-2 group"
          >
            <span className="text-gold text-2xl">✦</span>
            <div className="leading-tight">
              <div
                className={`font-serif font-bold text-lg transition-colors ${
                  scrolled ? "text-brown-dark" : "text-white"
                }`}
              >
                Aswini Devi
              </div>
              <div
                className={`text-xs tracking-widest transition-colors ${
                  scrolled ? "text-gold" : "text-gold-pale"
                }`}
              >
                RESTAURANT WEBSITES
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-gold ${
                  scrolled ? "text-brown" : "text-white/90"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => scrollTo("#contact")}
              className="shimmer-btn text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              Free Consultation
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className={`md:hidden transition-colors ${
              scrolled ? "text-brown-dark" : "text-white"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream border-t border-gold/20 shadow-lg">
          <div className="container-custom py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-left text-brown font-medium py-2 hover:text-gold transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => scrollTo("#contact")}
              className="shimmer-btn text-white font-semibold px-5 py-2.5 rounded-lg mt-2"
            >
              Free Consultation
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
