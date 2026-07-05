import { API_BASE_URL } from "../config/apiConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error("Usuario o contraseña incorrectos");
      }
      const datos = await response.json();
      const decoded = jwtDecode(datos.token);
      const rol = decoded.rol;
      localStorage.setItem("token", datos.token);
      localStorage.setItem("rol", rol);
      login(datos.token);
      navigate("/panel");
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="premium-card auth-card">
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "8px",
              borderRadius: "50%",
              backgroundColor: "rgba(56,189,248,0.1)",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                backgroundColor: "#38bdf8",
                borderRadius: "50%",
                boxShadow: "0 0 12px #38bdf8",
              }}
            />
          </div>
          <h1 style={{ fontSize: "26px", margin: "0 0 6px 0" }}>
            Enterprise Portal
          </h1>
          <p style={{ margin: 0, fontSize: "14px" }}>
            Inicie sesión para acceder al ecosistema
          </p>
        </div>

        <form onSubmit={manejarSubmit} className="form-layout">
          <div className="interactive-group">
            <label>Identificador / Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingrese su cuenta corporativa"
              required
            />
          </div>
          <div className="interactive-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
            />
          </div>

          {err && (
            <div className="cyber-alert alert-cyber-danger">
              <span>⚠️</span> {err}
            </div>
          )}

          <button
            type="submit"
            className="btn-submit-primary"
            style={{ width: "100%", marginTop: "10px" }}
          >
            Autenticar Credenciales
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
