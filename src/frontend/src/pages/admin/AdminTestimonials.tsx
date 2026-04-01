import { Pencil, Plus, Star, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Testimonial } from "../../backend.d";
import { useActor } from "../../hooks/useActor";

interface FormData {
  clientName: string;
  restaurantName: string;
  location: string;
  quote: string;
  rating: number;
  avatarUrl: string;
}

const emptyForm: FormData = {
  clientName: "",
  restaurantName: "",
  location: "",
  quote: "",
  rating: 5,
  avatarUrl: "",
};

export default function AdminTestimonials() {
  const { actor } = useActor();
  const navigate = useNavigate();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; editing?: Testimonial }>({
    open: false,
  });
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("adminToken") || "";

  const load = async () => {
    if (!actor) return;
    setLoading(true);
    try {
      setItems(await actor.getTestimonials());
    } finally {
      setLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: load depends on actor
  useEffect(() => {
    load();
  }, [actor]);

  const openAdd = () => {
    setForm(emptyForm);
    setModal({ open: true });
  };
  const openEdit = (item: Testimonial) => {
    setForm({
      clientName: item.clientName,
      restaurantName: item.restaurantName,
      location: item.location,
      quote: item.quote,
      rating: Number(item.rating),
      avatarUrl: item.avatarUrl,
    });
    setModal({ open: true, editing: item });
  };
  const closeModal = () => setModal({ open: false });

  const save = async () => {
    if (!actor || !form.clientName) return;
    setSaving(true);
    try {
      if (modal.editing) {
        await actor.updateTestimonial(
          token,
          modal.editing.id,
          form.clientName,
          form.restaurantName,
          form.location,
          form.quote,
          BigInt(form.rating),
          form.avatarUrl,
        );
      } else {
        const result = await actor.addTestimonial(
          token,
          form.clientName,
          form.restaurantName,
          form.location,
          form.quote,
          BigInt(form.rating),
          form.avatarUrl,
        );
        if (result.length === 0) {
          navigate("/admin/login");
          return;
        }
      }
      await load();
      closeModal();
    } finally {
      setSaving(false);
    }
  };

  const del = async (id: bigint) => {
    if (!actor || !confirm("Delete?")) return;
    await actor.deleteTestimonial(token, id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const inputClass =
    "w-full border border-gold/20 rounded-lg px-3 py-2.5 text-brown-dark bg-cream focus:outline-none focus:border-gold text-sm";

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-brown-dark">
            Testimonials
          </h1>
          <p className="text-brown-mid text-sm mt-1">
            {items.length} review{items.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="flex items-center gap-2 shimmer-btn text-white px-4 py-2.5 rounded-lg text-sm font-semibold"
        >
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-brown-mid">Loading...</div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={Number(item.id)}
              className="bg-white rounded-xl border border-gold/10 p-5 flex items-start justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-brown-dark">
                    {item.clientName}
                  </span>
                  <span className="text-brown-mid text-xs">
                    • {item.restaurantName} • {item.location}
                  </span>
                </div>
                <div className="flex gap-0.5 mb-1">
                  {Array.from({ length: Number(item.rating) }).map((_, idx) => (
                    <Star
                      key={idx.toString()}
                      size={12}
                      className="fill-gold text-gold"
                    />
                  ))}
                </div>
                <p className="text-brown-mid text-sm italic line-clamp-2">
                  "{item.quote}"
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => openEdit(item)}
                  className="p-2 rounded-lg bg-gold/10 text-gold hover:bg-gold/20 transition-colors"
                >
                  <Pencil size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => del(item.id)}
                  className="p-2 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal.open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif font-bold text-lg text-brown-dark">
                {modal.editing ? "Edit Testimonial" : "Add Testimonial"}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="text-brown-mid hover:text-brown"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <input
                value={form.clientName}
                onChange={(e) =>
                  setForm({ ...form, clientName: e.target.value })
                }
                placeholder="Client Name *"
                className={inputClass}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={form.restaurantName}
                  onChange={(e) =>
                    setForm({ ...form, restaurantName: e.target.value })
                  }
                  placeholder="Restaurant Name"
                  className={inputClass}
                />
                <input
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  placeholder="Location"
                  className={inputClass}
                />
              </div>
              <textarea
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
                placeholder="Testimonial quote"
                rows={3}
                className={inputClass}
              />
              <div>
                <label
                  htmlFor="testimonial-rating"
                  className="text-brown-mid text-xs mb-1 block"
                >
                  Rating
                </label>
                <select
                  id="testimonial-rating"
                  value={form.rating}
                  onChange={(e) =>
                    setForm({ ...form, rating: Number(e.target.value) })
                  }
                  className={inputClass}
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} Star{r > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 border border-gold/30 text-brown py-2.5 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="flex-1 shimmer-btn text-white py-2.5 rounded-lg text-sm font-semibold disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
