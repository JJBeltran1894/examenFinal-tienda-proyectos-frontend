import { useState } from "react";
import { API_BASE_URL } from "../config/apiConfig";

export function FormularioProyecto({ onProyectoCreado }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    const token = localStorage.getItem("token");
    const nuevoProyecto = { nombre, descripcion, fechaInicio };

    try {
      const response = await fetch(`${API_BASE_URL}/api/proyectos`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoProyecto),
      });

      if (response.status === 403) {
        alert(
          "⚠️ ¡ACCIÓN RESTRINGIDA! Tu cuenta de desarrollador estándar no cuenta con privilegios elevados para confirmar nuevos proyectos.",
        );
        setMensaje("Acceso Denegado (403): Permisos insuficientes.");
        return;
      }

      if (!response.ok) {
        throw new Error("Error al registrar el proyecto en el servidor cloud");
      }

      await response.json();
      alert(
        "🎉 Operación exitosa: Estructura de proyecto unificada en producción.",
      );
      setNombre("");
      setDescripcion("");
      setFechaInicio("");

      if (onProyectoCreado) onProyectoCreado();
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <div className="premium-card" style={{ marginBottom: "35px" }}>
      <div
        style={{
          borderBottom: "1px solid var(--border-color)",
          paddingBottom: "15px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontSize: "20px", margin: 0, color: "#fff" }}>
          🛠️ Inicializar Nuevo Proyecto Core
        </h2>
        <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>
          Asignación exclusiva para perfiles con rol administrativo y firmas
          digitales
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="form-layout"
        style={{ maxWidth: "600px" }}
      >
        <div className="interactive-group">
          <label>Nombre Identificador del Proyecto</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Microservicio de Facturación Electrónica"
            required
          />
        </div>

        <div className="interactive-group">
          <label>Descripción Técnica y Alcance</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Escriba aquí los lineamientos generales del proyecto..."
          />
        </div>

        <div className="interactive-group">
          <label>Fecha de Implementación / Inicio</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <button type="submit" className="btn-action-success">
            💾 Compilar e Insertar Proyecto
          </button>
        </div>
      </form>

      {mensaje && (
        <div
          className="cyber-alert alert-cyber-danger"
          style={{ marginTop: "20px" }}
        >
          <span>⚠️</span> {mensaje}
        </div>
      )}
    </div>
  );
}
