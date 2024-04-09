import { createContext, useState } from "react";
import axios from "axios";
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function login(email, password) {
    setUser({ email });
    try {
      setIsLoading(true);
      console.log(isloading);
      const url = "http://localhost:3000";
      const response = await axios.post(`${url}/users/${email}/login`);
      console.log(response.data);
      console.log(response.status);
      setUser(response.data);
      setUrl(url);
    } catch (err) {
      setIsError(true);
      err && console.log(err);
    } finally {
      setIsLoading(false);
      console.log(isloading);
    }
  }
  function logout() {
    setUser(null);
  }
  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
}
