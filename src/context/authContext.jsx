import { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "../config/apiConfig";

const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [rol, setRol] = useState(localStorage.getItem("rol") || null);

  const login = (nuevoToken) => {
    const decoded = jwtDecode(nuevoToken);
    const rolDecodificado = decoded.rol;
    localStorage.setItem("token", nuevoToken);
    localStorage.setItem("rol", rolDecodificado);
    setToken(nuevoToken);
    setRol(rolDecodificado);
  };

  const logout = async () => {
    try {
      if (token) {
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Error al cerrar sesión en el servidor:", error);
    } finally {
      localStorage.clear();
      setToken(null);
      setRol(null);
    }
  };

  return (
    <AuthContext.Provider value={{ token, rol, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
