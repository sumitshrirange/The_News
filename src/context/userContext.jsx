import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("Token");
      const userToken = localStorage.getItem("userToken");

      try {
        let res;

        token &&
          (res = await axios.get(`${BACKEND_URL}/api/user/data`, {
            headers: { Authorization: `Bearer ${token}` },
          }));

        userToken &&
          (res = await axios.get(`${BACKEND_URL}/auth/user`, {
            withCredentials: true,
          }));

        if (res.data.success) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const getUser = () => useContext(UserContext);
