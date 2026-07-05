import { useNavigate, useLocation } from "react-router-dom";
import { API_BASE_URL } from "../config/apiConfig";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const rol = localStorage.getItem("rol");
  const token = localStorage.getItem("token");

  const manejarLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    } finally {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <nav className="enterprise-navbar">
      <div
        className="nav-brand"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/panel")}
      >
        <div className="nav-brand-logo" />
        <h3>Quantum Devflow</h3>
      </div>

      <div className="nav-links">
        {rol === "USER" && (
          <button
            className={`btn-nav ${location.pathname === "/panel" ? "active" : ""}`}
            onClick={() => navigate("/panel")}
          >
            📊 Ver Catálogo de Proyectos
          </button>
        )}

        {rol === "ADMIN" && (
          <>
            <button
              className={`btn-nav ${location.pathname === "/panel" ? "active" : ""}`}
              onClick={() => navigate("/panel")}
            >
              💼 Gestionar Proyectos
            </button>
            <button
              className={`btn-nav ${location.pathname === "/panel/nueva-tarea" ? "active" : ""}`}
              onClick={() => navigate("/panel/nueva-tarea")}
            >
              ⚡ Crear Tareas Core
            </button>
          </>
        )}
      </div>

      <button onClick={manejarLogout} className="btn-action-logout">
        Cerrar Sesión Corporativa
      </button>
    </nav>
  );
}
export default Navbar;
