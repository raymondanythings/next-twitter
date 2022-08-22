import { useState } from "react";

interface AlertProps {
  message?: string;
}

function useAlert(message?: string) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(message);

  const alertMessage = (context: string) => {
    setText(context);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };
  console.log(open);
  return {
    open,
    setOpen,
    text,
    setText,
    alertMessage,
  };
}

export default useAlert;
