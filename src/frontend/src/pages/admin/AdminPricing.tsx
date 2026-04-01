import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { PricingPackage } from "../../backend.d";
import { useActor } from "../../hooks/useActor";

interface FormData {
  name: string;
  price: string;
  description: string;
  featuresText: string;
  highlighted: boolean;
  ctaText: string;
}

const emptyForm: FormData = {
  name: "",
  price: "",
  description: "",
  featuresText: "",
  highlighted: false,
  ctaText: "Get Started",
};

export default function AdminPricing() {
  const { actor } = useActor();
  const navigate = useNavigate();
  const [items, setItems] = useState<PricingPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{
    open: boolean;
    editing?: PricingPackage;
  }>({ open: false });
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("adminToken") || "";

  const load = async () => {
    if (!actor) return;
    setLoading(true);
    try {
      setItems(await actor.getPricingPackages());
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
  const openEdit = (item: PricingPackage) => {
    setForm({
      name: item.name,
      price: item.price,
      description: item.description,
      featuresText: item.features.join("\n"),
      highlighted: item.highlighted,
      ctaText: item.ctaText,
    });
    setModal({ open: true, editing: item });
  };
  const closeModal = () => setModal({ open: false });

  const save = async () => {
    if (!actor || !form.name || !form.price) return;
    const features = form.featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);
    setSaving(true);
    try {
      if (modal.editing) {
        await actor.updatePricingPackage(
          token,
          modal.editing.id,
          form.name,
          form.price,
          form.description,
          features,
          form.highlighted,
          form.ctaText,
        );
      } else {
        const result = await actor.addPricingPackage(
          token,
          form.name,
          form.price,
          form.description,
          features,
          form.highlighted,
          form.ctaText,
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
    await actor.deletePricingPackage(token, id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const inputClass =
    "w-full border border-gold/20 rounded-lg px-3 py-2.5 text-brown-dark bg-cream focus:outline-none focus:border-gold text-sm";

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-brown-dark">
            Pricing Packages
          </h1>
          <p className="text-brown-mid text-sm mt-1">
            {items.length} package{items.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="flex items-center gap-2 shimmer-btn text-white px-4 py-2.5 rounded-lg text-sm font-semibold"
        >
          <Plus size={16} /> Add Package
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-brown-mid">Loading...</div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={Number(item.id)}
              className="bg-white rounded-xl border border-gold/10 p-5 flex items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-brown-dark">
                    {item.name}
                  </span>
                  <span className="text-gold font-bold">{item.price}</span>
                  {item.highlighted && (
                    <span className="bg-gold/10 text-gold text-xs px-2 py-0.5 rounded-full font-medium">
                      Highlighted
                    </span>
                  )}
                </div>
                <div className="text-brown-mid text-sm mt-1">
                  {item.description}
                </div>
                <div className="text-brown-mid/60 text-xs mt-1">
                  {item.features.length} features
                </div>
              </div>
              <div className="flex gap-2">
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
                {modal.editing ? "Edit Package" : "Add Package"}
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
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Package Name *"
                  className={inputClass}
                />
                <input
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="Price (e.g. ₹14,999) *"
                  className={inputClass}
                />
              </div>
              <input
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Short description"
                className={inputClass}
              />
              <textarea
                value={form.featuresText}
                onChange={(e) =>
                  setForm({ ...form, featuresText: e.target.value })
                }
                placeholder="Features (one per line)\nMobile Responsive\nSEO Optimized"
                rows={5}
                className={inputClass}
              />
              <input
                value={form.ctaText}
                onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
                placeholder="Button text"
                className={inputClass}
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.highlighted}
                  onChange={(e) =>
                    setForm({ ...form, highlighted: e.target.checked })
                  }
                  className="w-4 h-4 accent-gold"
                />
                <span className="text-brown-mid text-sm">
                  Highlight as featured/most popular
                </span>
              </label>
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
