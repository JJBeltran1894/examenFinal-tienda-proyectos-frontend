import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/authContext";
import { useState } from "react";
import { TablaProyectos } from "./components/TablaProyectos";
import { FormularioProyecto } from "./components/FormularioProyecto";

const PanelProtegido = () => {
  const [refrecarKey, setRefrescarKey] = useState(0);
  const [forzarFormulario, setForzarFormulario] = useState(false);

  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  if (!token) {
    return <Navigate to="/" />;
  }

  const manejarProyectoCreado = () => {
    setRefrescarKey((prev) => prev + 1);
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <div
          style={{
            marginBottom: "30px",
            borderBottom: "1px solid var(--border-color)",
            paddingBottom: "20px",
          }}
        >
          <h2 style={{ fontSize: "28px", margin: "0 0 4px 0" }}>
            Consola de Operaciones
          </h2>
          <p style={{ margin: 0 }}>
            Conectado como rol corporativo:{" "}
            <span
              style={{
                color: rol === "ADMIN" ? "#10b981" : "#38bdf8",
                fontWeight: "700",
                fontFamily: "var(--mono)",
              }}
            >
              [{rol}]
            </span>
          </p>
        </div>

        {rol === "ADMIN" && (
          <FormularioProyecto onProyectoCreado={manejarProyectoCreado} />
        )}

        {rol === "USER" && (
          <div style={{ marginBottom: "25px" }}>
            <div
              style={{
                padding: "16px",
                backgroundColor: "#0b121f",
                borderRadius: "8px",
                border: "1px dashed #223554",
                display: "flex",
                alignItems: "center",
                justifyContext: "space-between",
              }}
            >
              <div>
                <h4 style={{ margin: "0 0 4px 0", color: "#fff" }}>
                  🔒 Modo de Seguridad Activo
                </h4>
                <p style={{ margin: 0, fontSize: "13px" }}>
                  Los flujos de edición se encuentran ocultos para cuentas sin
                  privilegios elevados.
                </p>
              </div>
              <button
                onClick={() => setForzarFormulario(!forzarFormulario)}
                className="btn-action-bypass"
              >
                {forzarFormulario
                  ? "🔒 Ocultar Inyector Forzado"
                  : "💉 Simular Bypass Front (Exponer Formulario de ADMIN)"}
              </button>
            </div>

            {forzarFormulario && (
              <div style={{ marginTop: "24px" }}>
                <FormularioProyecto onProyectoCreado={manejarProyectoCreado} />
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: "30px" }}>
          <h3
            style={{
              fontSize: "18px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--text-muted)",
            }}
          >
            📋 Catálogo Maestro de Proyectos
          </h3>
          <TablaProyectos key={refrecarKey} />
        </div>
      </div>
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/panel" element={<PanelProtegido />} />
          <Route path="/panel/nueva-tarea" element={<PanelProtegido />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
