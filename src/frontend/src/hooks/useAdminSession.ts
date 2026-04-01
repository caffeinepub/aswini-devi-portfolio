import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActor } from "./useActor";

export function useAdminSession() {
  const { actor } = useActor();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    if (!actor) return;
    actor.checkSession(token).then((valid) => {
      if (!valid) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      } else setIsVerified(true);
    });
  }, [actor, navigate]);

  const logout = async () => {
    const token = localStorage.getItem("adminToken") || "";
    if (actor) await actor.adminLogout(token);
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return {
    isVerified,
    logout,
    token: localStorage.getItem("adminToken") || "",
  };
}
