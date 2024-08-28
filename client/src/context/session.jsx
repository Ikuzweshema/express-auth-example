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
        "https://express-auth-example.onrender.com/api/auth/session",
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
      } else if (res.status === 401) {
        setSession({
          status: "unauthenticated",
          user: {},
        });
        return;
      } else {
        setSession({
          status: "unauthenticated",
          user: {},
        });
        return;
      }
    } catch (e) {
      setSession({
        status: "unauthenticated",
        user: {},
      });
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const clearSession = () => {
    setSession({
      status: "unauthenticated",
      user: {},
    });
  };

  return (
    <sessionContext.Provider value={{ session, clearSession, setSession }}>
      {children}
    </sessionContext.Provider>
  );
};
