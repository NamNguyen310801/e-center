import { toast } from "react-toastify";
export default function Toast(type, message) {
  const commonOptions = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  if (type === "success") {
    return toast.success(`🐸 ${message}`, commonOptions);
  } else if (type === "info") {
    return toast.info(`${message}`, commonOptions);
  } else if (type === "warn") {
    return toast.warn(`${message}`, commonOptions);
  } else if (type === "error") {
    return toast.error(`${message}`, commonOptions);
  }
}
