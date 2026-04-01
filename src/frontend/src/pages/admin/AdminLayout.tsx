import { DollarSign, Image, LayoutDashboard, LogOut, Star } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useActor } from "../../hooks/useActor";

const navItems = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/portfolio", icon: Image, label: "Portfolio" },
  { to: "/admin/testimonials", icon: Star, label: "Testimonials" },
  { to: "/admin/pricing", icon: DollarSign, label: "Pricing" },
];

export default function AdminLayout() {
  const { actor } = useActor();
  const navigate = useNavigate();

  const logout = async () => {
    const token = localStorage.getItem("adminToken") || "";
    if (actor) await actor.adminLogout(token).catch(() => {});
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-cream-dark">
      {/* Sidebar */}
      <aside className="w-60 bg-brown-dark flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-gold text-xl">✦</span>
            <div>
              <div className="text-white font-serif font-bold">Aswini Devi</div>
              <div className="text-gold text-xs tracking-wide">Admin Panel</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gold/20 text-gold"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-colors text-sm"
          >
            <LogOut size={18} />
            Logout
          </button>
          <a
            href="/"
            className="flex items-center gap-3 px-4 py-2 text-white/40 hover:text-white/60 transition-colors text-xs mt-1"
          >
            ← View portfolio
          </a>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
