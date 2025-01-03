import { useContext } from "react";
import { UserContext } from "../context/AuthContext/AuthProvider";

export const useAuth = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };