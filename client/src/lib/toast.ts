import { toast, ToastOptions } from "react-toastify";
import { AxiosError } from "axios";

const options: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
};

export const showSuccess = (message: string) => toast.success(message, options);

export const showError = (error: unknown) => {
  let message = "Something went wrong";

  if (error instanceof AxiosError) {
    message = error.response?.data?.message || error.message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  toast.error(message, options);
};
