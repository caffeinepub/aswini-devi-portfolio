import { Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActor } from "../../hooks/useActor";

export default function AdminLogin() {
  const { actor } = useActor();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      setError("Connecting to backend...");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await actor.adminLogin(username, password);
      if (result.length > 0 && result[0]) {
        localStorage.setItem("adminToken", result[0]);
        navigate("/admin/dashboard");
      } else {
        setError("Invalid username or password.");
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brown-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-gold text-4xl">✦</span>
          <h1 className="font-serif text-2xl font-bold text-white mt-2">
            Admin Panel
          </h1>
          <p className="text-white/60 text-sm mt-1">Aswini Devi Portfolio</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="text-white/70 text-sm mb-1 block"
              >
                Username
              </label>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-white/70 text-sm mb-1 block"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-gold transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full shimmer-btn text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <LogIn size={18} />
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          <a href="/" className="hover:text-white/60 transition-colors">
            ← Back to portfolio
          </a>
        </p>
      </div>
    </div>
  );
}
