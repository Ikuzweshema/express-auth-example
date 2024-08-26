import { useContext } from "react";
import { sessionContext } from "../context/session.jsx";
export const useSession = () => {
  return useContext(sessionContext);
};
