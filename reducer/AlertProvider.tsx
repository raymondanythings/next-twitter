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

  const [idle, setIdle] = useState(false);

  const alertMessage = (text: string) => {
    setState({ open: true, text });
    if (!idle) {
      setIdle(true);
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(setState((prev) => ({ ...prev, open: false })));
        }, 3000);
      }).then(() => {
        setState((prev) => ({ ...prev, text: null }));
        setIdle(false);
      });
    }
  };

  return (
    <AlertContext.Provider value={{ state, alertMessage }}>
      {children}
    </AlertContext.Provider>
  );
}

export default AlertProvider;
