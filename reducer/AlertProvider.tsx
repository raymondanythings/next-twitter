import React, { createContext, useState } from "react";

interface AlertState {
  open: boolean;
  text?: string | null;
}

interface ContextType {
  state: AlertState;
  alertMessage: (message: string) => void;
}

export const AlertContext = createContext<ContextType>({
  state: {
    open: false,
  },
  alertMessage: (message: string) => {},
});

function AlertProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AlertState>({
    open: false,
    text: null,
  });

  const alertMessage = (text: string) => {
    setState({ open: true, text });
    setTimeout(() => setState((prev) => ({ ...prev, open: false })), 3000);
  };
  return (
    <AlertContext.Provider value={{ state, alertMessage }}>
      {children}
    </AlertContext.Provider>
  );
}

export default AlertProvider;
