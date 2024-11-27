import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const sessionContext = createContext({});

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState({
    status: "pending",
    user: {},
  });

  const getUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SEVER_URL}/api/auth/session`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        const data = await res.data;
        setSession({
          status: "authenticated",
          user: data,
        });
        return;
      } else {
        setSession({
          status: "unauthenticated",
        });
        return;
      }
    } catch (e) {
      setSession({
        status: "unauthenticated",
      });
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const clearSession = () => {
    setSession({
      status: "unauthenticated",
    });
  };

  return (
    <sessionContext.Provider value={{ session, clearSession, setSession }}>
      {children}
    </sessionContext.Provider>
  );
};
