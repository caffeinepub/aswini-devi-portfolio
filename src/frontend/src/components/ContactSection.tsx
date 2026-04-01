import { CheckCircle, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { useActor } from "../hooks/useActor";

export default function ContactSection() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    restaurantName: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.restaurantName ||
      !form.message
    ) {
      setError("Please fill all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      if (actor) {
        await actor.submitContact(
          form.name,
          form.email,
          form.phone,
          form.restaurantName,
          form.message,
        );
      }
      setSuccess(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        restaurantName: "",
        message: "",
      });
    } catch {
      setError("Something went wrong. Please try WhatsApp instead.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-gold transition-colors text-sm";

  return (
    <section
      id="contact"
      className="section-padding bg-brown-dark relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1920x1080.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-brown-dark/80" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <div className="text-gold text-sm tracking-widest uppercase font-semibold mb-3">
            Get In Touch
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white uppercase tracking-widest mb-4">
            Let's Build Your Restaurant Website
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto mb-4 rounded-full" />
          <p className="text-white/70 max-w-xl mx-auto">
            Ready to get more customers? Fill the form or reach me directly via
            WhatsApp.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Form */}
          <div>
            {success ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <CheckCircle size={64} className="text-gold mx-auto mb-4" />
                  <h3 className="text-white font-serif text-2xl font-bold mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-white/70">
                    Thank you! I'll get back to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="mt-6 text-gold underline text-sm"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={inputClass}
                  />
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    type="email"
                    className={inputClass}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    type="tel"
                    className={inputClass}
                  />
                  <input
                    name="restaurantName"
                    value={form.restaurantName}
                    onChange={handleChange}
                    placeholder="Restaurant Name"
                    className={inputClass}
                  />
                </div>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your restaurant and what you need..."
                  rows={5}
                  className={inputClass}
                />
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full shimmer-btn text-white font-semibold py-3.5 rounded-xl shadow-lg hover:-translate-y-0.5 transition-transform disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send My Request"}
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-5">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-green-600 hover:bg-green-500 transition-colors rounded-xl p-5 group"
            >
              <MessageCircle size={32} className="text-white" />
              <div>
                <div className="text-white font-bold text-lg">
                  Chat on WhatsApp
                </div>
                <div className="text-white/80 text-sm">
                  Get a quick response within minutes
                </div>
              </div>
            </a>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-white/60 text-xs uppercase tracking-wide">
                    Phone
                  </div>
                  <a
                    href="tel:+919876543210"
                    className="text-white font-medium hover:text-gold transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-white/60 text-xs uppercase tracking-wide">
                    Email
                  </div>
                  <a
                    href="mailto:aswini@restaurantwebsites.in"
                    className="text-white font-medium hover:text-gold transition-colors"
                  >
                    aswini@restaurantwebsites.in
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-white/60 text-xs uppercase tracking-wide">
                    Location
                  </div>
                  <div className="text-white font-medium">
                    Andhra Pradesh, India
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gold/10 border border-gold/30 rounded-xl p-5">
              <div className="text-gold font-semibold mb-1">
                ⏰ Response Time
              </div>
              <p className="text-white/80 text-sm">
                I typically respond within 2-4 hours. For urgent projects,
                WhatsApp is fastest!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
