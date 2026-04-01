const navLinks = [
  "Home",
  "Services",
  "Portfolio",
  "Pricing",
  "Testimonials",
  "Contact",
];
const services = [
  "Custom Website Design",
  "Mobile-Friendly Sites",
  "Digital Menu Setup",
  "WhatsApp Integration",
  "SEO Optimization",
  "Google Maps",
];

export default function Footer() {
  const scrollTo = (id: string) => {
    document
      .querySelector(`#${id.toLowerCase()}`)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-brown-footer text-white">
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gold text-2xl">✦</span>
              <div>
                <div className="font-serif font-bold text-lg text-cream">
                  Aswini Devi
                </div>
                <div className="text-gold text-xs tracking-widest">
                  RESTAURANT WEBSITES
                </div>
              </div>
            </div>
            <p className="text-cream/60 text-sm leading-relaxed mb-4">
              Helping restaurants across Andhra Pradesh and India build
              beautiful, customer-winning websites.
            </p>
            <div className="flex gap-3">
              {["📷", "👤", "📎", "🐙"].map((icon) => (
                <div
                  key={icon}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm hover:bg-gold/40 transition-colors cursor-pointer"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif font-bold text-cream mb-4 uppercase tracking-wide text-sm">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link)}
                    className="text-cream/60 hover:text-gold transition-colors text-sm"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif font-bold text-cream mb-4 uppercase tracking-wide text-sm">
              Services
            </h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s} className="text-cream/60 text-sm">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold text-cream mb-4 uppercase tracking-wide text-sm">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="text-cream/60 text-sm">📞 +91 98765 43210</div>
              <div className="text-cream/60 text-sm">
                ✉️ aswini@restaurantwebsites.in
              </div>
              <div className="text-cream/60 text-sm">
                📍 Andhra Pradesh, India
              </div>
              <div className="pt-2">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-500 transition-colors"
                >
                  💬 WhatsApp Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-cream/40 text-xs">
            © 2024 Aswini Devi. All rights reserved.
          </p>
          <p className="text-cream/40 text-xs">
            Restaurant Website Designer · Andhra Pradesh, India
          </p>
        </div>
      </div>
    </footer>
  );
}
