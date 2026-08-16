import { createContext, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem("access_token") ? true : false
  );

  const login = async (username, password) => {
  try {
    const response = await api.post("/login/", {
      username: username,
      password: password,
    });

    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);

    setUser(true);

    return true;
  } catch (error) {
    console.log("LOGIN ERROR:", error.response?.data);
    return false;
  }
};
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;