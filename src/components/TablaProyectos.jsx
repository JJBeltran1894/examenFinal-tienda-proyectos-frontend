import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/apiConfig";

export function TablaProyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProyectos = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${API_BASE_URL}/api/proyectos`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los proyectos desde la API");
        }

        const data = await response.json();
        setProyectos(data);
      } catch (err) {
        setError(err.message);
      }
    };

    cargarProyectos();
  }, []);

  return (
    <div style={{ marginTop: "10px" }}>
      {error && (
        <div
          className="cyber-alert alert-cyber-danger"
          style={{ marginBottom: "20px" }}
        >
          <span>⚠️</span> {error}
        </div>
      )}

      <div className="enterprise-table-wrapper">
        <table className="enterprise-table">
          <thead>
            <tr>
              <th style={{ width: "80px" }}>Hash ID</th>
              <th>Nombre del Proyecto</th>
              <th>Descripción Detallada</th>
              <th style={{ width: "160px" }}>Fecha Lanzamiento</th>
            </tr>
          </thead>
          <tbody>
            {proyectos.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    padding: "30px",
                    textAlign: "center",
                    color: "var(--text-muted)",
                  }}
                >
                  📭 Ningún registro activo localizado en la base relacional
                  cloud.
                </td>
              </tr>
            ) : (
              proyectos.map((proyecto) => (
                <tr key={proyecto.id}>
                  <td>
                    <span className="project-badge-id">#{proyecto.id}</span>
                  </td>
                  <td style={{ fontWeight: "600", color: "#ffffff" }}>
                    {proyecto.nombre}
                  </td>
                  <td
                    style={{ color: "var(--text-muted)", fontSize: "13.5px" }}
                  >
                    {proyecto.descripcion ||
                      "Sin descripción asignada por arquitectura."}
                  </td>
                  <td
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "13px",
                      color: "#38bdf8",
                    }}
                  >
                    📅 {proyecto.fechaInicio}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
