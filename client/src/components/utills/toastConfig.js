// toastConfig.js

import { toast } from "react-toastify";

const toastConfig = {
  position: "top-right",
  autoClose: 3000, // Auto close time in milliseconds (3 seconds)
  hideProgressBar: false, // Hide progress bar
  closeOnClick: true, // Close toast on click
  pauseOnHover: true, // Pause auto close on hover
  draggable: true, // Make toast draggable
  progressStyle: { backgroundColor: "#007BFF" }, // Progress bar color
};

export const showToast = (title, status) => {
  switch (status) {
    case "success":
      toast.success(title, toastConfig);
      break;
    case "error":
      toast.error(title, toastConfig);
      break;
    case "info":
      toast.info(title, toastConfig);
      break;
    case "warning":
      toast.warning(title, toastConfig);
      break;
    default:
      toast(title, toastConfig);
  }
};

export default toastConfig;
