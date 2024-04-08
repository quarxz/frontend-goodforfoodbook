import { createContext, useState } from "react";
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(userName, password) {
    setUser({ userName });
  }
  function logout() {
    setUser(null);
  }
  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
}
