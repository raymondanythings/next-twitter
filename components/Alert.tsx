import { useContext } from "react";
import { AlertContext } from "../reducer/AlertProvider";

function Alert() {
  const {
    state: { open, text },
  } = useContext(AlertContext);
  return (
    <div
      className={`bg-tSky absolute bottom-0 w-full ${
        !open ? "scale-0" : "scale-1"
      } origin-bottom duration-300 flex items-center p-6`}
    >
      {text}
    </div>
  );
}

export default Alert;
