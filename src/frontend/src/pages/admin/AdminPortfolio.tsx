import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { PortfolioItem } from "../../backend.d";
import { useActor } from "../../hooks/useActor";

interface FormData {
  title: string;
  cuisine: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
}

const emptyForm: FormData = {
  title: "",
  cuisine: "",
  description: "",
  imageUrl: "",
  projectUrl: "",
};

export default function AdminPortfolio() {
  const { actor } = useActor();
  const navigate = useNavigate();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{
    open: boolean;
    editing?: PortfolioItem;
  }>({ open: false });
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("adminToken") || "";

  const load = async () => {
    if (!actor) return;
    setLoading(true);
    try {
      const data = await actor.getPortfolioItems();
      setItems(data);
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
  const openEdit = (item: PortfolioItem) => {
    setForm({
      title: item.title,
      cuisine: item.cuisine,
      description: item.description,
      imageUrl: item.imageUrl,
      projectUrl: item.projectUrl,
    });
    setModal({ open: true, editing: item });
  };
  const closeModal = () => setModal({ open: false });

  const save = async () => {
    if (!actor || !form.title || !form.cuisine) return;
    setSaving(true);
    try {
      if (modal.editing) {
        await actor.updatePortfolioItem(
          token,
          modal.editing.id,
          form.title,
          form.cuisine,
          form.description,
          form.imageUrl,
          form.projectUrl,
        );
      } else {
        const result = await actor.addPortfolioItem(
          token,
          form.title,
          form.cuisine,
          form.description,
          form.imageUrl,
          form.projectUrl,
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
    if (!actor || !confirm("Delete this item?")) return;
    await actor.deletePortfolioItem(token, id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const inputClass =
    "w-full border border-gold/20 rounded-lg px-3 py-2.5 text-brown-dark bg-cream focus:outline-none focus:border-gold text-sm";

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-brown-dark">
            Portfolio
          </h1>
          <p className="text-brown-mid text-sm mt-1">
            {items.length} project{items.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="flex items-center gap-2 shimmer-btn text-white px-4 py-2.5 rounded-lg text-sm font-semibold"
        >
          <Plus size={16} /> Add Project
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
                <div className="font-semibold text-brown-dark">
                  {item.title}
                </div>
                <div className="text-gold text-xs font-medium mt-0.5">
                  {item.cuisine}
                </div>
                <div className="text-brown-mid text-sm mt-1 line-clamp-1">
                  {item.description}
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

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif font-bold text-lg text-brown-dark">
                {modal.editing ? "Edit Project" : "Add Project"}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="text-brown-mid hover:text-brown transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Restaurant Name *"
                className={inputClass}
              />
              <input
                value={form.cuisine}
                onChange={(e) => setForm({ ...form, cuisine: e.target.value })}
                placeholder="Cuisine Type *"
                className={inputClass}
              />
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Description"
                rows={3}
                className={inputClass}
              />
              <input
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="Image URL (optional)"
                className={inputClass}
              />
              <input
                value={form.projectUrl}
                onChange={(e) =>
                  setForm({ ...form, projectUrl: e.target.value })
                }
                placeholder="Project URL (optional)"
                className={inputClass}
              />
            </div>
            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 border border-gold/30 text-brown py-2.5 rounded-lg text-sm hover:bg-cream transition-colors"
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
