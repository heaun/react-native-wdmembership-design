import React, { createContext, useContext } from "react";
import Toast from "react-native-toast-message";

interface ToastContextType {
  showToast: (type: "success" | "error" | "info", title: string, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const showToast = (type: "success" | "error" | "info", title: string, message: string) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
      position: "bottom",
      visibilityTime: 2000
    });
  };

  return <ToastContext.Provider value={{ showToast }}>{children}</ToastContext.Provider>;
};
