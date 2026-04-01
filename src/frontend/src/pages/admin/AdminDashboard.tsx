import { Check, Mail, RefreshCw, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ContactSubmission } from "../../backend.d";
import { useActor } from "../../hooks/useActor";

export default function AdminDashboard() {
  const { actor } = useActor();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken") || "";

  const load = async () => {
    if (!actor) return;
    setLoading(true);
    try {
      const result = await actor.getContactSubmissions(token);
      if (result.length > 0 && result[0]) {
        setSubmissions([...result[0]].reverse());
      } else if (result.length === 0) {
        navigate("/admin/login");
      }
    } catch {
      navigate("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: load depends on actor
  useEffect(() => {
    load();
  }, [actor]);

  const markRead = async (id: bigint) => {
    if (!actor) return;
    await actor.markContactRead(token, id);
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isRead: true } : s)),
    );
  };

  const deleteOne = async (id: bigint) => {
    if (!actor || !confirm("Delete this submission?")) return;
    await actor.deleteContactSubmission(token, id);
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
  };

  const unread = submissions.filter((s) => !s.isRead).length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-brown-dark">
            Contact Submissions
          </h1>
          <p className="text-brown-mid text-sm mt-1">
            {unread} unread message{unread !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={load}
          className="flex items-center gap-2 text-sm text-brown-mid hover:text-gold transition-colors"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-brown-mid">Loading...</div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-16">
          <Mail size={48} className="text-gold/40 mx-auto mb-4" />
          <p className="text-brown-mid">No submissions yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((s) => (
            <div
              key={Number(s.id)}
              className={`bg-white rounded-xl border p-5 ${
                s.isRead ? "border-gold/10" : "border-gold/40 shadow-md"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    {!s.isRead && (
                      <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                    )}
                    <span className="font-semibold text-brown-dark">
                      {s.name}
                    </span>
                    <span className="text-brown-mid text-sm">•</span>
                    <span className="text-brown-mid text-sm">
                      {s.restaurantName}
                    </span>
                  </div>
                  <div className="text-brown-mid text-sm mb-2">
                    {s.email} &bull; {s.phone}
                  </div>
                  <p className="text-brown text-sm leading-relaxed">
                    {s.message}
                  </p>
                  <div className="text-brown-mid/60 text-xs mt-2">
                    {new Date(Number(s.timestamp) / 1_000_000).toLocaleString(
                      "en-IN",
                    )}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  {!s.isRead && (
                    <button
                      type="button"
                      onClick={() => markRead(s.id)}
                      className="p-2 rounded-lg bg-gold/10 text-gold hover:bg-gold/20 transition-colors"
                      title="Mark as read"
                    >
                      <Check size={16} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => deleteOne(s.id)}
                    className="p-2 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
